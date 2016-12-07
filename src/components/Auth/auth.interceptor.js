/**
 * Export the Interceptor
 */
module.exports = APIInterceptor;

/**
 * Interceptor Dependencies
 */
APIInterceptor.$inject = ['$rootScope'];

/**
 * Interceptor Definition
 */
function APIInterceptor($rootScope) {
  console.log("APIInterceptor Instantiated");

  let interceptor = {
    responseError: (rejection) => {
      if (rejection.status === 401) {
        $rootScope.$broadcast('unauthenticated', { message: 'Your session has expired, please login again' });
      }

      return rejection;
    }
  };

  return interceptor;
};
