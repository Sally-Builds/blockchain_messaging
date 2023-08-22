// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


interface _IUser {
    function register(string memory _name, string memory _encryptionPub) public returns (User memory)
    function getMe() public view returns (User memory)
    function getUser(address user_address) public view returns (User memory)
    function changeAdmin(address new_address) public 
    function _checkIfUserExists(address user_address)public view returns (bool)
    function _isAdmin(address sender) public view returns (bool)
}