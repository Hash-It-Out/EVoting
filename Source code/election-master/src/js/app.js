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
    $.getJSON("Election.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Election = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Election.setProvider(App.web3Provider);

      // App.listenForEvents();

      return App.render();
    });
  },

  // Listen for events emitted from the contract
  listenForEvents: function() {

    App.contracts.Election.deployed().then(function(instance) {
      // Restart Chrome if you are unable to receive this event
      // This is a known issue with Metamask
      // https://github.com/MetaMask/metamask-extension/issues/2393
      instance.votedEvent({}, {
        fromBlock: 0,
        toBlock: 'latest'
      }).watch(function(error, event) {
        console.log("event triggered", event)
        // Reload when a new vote is recorded
      
      });
    });
    return App.render();
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");
    var done = $("#done");
    var result=$(".result");
    var main=$(".main");
    main.show();
    result.hide();
    loader.show();
    content.hide();
    done.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then(function(instance) {   //listing candidates
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      var labels_array=[];
      var data_array=[];

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          labels_array.push(name);
          data_array.push(voteCount);


          // Render candidate Result
          /*var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);*/

          // Render candidate ballot option
          var candidateOption =  `
          <div class="card" style="background-color:#fff;width:260Px;height:auto;">
        <div class="card-image">
        <style type="text/css">
        #vote-but:hover
        {
          background-color:#fff !important;
          border:1px solid #fc4a1a; 
          color:#fc4a1a;
          transition:all linear 0.1s; 

        }
        </style>
          <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" class="card-img" style="border: 0px solid; box-shadow: 0px 0px 15px #888888;border-radius: 10px;">
          <button  id="vote-but"class="btn-floating halfway-fab waves-effect waves-light red"style="font-size:18px; background-color: #fc4a1a; font-weight: bold; height:60px;width:60px;" onClick="App.castVote(`+id+`); return false;">VOTE</button>
        </div>
        <div class="card-content">
          <h4><u>` + name + `</u></h4>
          <p style="padding-bottom:15px"><span style="font-weight:700">Party:</span> BJP  Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>
          <h3 style="text-align:center;">Party Symbol</h3>
          <img src="party.jpg" style="display: block;margin-left: auto;margin-right: auto; width: 50%;">
        </div>
      </div>`;

          candidatesSelect.append(candidateOption);
        });
      }

      /*var ctx = document.getElementById('myChart').getContext('2d');
      var chart = new Chart(ctx, {
      type: 'bar',
      data:{
          labels:labels_array,
          datasets:[{
            label:'# of Votes',
            data: data_array,
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
              'rgba(255, 159, 64, 0.6)',
              'rgba(255, 99, 132, 0.6)'
            ],
            borderWidth:1,
            borderColor:'#777',
            hoverBorderWidth:3,
            hoverBorderColor:'#000'
          }]
        },
      options:{
          title:{
            display:true,
            text:"Each Candidate's Vote(s)",
            fontSize:25
          },
          legend:{
            display:true,
            position:'right',
            labels:{
              fontColor:'#000'
            }
          },
          layout:{
            padding:{
              left:50,
              right:0,
              bottom:0,
              top:0
            }
          },
          tooltips:{
            enabled:true
          }
        }
  });

      var ctx = document.getElementById('myChart1').getContext('2d');
      var chart = new Chart(ctx, {
          type: 'pie',
          data:{
              labels:labels_array,
              datasets:[{
                label:'# of Votes',
                data: data_array,
                backgroundColor:[
                  'rgba(255, 99, 132, 0.6)',
                  'rgba(54, 162, 235, 0.6)',
                  'rgba(255, 206, 86, 0.6)',
                  'rgba(75, 192, 192, 0.6)',
                  'rgba(153, 102, 255, 0.6)',
                  'rgba(255, 159, 64, 0.6)',
                  'rgba(255, 99, 132, 0.6)'
                ],
                borderWidth:1,
                borderColor:'#777',
                hoverBorderWidth:3,
                hoverBorderColor:'#000'
              }]
            },

          options:{
              title:{
                display:true,
                text:'Vote Share',
                fontSize:25
              },
              legend:{
                display:true,
                position:'right',
                labels:{
                  fontColor:'#000'
                }
              },
              layout:{
                padding:{
                  left:50,
                  right:0,
                  bottom:0,
                  top:0
                }
              },
              tooltips:{
                enabled:true
              }
            }
      });*/


      return electionInstance.voters(App.account);
    }).then(function(hasVoted) {
      // Do not allow a user to vote
      if(hasVoted) {
        content.hide();
        loader.hide();
        var done = $("#done");
        var resultLink =  `<div style="margin-left:30%;"><button style="background-image: linear-gradient(to top, #12eaf4, #00f1ea, #00f6dc, #00fbc8, #1cffb0);"><a href="chart2.html" style="color:#000;text-decoration:none;font-size:25px;">Check out the results here...</a></button></div>`;
        done.append(resultLink);
        done.show();
      }
      else
      {
        loader.hide();
        content.show();
        done.hide();
      }
    }).catch(function(error) {
      console.warn(error);
    });
  },

  castVote: function(i) {
    // var candidateId = $('#candidatesSelect').val();
    var candidateId=i;
    //console.log("value:",candidateId);
    App.contracts.Election.deployed().then(function(instance) {
      return instance.vote(candidateId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      var done = $("#done");
      var resultLink =  `<div style="margin-left:30%;"><button onClick="App.loadJs()" style="background-image: linear-gradient(to top, #12eaf4, #00f1ea, #00f6dc, #00fbc8, #1cffb0);">Check out the results here...</button></div>`;
      done.append(resultLink);
      $("#content").hide();
      $("#loader").hide();
      done.show();
    }).catch(function(err) {
      console.error(err);
    });
  },

  loadJs: function(){
    var result=$(".result");
    var main=$(".main");

    var labelss_array=[];
    var datas_array=[];


    App.contracts.Election.deployed().then(function(instance) {   //listing candidates
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then(function(candidatesCount) {
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      var candidatesSelect = $('#candidatesSelect');
      candidatesSelect.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then(function(candidate) {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          labelss_array.push(name);
          // console.log(name);
          // console.log(labels_array[0])
          datas_array.push(voteCount);
        });
      }
    });

    console.log(labelss_array[0]);
    var ctx = document.getElementById('myChart1');
    var chart = new Chart(ctx, {
    type: 'pie',
    data:{
        labels:labelss_array,
        datasets:[{
          label:'# of Votes',
          data: datas_array,
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)'
          ],
          borderWidth:1,
          borderColor:'#777',
          hoverBorderWidth:3,
          hoverBorderColor:'#000'
        }]
      },
    options:{
        title:{
          display:true,
          text:"Vote Share",
          fontSize:20,
        },
        legend:{
          display:true,
          position:'right',
          labels:{
            fontColor:'#000'
          }
        },
        layout:{
          padding:{
            left:25,
            right:0,
            bottom:0,
            top:0
          }
        },
        tooltips:{
          enabled:true
        }
      }
});

    result.show();
    main.hide();

  }
};

 // loadJs: function()

$(function() {
  $(window).load(function() {
    App.init();
  });
});
