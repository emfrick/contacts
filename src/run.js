module.exports = runBlock;

runBlock.$inject = ['$rootScope'];

function runBlock($rootScope) {
  console.log("Run Block");

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
    console.log('$stateChangeStart', fromState, toState);
  });

  $rootScope.$on('$locationChangeStart', (location) => {
    console.log('$locationChangeStart', location);
  });
}
