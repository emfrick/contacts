/**
 * Export the factory
 */
module.exports = AuthFactory;

/**
 * Factory Dependencies
 */
AuthFactory.$inject = ['$window', '$http', '$rootScope', '$state'];

/**
 * Factory Definition
 */
function AuthFactory($window, $http, $rootScope, $state) {
  console.log("AuthFactory Instantiated");

  // API
  var service = {
    login: login,
    logout: logout,
    authenticate: authenticate,
    registerLocationListener: registerLocationListener,
    registerJwtInterceptor: registerJwtInterceptor,
    registerRefreshHandler: refreshHandler,
    registerAuthenticationListener: authenticationListener,
    access_token: ''
  };

  // Constants
  var CONSTANTS = {
    GOOGLE: 'google',
    LOCAL: 'local'
  }

  // Define defaults
  const defaults = {

    // For Google OAuth 2
    google: {
      endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      response_type: 'token',
      client_id: '136862652493-j05pu5qourta487hnk17g9db9iua2tri.apps.googleusercontent.com',
      redirect_uri: encodeURIComponent($window.location.origin),
      scope: encodeURIComponent('email profile')
    }

  };

  //
  // Login with a local provider (non-OAuth)
  //
  function login() {

  }

  //
  // Remove the application token
  //
  function logout() {
    console.log("AuthFactory.logout()");

    $rootScope.$broadcast('unauthenticated', { message: 'You have been logged out' });
  }

  //
  // Authenticates with the given OAuth 2 provider
  //
  function authenticate(provider) {
    console.log("AuthFactory.authenticate()", provider);

    var url = '';

    if (provider === CONSTANTS.GOOGLE) {
      // Build the URL
      url = `${defaults.google.endpoint}?response_type=${defaults.google.response_type}&client_id=${defaults.google.client_id}&redirect_uri=${defaults.google.redirect_uri}&scope=${defaults.google.scope}`;
    }

    // Redirect to the OAuth Provider
    $window.location.href = url;
  };

  //
  // This function will watch for changes to the URL
  //
  function registerLocationListener(scope) {
    console.log("AuthFactory.registerLocationListener()");

    scope.$on('$locationChangeStart', (event, location) => {
      console.log('$locationChangeStart', location);

      // Check if there is an access_token
      if (accessTokenPresent(location)) {

        // Exchange the OAuth token for an application token, and once
        // received, add it to local storage and send it for all future requests
        exchangeForApplicationToken(service.access_token)
          .then((token) => {
            $rootScope.$broadcast('authenticated', { token: token });
          });
      }

    });
  };

  //
  // Listen for a JWT in the response
  //
  function registerJwtInterceptor() {

  };

  //
  // Check for token on refresh
  //
  function refreshHandler() {
    console.log("AuthFactory.refreshHandler");
    let jwtToken = localStorage.getItem('token');

    if (jwtToken) {
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + jwtToken;
    }
  };

  //
  // Handle the 'authenticated' and 'unauthenticated' events
  //
  function authenticationListener() {

    $rootScope.$on('$stateChangeStart', (evt, toState, toParams, fromState, fromParams) => {
      console.log('$stateChangeStart', evt, toState, toParams, fromState, fromParams);

      if (toState.requiresAuth && !localStorage.getItem('token')) {
        evt.preventDefault();

        $rootScope.$broadcast('unauthenticated', { message: 'Please login to continue', redirect: toState.name });
      }
    });

    $rootScope.$on('authenticated', (evt, args) => {
      console.log('AuthFactory.authenticationListeners.authenticated');

      localStorage.setItem('token', args.token);
      $http.defaults.headers.common['Authorization'] = 'Bearer ' + args.token;

      if (args.redirect) {
        $state.go(args.redirect);
      }
      else {
        $state.go('home');
      }
    });

    $rootScope.$on('unauthenticated', (evt, args) => {
      console.log('AuthFactory.authenticationListeners.unauthenticated', args);

      localStorage.removeItem('token');
      delete $http.defaults.headers.common['Authorization'];

      $state.go('login', { message: args.message, redirect: args.redirect });
    });
  };

  //
  // Check for an "access_token" in the URL
  //
  function accessTokenPresent(location) {
    console.log("AuthFactory.accessTokenPresent()", location);

    if (/access_token=/.test(location)) {
      var params = parseHash();

      service.access_token = params['/access_token'];

      return true;
    }

    return false;
  };

  //
  // Exchanges the OAuth token for an application token on the backend
  //
  function exchangeForApplicationToken(access_token) {
    console.log("AuthFactory.exchangeForApplicationToken()", access_token);

    return $http.post('http://localhost:3333/auth/google', { access_token: access_token })
                .then((res) => {
                  return res.data.token;
                });
  };

  //
  // Parses the returned hash into an object
  //
  function parseHash() {
    var params = {};
    var queryString = location.hash.substring(1);
    var regex = /([^&=]+)=([^&]*)/g
    var m;

    while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
    }

    return params;
  }

  return service;

};
