// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract _User {
    address admin;
    struct User {
        address user;
        string name;
        address encryptionPub;
    }

    mapping(address => User) users;

    function register(
        string memory _name,
        address _encryptionPub
    ) public returns (User memory) {
        //check if user has already registerd
        if (_checkIfUserExists(msg.sender)) {
            revert("User already exist.");
        }
        //register user
        User memory user;
        user.encryptionPub = _encryptionPub;
        user.name = _name;

        users[msg.sender] = user;

        return user;
    }

    function getMe() public view returns (User memory) {
        return users[msg.sender];
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
}
