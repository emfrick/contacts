module.exports = AppConfig;

AppConfig.$inject = ['$urlRouterProvider', '$stateProvider'];

function AppConfig($urlRouterProvider, $stateProvider) {

  var defaultState = {
    name: 'default',
    url: '/',
    controller: 'TitleCtrl',
    controllerAs: 'title',
    templateUrl: './public/title.html'
  }

  $stateProvider.state(defaultState);

  $urlRouterProvider.otherwise('/');
}
