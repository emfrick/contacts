module.exports = runBlock;

runBlock.$inject = ['$rootScope', 'AuthFactory'];

function runBlock($rootScope, AuthFactory) {
  console.log("Run Block");

  $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams, options) => {
    console.log('$stateChangeStart', fromState, toState);
  });

  $rootScope.$on('$locationChangeStart', (event, location) => {
    console.log('$locationChangeStart', location);

    if (AuthFactory.accessTokenPresent(location)) {
      console.log("ACCESS TOKEN PRESENT");

      AuthFactory.exchangeForToken(AuthFactory.access_token);
    }
  });
}
