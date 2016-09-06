var angular = require('angular');
require('angular-ui-router');
require('angular-ui-bootstrap');

angular
  .module('recruiter', ['ui.router', 'ui.bootstrap'])
  .config(require('./config'))
  .controller('TitleCtrl', require('./components/Title/title'));
