module.exports = AppConfig;

AppConfig.$inject = ['$urlRouterProvider', '$stateProvider', '$httpProvider'];

function AppConfig($urlRouterProvider, $stateProvider, $httpProvider) {
  console.log("AppConfig");

  var homeState = {
    name: 'home',
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

  $stateProvider.state(loginState);
  $stateProvider.state(homeState);
  
  $urlRouterProvider.otherwise('/');
}
