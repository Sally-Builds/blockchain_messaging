// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract _User {
    address admin;
    struct User {
        address user;
        string name;
        bytes32 encryptionPub;
        string[] flaggedWords;
    }

    mapping(address => User) users;

    constructor(string memory _encryptionPub) {
        admin = msg.sender;
        //register admin
        User memory user;
        user.encryptionPub = bytes32(abi.encodePacked(_encryptionPub));
        // user.encryptionPub = _encryptionPub;
        user.name = "admin";

        users[msg.sender] = user;
    }

    function register(
        string memory _name,
        string memory _encryptionPub
    ) public returns (User memory) {
        //check if user is admin
        require(!_isAdmin(msg.sender), "admin already registed");

        //check if user has already registerd
        if (_checkIfUserExists(msg.sender)) {
            revert("User already exist.");
        }
        //register user
        User memory user;
        user.encryptionPub = bytes32(abi.encodePacked(_encryptionPub));
        // user.encryptionPub = _encryptionPub;
        user.name = _name;

        users[msg.sender] = user;

        return user;
    }

    function getMe() public view returns (User memory) {
        return users[msg.sender];
    }

    function getMyName(address user) public view returns (string memory) {
        return users[user].name;
    }

    function getUser(address user_address) public view returns (User memory) {
        if (!_checkIfUserExists(user_address)) {
            revert("No user found");
        }

        return users[user_address];
    }

    function changeAdmin(address new_address) public {
        //check if sender is admin
        if (!_isAdmin(msg.sender)) {
            revert("Unauthorized access");
        }

        //change admin
        admin = new_address;
    }

    function _checkIfUserExists(
        address user_address
    ) public view returns (bool) {
        if (bytes(users[user_address].name).length > 0) {
            return true;
        }
        return false;
    }

    function _isAdmin(address sender) public view returns (bool) {
        if (sender == admin) {
            return true;
        }
        return false;
    }

    function addWords(string[] memory words) public {
        string[] storage flaggedWords = users[msg.sender].flaggedWords;
        for (uint i = 0; i < words.length; i++) {
            flaggedWords.push(words[i]);
        }
    }

    function getFlaggedWords() public view returns (string[] memory) {
        return users[msg.sender].flaggedWords;
    }

    function getFlaggedWords(
        address sender
    ) public view returns (string[] memory) {
        return users[sender].flaggedWords;
    }
}
