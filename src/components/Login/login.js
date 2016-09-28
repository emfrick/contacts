/**
 * Export the controller
 */
module.exports = LoginController;

/**
 * Controller Dependencies
 */
LoginController.$inject = ['AuthFactory'];

/**
 * Controller Definition
 */
function LoginController(AuthFactory) {
  console.log("LoginController Instantiated");

  var vm = this;

  vm.authenticate = AuthFactory.authenticate;

};
