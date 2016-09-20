module.exports = runBlock;

runBlock.$inject = ['$rootScope', 'AuthService', 'authManager', '$state'];

function runBlock($rootScope, AuthService, authManager, $state) {
  console.log("Run Block", $rootScope, AuthService, authManager);

  // Put the authService on $rootScope so its methods
  // can be accessed from the nav bar
  $rootScope.authService = AuthService;

  // Register the authentication listener that is
  // set up in auth.service.js
  AuthService.registerAuthenticationListener();

  // Use the authManager from angular-jwt to check for
  // the user's authentication state when the page is
  // refreshed and maintain authentication
  authManager.checkAuthOnRefresh();

  // Listen for 401 unauthorized requests and redirect
  // the user to the login page
  authManager.redirectWhenUnauthenticated();

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
    console.log("CHANGING STATE");
  });

  $rootScope.$on('userProfileSet', function() {
    console.log("User Profile Was Set");

    $state.go('default');
  });

  // somewhere else
  $rootScope.$on('$stateNotFound',
  function(event, unfoundState, fromState, fromParams){
    event.preventDefault();
    console.log(unfoundState.to); // "lazy.state"
    console.log(unfoundState.toParams); // {a:1, b:2}
    console.log(unfoundState.options); // {inherit:false} + default options
  });
}
