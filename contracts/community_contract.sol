// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./iuser_interface.sol";

contract _Community {
    _IUser user;
    struct Community {
        string name;
        string guidelines;
        bytes32 communityID;
        bytes32 communityEncryptionPub;
    }

    struct Member {
        address member_address;
        string name;
    }

    struct Message {
        bytes32 ID;
        uint time;
        string _msg;
        address sender;
        bytes32 referenceTo; // this is the id of the message which this message is referencing
    }

    Community[] communityList;

    mapping(bytes32 => Member[]) communityMemberList;
    mapping(bytes32 => Message[]) communityMessages;

    constructor(address _User_contract) {
        user = _IUser(_User_contract);
    }

    function createCommunity(
        string memory _name,
        string memory _guideline,
        string memory _communityEncryptPub
    ) public returns (Community memory) {
        // check if it is admin that is trying to create community
        if (!user._isAdmin(msg.sender)) {
            revert("Unauthorized Access");
        }
        //create community
        Community memory community;
        community.name = _name;
        community.guidelines = _guideline;
        community.communityEncryptionPub = bytes32(
            abi.encodePacked(_communityEncryptPub)
        );

        //hash communityID
        community.communityID = _getCommunityID(
            _name,
            bytes32(abi.encodePacked(_communityEncryptPub))
        );

        //add to community list
        communityList.push(community);

        //add admin as first member of community
        Member memory member;
        member.name = "admin";
        member.member_address = msg.sender;
        communityMemberList[community.communityID].push(member);
        // return newly create community
        return community;
    }

    function joinCommunity(bytes32 communityID) public {
        // check if user is registered
        if (!user._checkIfUserExists(msg.sender)) {
            revert("not a valid user");
        }

        //check if community exist
        if (!_checkIfCommunityExist(communityID)) {
            revert("Community not found");
        }

        //check if user is already in community
        if (_checkIfUserIsAlreadyInCommunity(communityID)) {
            revert("User already a community member");
        }

        Member memory member;
        member.member_address = msg.sender;
        member.name = user.getMyName(msg.sender);

        // add user to community
        communityMemberList[communityID].push(member);
    }

    function getAllCommunities() public view returns (Community[] memory) {
        return communityList;
    }

    function getCommunityMembers(
        bytes32 communityID
    ) public view returns (Member[] memory) {
        return communityMemberList[communityID];
    }

    function sendMessage(
        bytes32 _communityID,
        string memory _msg,
        uint _time,
        bytes32 _referenceTo
    ) public {
        //check if user belongs to community
        if (
            !_checkIfCommunityExist(_communityID) &&
            !_checkIfUserIsAlreadyInCommunity(_communityID)
        ) {
            revert(
                "community does not exist or user doesn't belong to community"
            );
        }
        Message memory myMsg;
        myMsg.sender = msg.sender;
        myMsg._msg = _msg;
        myMsg.time = _time;
        myMsg.referenceTo = _referenceTo;
        myMsg.ID = keccak256(abi.encodePacked(msg.sender, myMsg.time));
        //save message
        communityMessages[_communityID].push(myMsg);
    }

    function getCommunityMessages(
        bytes32 _communityID
    ) public view returns (Message[] memory) {
        if (!_checkIfCommunityExist(_communityID)) {
            revert("community not found");
        }
        if (!_checkIfUserIsAlreadyInCommunity(_communityID)) {
            revert("You cannot view this communit messages");
        }

        return communityMessages[_communityID];
    }

    function _getCommunityID(
        string memory _name,
        bytes32 _encryptionPub
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_name, _encryptionPub));
    }

    function _checkIfCommunityExist(
        bytes32 _communityID
    ) public view returns (bool) {
        if (communityMemberList[_communityID].length > 0) {
            return true;
        }
        return false;
    }

    function _checkIfUserIsAlreadyInCommunity(
        bytes32 _communityID
    ) public view returns (bool) {
        Member[] memory members;
        members = communityMemberList[_communityID];

        for (uint i = 0; i < members.length; i++) {
            if (members[i].member_address == msg.sender) {
                return true;
            }
        }
        return false;
    }
}
