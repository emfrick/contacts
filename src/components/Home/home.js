/**
 * Export the controller
 */
module.exports = HomeController;

/**
 * Controller Dependencies
 */
HomeController.$inject = ['$state','AuthFactory'];

/**
 * Controller Definition
 */
function HomeController($state, AuthFactory) {
  console.log("HomeController Instantiated");

  var vm = this;

  vm.logout = AuthFactory.logout;

};
