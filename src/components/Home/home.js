/**
 * Export the controller
 */
module.exports = HomeController;

/**
 * Controller Dependencies
 */
HomeController.$inject = ['$rootScope'];

/**
 * Controller Definition
 */
function HomeController($rootScope) {
  console.log("HomeController Instantiated");

  var vm = this;

};
