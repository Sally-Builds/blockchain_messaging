// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./_User.sol";

contract _Community {
    _User user;
    struct Community {
        string name;
        string guidelines;
        bytes32 communityID;
        address communityEncryptionPub;
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

    function createCommunity(
        string memory _name,
        string memory _guideline,
        address _communityEncryptPub
    ) public returns (Community memory) {
        // check if it is admin that is trying to create community
        if (!user._isAdmin(msg.sender)) {
            revert("Unauthorized Access");
        }
        //create community
        Community memory community;
        community.name = _name;
        community.guidelines = _guideline;
        community.communityEncryptionPub = _communityEncryptPub;

        //hash communityID
        community.communityID = _getCommunityID(_name, _communityEncryptPub);

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
        member.name = user.getMe().name;

        // add user to community
        communityMemberList[communityID].push(member);
    }

    function getCommunityMembers(
        bytes32 communityID
    ) public view returns (Member[] memory) {
        return communityMemberList[communityID];
    }

    function _getCommunityID(
        string memory _name,
        address _encryptionPub
    ) public pure returns (bytes32) {
        return keccak256(abi.encodePacked(_name, _encryptionPub));
    }

    function _checkIfCommunityExist(
        bytes32 communityID
    ) public view returns (bool) {
        if (communityMemberList[communityID].length > 0) {
            return true;
        }
        return false;
    }

    function _checkIfUserIsAlreadyInCommunity(
        bytes32 communityID
    ) public view returns (bool) {
        Member[] memory members;
        members = communityMemberList[communityID];

        for (uint i = 0; i < members.length; i++) {
            if (members[i].member_address == msg.sender) {
                return true;
            }
        }
        return false;
    }
}
