module.exports = AppConfig;

AppConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

function AppConfig($urlRouterProvider, $stateProvider) {

  var homeState = {
    name: 'home',
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: 'home',
    templateUrl: './public/home.html'
  }

  $stateProvider.state(homeState);

  $urlRouterProvider.otherwise('/');
}
