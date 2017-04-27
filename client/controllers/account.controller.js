
storeApp.controller("accountController", ['$scope', 'resourcesService', 'customerService',
    function($scope, resourcesService, customerService ){

        $scope.customer = {
            firstName : "John",
            lastName : "Doe",
            credit : 200,
            id: undefined,
        };

        $scope.createUser = function () {

            resourcesService.createCustomer($scope.customer)
                .then( response => {
                    console.log(response);
                    $scope.customer.id = response.data.customerId;
                    this.updateCurrentUser();
                })
                .catch(error => {
                    console.log(error);
                });
        }

        $scope.updateCurrentUser = function() {
            customerService.firstName = $scope.customer.firstName;
            customerService.lastName = $scope.customer.lastName;
            customerService.credit = $scope.customer.credit;
            customerService.customerId = $scope.customer.id;
        }
    }]);