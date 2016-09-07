/**
 * Export the controller
 */
module.exports = TitleController;

/**
 * Controller Dependencies
 */
TitleController.$inject = [];

/**
 * Controller Definition
 */
function TitleController() {
  console.log("TitleController Instantiated");

  var vm = this;

  vm.title = "New Title";

};
