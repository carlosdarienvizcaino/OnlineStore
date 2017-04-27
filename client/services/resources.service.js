
storeApp.service('resourcesService', ['$http', function($http){

    this.createCustomer = function(customer) {
        var url = "/api/v1/customers";
        var data = {
            'firstName' : customer.firstName,
            'lastName'  : customer.lastName,
            'credit' : customer.credit
        };
      return $http.post(url, data);
    };

    this.createOrder = function (customer) {
        var url = "/api/v1/orders";
        var data = {
            'customerId' : customer.id,
            'itemNames'  : customer.itemNames,
            'total' : customer.total
        };
      return $http.post(url, data);
    };

    this.getOrdersByCustomerId = function(customerId) {

        var url = `/api/v1/orders/customers/${customerId}`;
        var options = {
            headers: {
                'Content-Type':'application/json'
            }
        };
      return $http.get(url, options);
    };

    this.getCustomerById = function(customerId) {

        var url = `/api/v1/customers/${customerId}`;
        var options = {
            headers: {
                'Content-Type':'application/json'
            }
        };
      return $http.get(url, options);
    };
}]);
