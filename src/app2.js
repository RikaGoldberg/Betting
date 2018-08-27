App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initWeb3();
    
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
    }
    web3 = new Web3(App.web3Provider)

    return App.initContract();
  },
  
  initContract: function() {
    web3.eth.defaultAccount = web3.eth.accounts[0];
    $.getJSON('./build/contracts/Betting.json', function(data){
      var BettingArtifact = data
      App.contracts.Betting = TruffleContract(BettingArtifact);
      App.contracts.Betting.setProvider(App.web3Provider);
      // return App.checkPlayerExists();
      // App.checkPlayerExists("Player Checked");
      // App.distributePrizes("Prizes Distributed")

      // return App.bindEvents();

    })
  },
 bindEvents: function() {
    $(document).on('click', '.btn-submit', App.testfunction);
     // $(document).on('click', '#distributePrizes', App.testfunction);
    // $(document).on('click', '.btn-distributeprizes', alert("hello"));
 
  // bindEvents: function() {
  //   $(document).on('click', '#betForm', App.testfunction);
  //   $(document).on('click', '#distributePrizes', alert("hello"));
      
  },
  
  Bet: function(wager) {
    var betAmount; 
    console.log(wager);

    App.contracts.Betting.deployed().then(function(instance){
      bettingInstance = instance;
      console.log(instance);
         return bettingInstance.bet(wager, {from:web3.eth.coinbase,value:9999});
      
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  distributePrizes: function(prize) {
    var bettingInstance
    console.log(prize)

    App.contracts.Betting.deployed().then(function(instance){
      bettingInstance = instance;
      console.log(instance);
         return bettingInstance.bet(prize, {from:web3.eth.coinbase,value:9999});
        //  return alert("prizes distributed");
         
    }).then(function(results){
      console.log(results);

      
    }).catch(function(err) {
      console.log(err.message);
    });
  },

      
   checkPlayerExists: function(address) {
    var bettingInstance;
    App.contracts.Betting.deployed().then(function(instance){
        bettingInstance = instance;
        return bettingInstance.getBets
        console.log(address);
        
    })
  },
    // console.log(address);
        
    // return App.contracts.Betting.deployed().then(function(instance){
    //   bettingInstance = instance;
          
  //     return bettingInstance.checkPlayerExists.call("0x009999");

  //   }).then(function(results){
  //     console.log(results);

      
  //   }).catch(function(err) {
  //     console.log(err.message);
  //   });
  // },

  testfunction: function(event){
    // event.preventDefault();
    
      
     var betAmount = $("#BetAmount").val();
     var teamSelection = $("#TeamSelection").val();
     console.log(teamSelection);
     console.log(betAmount);

     alert("Team 1 Won - Woot! You're interacting with Web3 now, congratulations! PS, I am not a developer so please pardon the very basic UI!") 
  
     return false; 
  
   
   

  }
 }


$(function() {
    $(window).load(function() {
      App.init();     
    });
});







