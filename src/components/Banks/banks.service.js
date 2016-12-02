/**
 * Export the factory
 */
module.exports = BanksFactory;

/**
 * Factory Dependencies
 */
BanksFactory.$inject = ['$http', '$q'];

/**
 * Factory Definition
 */
function BanksFactory($http, $q) {
  console.log("BanksFactory Instantiated");

  //let apiEndpoint = '../../../data/banks.json';
  let banksEndpoint = 'http://localhost:3333/banks';

  /** API Definition **/
  return {
    all: getAllBanks,
    get: getBank
  };

  /** API Implementation **/

  function getAllBanks() {
    console.log('BanksFactory.getAllBanks');

    return $http.get(banksEndpoint)
                .then(getAllBanksSuccess)
                .catch(responseError);
  }

  function getBank(id) {
    console.log('BanksFactory.getBank');

    return $http.get(`${banksEndpoint}/` + id)
                // .then((response) => {
                //   return mockResult(response, id);
                // })
                .then(getBankSuccess)
                .catch(responseError);
  }

  /** Mock Data Functions **/
  function mockResult(response, id) {
    console.log('BanksFactory.mockResult', response, id);

    response.data = _.find(response.data, '_id', id);

    return response;
  }

  /** Success / Failure Handlers **/

  function getAllBanksSuccess(response) {
    console.log('BanksFactory.getAllBanksSuccess', response);

    return response.data;
  }

  function getBankSuccess(response) {
    console.log('BanksFactory.getBankSuccess', response);

    return response.data[0];
  }

  function responseError(err) {
    console.error("BanksFactory.responseError", err);

    return err;
  }

};
