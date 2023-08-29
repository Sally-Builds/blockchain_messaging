// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
// import "./_User.sol";
import "./user_contract.sol";

contract _Friend {
    _User user;
    struct Message {
        bytes32 ID;
        uint time;
        string _msg;
        address sender;
        bytes32 referenceTo; // this is the id of the message which this message is referencing
    }

    struct Friend {
        address user;
        string name;
        bytes32 encryptionPub;
    }

    mapping(address => address[]) friends;
    mapping(bytes32 => Message[]) PeerMessages;

    constructor(address _User_contract) {
        user = _User(_User_contract);
    }

    function addFriend(address friendAddress) public {
        if (!user._checkIfUserExists(friendAddress)) {
            revert("User does not exist");
        }

        friends[msg.sender].push(friendAddress);
        friends[friendAddress].push(msg.sender);
    }

    function getFriends() public view returns (Friend[] memory) {
        uint numOfFriends = friends[msg.sender].length;
        Friend[] memory _friends = new Friend[](numOfFriends);

        for (uint i = 0; i < numOfFriends; i++) {
            address user_address = friends[msg.sender][i];
            _friends[i].user = user_address;
            _friends[i].name = user.getUser(user_address).name;
        }

        return _friends;
    }

    function sendPeerMessage(
        address friend_address,
        string memory _msg,
        bytes32 _referenceTo
    ) public {
        Message memory _message;

        _message._msg = _msg;
        _message.time = block.timestamp;
        _message.referenceTo = _referenceTo;
        _message.sender = msg.sender;
        _message.ID = keccak256(abi.encodePacked(msg.sender, _message.time));

        bytes32 hashCode = _getChatCode(msg.sender, friend_address);

        PeerMessages[hashCode].push(_message);
    }

    function getChatWithFriend(
        address friend_address
    ) external view returns (Message[] memory) {
        bytes32 hashCode = _getChatCode(msg.sender, friend_address);
        return PeerMessages[hashCode];
    }

    function _getChatCode(
        address pubkey1,
        address pubkey2
    ) internal pure returns (bytes32) {
        if (pubkey1 < pubkey2)
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        else return keccak256(abi.encodePacked(pubkey2, pubkey1));
    }
}
