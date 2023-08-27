const _User = artifacts.require("_User");
const _Community = artifacts.require("_Community");
const _Friend = artifacts.require("_Friend");

module.exports = function (deployer) {
  deployer.deploy(_User, "publicencryptionkey").then(async () => {
    const _userInstance = await _User.deployed();
    await deployer.deploy(_Community, _userInstance.address);
    await deployer.deploy(_Friend, _userInstance.address);
  });
};
