/**
 * Export the controller
 */
module.exports = LoginController;

/**
 * Controller Dependencies
 */
LoginController.$inject = ['$stateParams', 'AuthFactory'];

/**
 * Controller Definition
 */
function LoginController($stateParams, AuthFactory) {
  console.log("LoginController Instantiated", $stateParams);

  var vm = this;

  vm.message = $stateParams.message;

  vm.authenticate = AuthFactory.authenticate;

};
