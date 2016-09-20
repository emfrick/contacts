/**
 * Export the controller
 */
module.exports = LoginController;

/**
 * Controller Dependencies
 */
LoginController.$inject = ['AuthService'];

/**
 * Controller Definition
 */
function LoginController(AuthService) {
  console.log("LoginController Instantiated");

  var vm = this;

  // Put the authService on $scope to access
  // the login method in the view
  vm.authService = AuthService;

};
