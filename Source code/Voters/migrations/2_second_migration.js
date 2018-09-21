var Voters = artifacts.require("./Voters.sol");

module.exports = function(deployer) {
  deployer.deploy(Voters);
};

