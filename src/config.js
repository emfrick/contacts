module.exports = AppConfig;

AppConfig.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider'];

function AppConfig($urlRouterProvider, $stateProvider, $httpProvider) {
  console.log("AppConfig");

  var defaultState = {
    name: 'default',
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: 'home',
    templateUrl: '../views/home.html'
  };

  var loginState = {
    name: 'login',
    url: '/login',
    controller: 'LoginCtrl',
    controllerAs: 'login',
    templateUrl: '../views/login.html'
  };

  $stateProvider.state(defaultState);
  $stateProvider.state(loginState);

  $urlRouterProvider.otherwise('/');
}
