/**
 * Export the controller
 */
module.exports = BanksController;

/**
 * Controller Dependencies
 */
BanksController.$inject = ['$state', '$http', 'AuthFactory', 'BanksFactory'];

/**
 * Controller Definition
 */
function BanksController($state, $http, AuthFactory, BanksFactory) {
  console.log("BanksController Instantiated");

  var vm = this;

  vm.banks = [];

  vm.logout = AuthFactory.logout;

  BanksFactory.all()
              .then(banks => {
                vm.banks = banks;
              });

};
