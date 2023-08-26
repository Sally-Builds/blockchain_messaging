const _User = artifacts.require("_User");
const _Community = artifacts.require("_Community");
const _Friend = artifacts.require("_Friend");

// module.exports = async function(deployer) {
//     deployer.deploy(_User).then((deployed_contract) => {
//         deployer.deploy(_Community, deployed_contract.address); 
//         deployer.deploy(_Friend, deployed_contract.address); 
//       });

// }

module.exports = function (deployer) {
  // deploy Contract2 first
  deployer.deploy(_User).then(async () => {
    // get JS instance of deployed contract
    const _userInstance = await _User.deployed(); 
    // pass its address as argument for Contract1's constructor
    await deployer.deploy(_Community, _userInstance.address); 
    await deployer.deploy(_Friend, _userInstance.address); 
  });
};