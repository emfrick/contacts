module.exports = AppConfig;

AppConfig.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider'];

function AppConfig($urlRouterProvider, $stateProvider, $httpProvider) {
  console.log("AppConfig");

  var loginState = {
    name: 'login',
    url: '/',
    controller: 'LoginCtrl',
    controllerAs: 'login',
    templateUrl: '../views/login.html'
  };

  var signupState = {
    name: 'signup',
    url: '/signup',
    templateUrl: '../views/signup.html'
  };

  var homeState = {
    name: 'home',
    url: '/home',
    controller: 'HomeCtrl',
    controllerAs: 'home',
    templateUrl: '../views/home.html'
  };

  $stateProvider.state(loginState);
  $stateProvider.state(signupState);
  $stateProvider.state(homeState);

  $urlRouterProvider.otherwise('/');
}
