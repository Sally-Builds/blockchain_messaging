// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.22 <0.9.0;

interface _IUser {
    struct User {
        address user;
        string name;
        bytes32 encryptionPub;
    }

    function register(
        string memory _name,
        string memory _encryptionPub
    ) external returns (User memory);

    function getMe() external view returns (User memory);

    function getUser(address user_address) external view returns (User memory);

    function changeAdmin(address new_address) external;

    function _checkIfUserExists(
        address user_address
    ) external view returns (bool);

    function _isAdmin(address sender) external view returns (bool);

    function getMyName(address user) external view returns (string memory);
}
