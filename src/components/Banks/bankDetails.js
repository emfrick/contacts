/**
 * Export the controller
 */
module.exports = BankDetailsController;

/**
 * Controller Dependencies
 */
BankDetailsController.$inject = ['$state', 'bank', 'AuthFactory'];

/**
 * Controller Definition
 */
function BankDetailsController($state, bank, AuthFactory) {
  console.log("BankDetailsController Instantiated", bank);

  var vm = this;

  vm.bank = bank;

};
