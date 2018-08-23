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
      return App.checkPlayerExists("jhkjk");

    // return App.markAdopted()

    })
  },

  checkPlayerExists: function(address) {
    var bettingInstance;
    console.log(address);
    
    App.contracts.Betting.deployed().then(function(instance){
      bettingInstance = instance;
      console.log(instance);
    
      return bettingInstance.checkPlayerExists.call();
    }).then(function(results){
      console.log(result);
      
    }).catch(function(err) {
      console.log(err.message);
    });
  }
}





$(function() {
    $(window).load(function() {
      App.init();
    });
});




    // initWeb3: function() {
    // if (typeof web3 !== 'undefined') {
    //   web3 = new Web3(web3.currentProvider);
    // } else {
    //   // set the provider you want from Web3.providers
    //   web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    // }}



    // // Load pets.
    // .getJSON('../pets.json', function(data) {
    //   var BetAmount = $('#petsRow');
    //   var petTemplate = $('#petTemplate');

//     //   for (i = 0; i < data.length; i ++) {
//     //     petTemplate.find('.panel-title').text(data[i].name);
//     //     petTemplate.find('img').attr('src', data[i].picture);
//     //     petTemplate.find('.pet-breed').text(data[i].breed);
//     //     petTemplate.find('.pet-age').text(data[i].age);
//     //     petTemplate.find('.pet-location').text(data[i].location);
//     //     petTemplate.find('.btn-adopt').attr('data-id', data[i].id);

//     //     petsRow.append(petTemplate.html());
//     //   }
//     // });

//     var BetAmount = $('#BetAmount');
//     var TeamSelection = $('#TeamSelection');

//     return App.initWeb3();
//   },

//   initWeb3: function() {
//     if (typeof web3 !== 'undefined') {
//       web3 = new Web3(web3.currentProvider);
//     } else {
//       // set the provider you want from Web3.providers
//       web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//     }

//     return App.initContract();
//   },



      

//     return App.bindEvents();
//   },

//   bindEvents: function() {
//     $(document).on('click', '.btn-adopt', App.handleAdopt);
//   },

//   testfunction: function(adopters, account) {
//     /*
//      * Replace me...
//      */
//   },

//   handleAdopt: function(event) {
//     event.preventDefault();

//     var petId = parseInt($(event.target).data('id'));

//     /*
//      * Replace me...
//      */
//   }

// };


