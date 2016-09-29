module.exports = runBlock;

runBlock.$inject = ['$rootScope', 'AuthFactory'];

function runBlock($rootScope, AuthFactory) {
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
}
