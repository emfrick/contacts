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

  var banksState = {
    name: 'banks',
    url: '/banks',
    controller: 'BanksCtrl',
    controllerAs: 'banks',
    templateUrl: '../views/banks.html'
  };

  var bankDetailState = {
    name: 'banks.bank',
    url: '/:id',
    controller: 'BankDetailsCtrl',
    controllerAs: 'bank',
    templateUrl: '../views/bank_details.html',
    resolve: {
      bank: ($stateParams, BanksFactory) => {
        return BanksFactory.get($stateParams.id)
                    .then((bank) => {
                      console.log("resolve.bankdetails", bank);
                      return bank;
                    })
                    .catch((err) => {
                      console.error("NOPE");
                    });
      }
    }
  };

  var bankEditState = {
    name: 'banks.bank.edit',
    url: '/edit',
    controller: 'BankDetailsCtrl',
    controllerAs: 'bank',
    templateUrl: '../views/bank_edit.html',
    resolve: {
      bank: ($stateParams, BanksFactory) => {
        return BanksFactory.get($stateParams.id)
                    .then((bank) => {
                      console.log("resolve.bankedit", bank);
                      return bank;
                    })
                    .catch((err) => {
                      console.error("NOPE");
                    });
      }
    }
  };

  $stateProvider.state(loginState);
  $stateProvider.state(signupState);
  $stateProvider.state(homeState);
  $stateProvider.state(banksState);
  $stateProvider.state(bankDetailState);
  $stateProvider.state(bankEditState);

  $urlRouterProvider.otherwise('/');
}
