var Candidate = artifacts.require("./Candidate.sol");

contract("Candidate", function(accounts) {
  var candidateInstance;

  it("initializes with two candidates", function() {        //mocha
    return Candidate.deployed().then(function(instance) {
      return instance.candidatesCount();
    }).then(function(count) {
      assert.equal(count, 2);             //chai
    });
  });

  it("it initializes the candidates with the correct values", function() {
     Candidate.deployed().then(function(instance) {
      return instance.candidatesCount();
    }).then(function(count) {
   for (var i = 1; i <= count; i++) {
        candidateInstance.candidates(i).then(function(candidate) {
      assert.equal(candidate[0], i, "contains the correct id");
      assert.equal(candidate[1], "Candidate "+ i, "contains the correct name");
      assert.ok(candidate[2]>=25, "age greater than 25");
    });
    }
    });
  });

// return Candidate.deployed().then(function(instance) {
//   candidateInstance = instance;

    // for(var i=1;i<=candidatesCount();i++){  
    //   return candidateInstance.candidates(i);
    // .then(function(candidate) {
    //   assert.equal(candidate[0], i, "contains the correct id");
    //   assert.equal(candidate[1], "Candidate "+ i, "contains the correct name");
    //   assert.ok(candidate[2]>=25, "age greater than 25");
    // }


    //   for (var i = 1; i <= 1; i++) {
    //     candidateInstance.candidates(i).then(function(candidate) {
    //      assert.equal(candidate[0], i, "contains the correct id");
    //      assert.equal(candidate[1], "Candidate "+ i, "contains the correct name");
    //      assert.ok(candidate[2]>=25, "age greater than 25");
    //   });
    // }



  // it("allows a voter to cast a vote", function() {
  //   return Election.deployed().then(function(instance) {
  //     electionInstance = instance;
  //     candidateId = 1;
  //     return electionInstance.vote(candidateId, { from: accounts[0] });
  //   }).then(function(receipt) {
  //     assert.equal(receipt.logs.length, 1, "an event was triggered");
  //     assert.equal(receipt.logs[0].event, "votedEvent", "the event type is correct");
  //     assert.equal(receipt.logs[0].args._candidateId.toNumber(), candidateId, "the candidate id is correct");
  //     return electionInstance.voters(accounts[0]);
  //   }).then(function(voted) {
  //     assert(voted, "the voter was marked as voted");
  //     return electionInstance.candidates(candidateId);
  //   }).then(function(candidate) {
  //     var voteCount = candidate[2];
  //     assert.equal(voteCount, 1, "increments the candidate's vote count");
  //   })
  // });

  // it("throws an exception for invalid candidature", function() {
  //   return Candidate.deployed().then(function(instance) {
  //     candidateInstance = instance;
  //     return candidateInstance.addCandidate("Priyam",12,"gyfuifghs","ygfyuaef",true,true, { from: accounts[1] })
  //   }).then(assert.fail).catch(function(error) {
  //     assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
  //     return electionInstance;
  //   }).then(function(candidate) {

  //     var voteCount = candidate1[2];
  //     assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
  //     return electionInstance.candidates(2);
  //   })
  // });

  // it("throws an exception for double candidature", function() {
  //   return Candidate.deployed().then(function(instance) {
  //     candidateInstance = instance;
  //     candidateId = 2;
  //     candidateInstance.add(candidateId,"Priyam",26,"hgfds","adsfh",true,true, { from: accounts[1] });
  //     return electionInstance.candidates(candidateId);
  //   }).then(function(candidate) {
  //     var voteCount = candidate[2];
  //     assert.equal(voteCount, 1, "accepts first vote");
  //     // Try to vote again
  //     return electionInstance.vote(candidateId, { from: accounts[1] });
  //   }).then(assert.fail).catch(function(error) {
  //     assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
  //     return electionInstance.candidates(1);
  //   }).then(function(candidate1) {
  //     var voteCount = candidate1[2];
  //     assert.equal(voteCount, 1, "candidate 1 did not receive any votes");
  //     return electionInstance.candidates(2);
  //   }).then(function(candidate2) {
  //     var voteCount = candidate2[2];
  //     assert.equal(voteCount, 1, "candidate 2 did not receive any votes");
  //   });
  // });
});