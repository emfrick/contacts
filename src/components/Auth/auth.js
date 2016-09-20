/**
 * Export the factory
 */
module.exports = AuthFactory;

/**
 * Factory Dependencies
 */
AuthFactory.$inject = ['$window', '$http'];

/**
 * Factory Definition
 */
function AuthFactory($window, $http) {
  console.log("AuthFactory Instantiated");

  // API
  return {
    google: doGoogleLogin,
    accessTokenPresent: accessTokenPresent
  }

  //
  // Authenticates with Google OAuth 2
  //
  function doGoogleLogin() {

    // Define defaults
    const defaults = {
      endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      response_type: 'token',
      client_id: '136862652493-j05pu5qourta487hnk17g9db9iua2tri.apps.googleusercontent.com',
      redirect_uri: encodeURIComponent($window.location.origin),
      scope: encodeURIComponent('email profile')
    }

    // Build the URL
    var url = `${defaults.endpoint}?response_type=${defaults.response_type}&client_id=${defaults.client_id}&redirect_uri=${defaults.redirect_uri}&scope=${defaults.scope}`;

    // Redirect to Google
    $window.location.href = url;
  };

  function accessTokenPresent(location) {
    console.log("AuthService.accessTokenPresent()", location);

    if (localStorage.getItem('token')) {
      return true;
    }
    else if (/access_token=/.test(location)) {
      var params = parseHash();

      console.log(params);

      $http.get('https://www.googleapis.com/userinfo/v2/me?access_token=' + params['/access_token'])
           .then((res) => {
             console.log(res);
           })

      return true;
    }

    return false;
  }

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

};
