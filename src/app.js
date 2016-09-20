var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');

angular
  .module('recruiter', ['ui.router', 'ui.bootstrap'])
  .config(require('./config'))
  .run(require('./run'))
  .controller('HomeCtrl', require('./components/Home/home'))
  .controller('LoginCtrl', require('./components/Login/login'))
  .factory('AuthFactory', require('./components/Auth/auth'));
