module.exports = runBlock;

runBlock.$inject = ['$rootScope', '$http', 'AuthFactory'];

function runBlock($rootScope, $http, AuthFactory) {
  console.log("Run Block");

  //
  // AuthFactory will check for OAuth redirects
  //
  AuthFactory.registerLocationListener($rootScope);

  //
  // Register a JWT Interceptor
  //
  //AuthFactory.registerJwtInterceptor();

  //
  // Register the Unauthorized (401) Interceptor
  //
  //AuthFactory.registerHttpInterceptor();

  //
  // Check for local token
  //
  AuthFactory.registerRefreshHandler();

  //
  // Register the Authentication Listener
  //
  AuthFactory.registerAuthenticationListener();
}
