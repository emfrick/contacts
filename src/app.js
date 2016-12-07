var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('angular-lock');
require('angular-jwt');
require('lodash');

angular
  .module('recruiter', ['ui.router', 'ui.bootstrap', 'auth0.lock', 'angular-jwt'])
  .config(require('./config'))
  .run(require('./run'))
  .controller('HomeCtrl', require('./components/Home/home'))
  .controller('LoginCtrl', require('./components/Login/login'))
  .controller('BanksCtrl', require('./components/Banks/banks'))
  .controller('BankDetailsCtrl', require('./components/Banks/bankDetails'))
  .factory('AuthFactory', require('./components/Auth/auth'))
  .factory('APIInterceptor', require('./components/Auth/auth.interceptor'))
  .factory('BanksFactory', require('./components/Banks/banks.service'));
