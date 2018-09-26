var Candidate = artifacts.require("./Candidate.sol");

module.exports = function(deployer) {
  deployer.deploy(Candidate);
};
