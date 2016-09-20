module.exports = AppConfig;

AppConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'lockProvider', '$httpProvider', 'jwtOptionsProvider'];

function AppConfig($urlRouterProvider, $stateProvider, lockProvider, $httpProvider, jwtOptionsProvider) {

  console.log("AppConfig", lockProvider, jwtOptionsProvider);

  lockProvider.init({
    clientID: 'b0SrKFAJg4DCAMDQvU3KbcMr1X316mxN',
    domain: 'recruiter.auth0.com'
  });

  lockProvider.options = {
    auth: {
      redirectUrl: "http://localhost:8080/",
      responseType: "token"
    }
  };

  jwtOptionsProvider.config({
    loginPath: '/login',
    unauthenticatedRedirectPath: '/help',
    tokenGetter: function() {
      return localStorage.getItem('id_token');
    }
  });

  $httpProvider.interceptors.push('jwtInterceptor');

  var defaultState = {
    name: 'default',
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: 'home',
    templateUrl: '../views/home.html'
  }

  var loginState = {
    name: 'login',
    url: '/login',
    controller: 'LoginCtrl',
    controllerAs: 'login',
    templateUrl: '../views/login.html'
  }

  var authState = {
    name: 'auth',
    url: 'access_token={.*}',
    template: '<h1>Authorized</h1>'
  }

  $stateProvider.state(defaultState);
  $stateProvider.state(loginState)
  $stateProvider.state(authState);

  //$urlRouterProvider.otherwise('/');
}
