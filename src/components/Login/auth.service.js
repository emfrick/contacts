module.exports = AuthService;

AuthService.$inject = ['$rootScope', '$state', 'lock', 'authManager'];

function AuthService($rootScope, $state, lock, authManager) {
  console.log("AuthService Instantiated", lock);

  var userProfile = JSON.parse(localStorage.getItem('profile')) || {};

  function login() {
    lock.show();
  }

  // Logging out just requires removing the user's
  // id_token and profile
  function logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    authManager.unauthenticate();
    userProfile = {};
  }

  // Set up the logic for when a user authenticates
  // This method is called from app.run.js
  function registerAuthenticationListener() {
    console.log("registerAuthenticationListener()");

    lock.on('authenticated', function(authResult) {
      console.log("You've been authenticated by Auth0", authResult);

      localStorage.setItem('id_token', authResult.idToken);
      authManager.authenticate();

      lock.getProfile(authResult.idToken, function(error, profile) {
        if (error) {
          console.log(error);
        }

        console.log("Got a profile OK");

        localStorage.setItem('profile', JSON.stringify(profile));
        $rootScope.$broadcast('userProfileSet', profile);
      });
    });
  }

  return {
    userProfile: userProfile,
    login: login,
    logout: logout,
    registerAuthenticationListener: registerAuthenticationListener
  }

}
