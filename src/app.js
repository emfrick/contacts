var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');
require('angular-lock');
require('angular-jwt');

angular
  .module('recruiter', ['ui.router', 'ui.bootstrap', 'auth0.lock', 'angular-jwt'])
  .config(require('./config'))
  .controller('HomeCtrl', require('./components/Home/home'));
