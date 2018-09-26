var candidatesResults;

App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',
  hasVoted: false,

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    // TODO: refactor conditional
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Candidate.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Candidate = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Candidate.setProvider(App.web3Provider);

      // App.listenForEvents();

      return App.render();
    });
  },

  // // Listen for events emitted from the contract
  // listenForEvents: function() {

  //   App.contracts.Candidate.deployed().then(function(instance) {
  //     // Restart Chrome if you are unable to receive this event
  //     // This is a known issue with Metamask
  //     // https://github.com/MetaMask/metamask-extension/issues/2393
  //     instance.votedEvent({}, {
  //       fromBlock: 0,
  //       toBlock: 'latest'
  //     }).watch(function(error, event) {
  //       console.log("event triggered", event)
  //       // Reload when a new vote is recorded
      
  //     });
  //   });
  //   return App.render();
  // },

  render: function() {
    var candidateInstance;
    var done=$("#done");
    var main=$("#main");
    main.show();
    done.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Candidate.deployed().then(function(instance) {   //listing candidates
      candidateInstance = instance;
      return candidateInstance.candidatesCount();
    }).then(function(candidatesCount) {
      candidatesResults = [];
      candidatesResults.splice(0,candidatesResults.length);

      for (var i = 1; i <= candidatesCount; i++) {
        candidateInstance.candidates(i).then(function(candidate) {
          // var id = candidate[0];
          // var name = candidate[1];

          var aadhar = candidate[4];
          // Render candidate Result
          candidatesResults.push(aadhar);
          console.log(aadhar);

        });
      }
      
    }).then(function(isCandidate) {
      if(isCandidate) {
        main.hide();
        done.show();
      }
      else
      {
        main.show();
        done.hide();
      }
    }).catch(function(error) {
      console.warn(error);
    });
  },




  AddCandidate: function() {
    var candidateName = $('#name').val();
    var candidateAge = $('#age').val();
    var candidateGender = $('#gen').val();
    var candidateVoterId = $('#vtrid').val();
    var candidateAdharId = $('#adrid').val();
    var candidateCrimeFile = $('#cmf').val();
    var candidateItrFile = $('#itr').val();
    var candidateimgFile = $('#imgf').val();

//    console.log(candidateName + " " + candidateAge + " " + candidateGender + " " + candidateVoterId + " " + candidateAdharId + " " + candidateCrimeFile + " " + candidateItrFile + " " + candidateimgFile);

    App.contracts.Candidate.deployed().then(function(instance) {
      console.log("in");
      var flag=true;
      for(var i=0;i<=candidatesResults.length;i++){
        if (candidatesResults[i] === candidateAdharId )
          flag=false;
      }
    if (flag == false){
      alert("Candidate Already Registered");
    }
    else{
      return instance.addCandidate(candidateName,candidateAge,candidateVoterId,candidateAdharId,true,true, { from: App.account });
    }
    }).then(function(result) {
      var done = $("#done");
      $("#main").hide();
      done.show();
    }).catch(function(err) {
      console.error(err);
    });
  
  },
};

 // loadJs: function()

$(function() {
  $(window).load(function() {
    App.init();
  });
});
