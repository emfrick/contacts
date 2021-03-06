/**
 * Export the controller
 */
module.exports = BankDetailsController;

/**
 * Controller Dependencies
 */
BankDetailsController.$inject = ['$state', '$uibModal', 'bank', 'AuthFactory', 'BanksFactory'];

/**
 * Controller Definition
 */
function BankDetailsController($state, $uibModal, bank, AuthFactory, BanksFactory) {
  console.log("BankDetailsController Instantiated", bank);

  var vm = this;

  vm.bank = bank;
  vm.error = null;

  vm.save = function() {
    BanksFactory.update(vm.bank)
                .then((bank) => {
                  vm.bank = bank;
                  $state.go('^', {}, { reload: true });
                })
                .catch((err) => {
                  vm.error = err;
                });
  }

  vm.addComment = function(id) {

    var modalInstance = $uibModal.open({
      templateUrl: 'addCommentModal.html',
      controller: ['$uibModalInstance', function($uibModalInstance) {
        this.ok = (comment) => {
          $uibModalInstance.close(comment);
        };

        this.cancel = () => {
          $uibModalInstance.dismiss();
        }
      }],
      controllerAs: 'commentModal'
    });

    modalInstance.result.then((comment) => {
      console.log("Closed Modal with comment", comment);

      comment.author = "Eric Frick"
      comment.date = Date.now();
      vm.bank.comments.push(comment);
    }, () => {
      console.log("Modal Dismissed");
    })

  }

  vm.removeComment = function(comment) {
    vm.bank.comments.splice(vm.bank.comments.indexOf(comment), 1);
  }

};
