

storeApp.controller("homeController", ['$scope', 'customerService', 'resourcesService',

    function($scope, customerService, resourcesService){

        $scope.orderItems = [];

        $scope.customer = {
            firstName : customerService.firstName,
            lastName: customerService.lastName
        };

        $scope.isCostumerRegistered = function() {
            return customerService.isCustomerRegistered();
        };

        $scope.noOrdersFoundForCustomer = function() {
            return this.orderItems.length <= 0;
        };

        $scope.viewOrders = function () {

            if (customerService.customerId != undefined) {
                console.log("Customer orders is been queried");
                queryOrdersForCustomer(customerService.customerId);
            }
        };

        function queryOrdersForCustomer(customerId) {
            resourcesService.getOrdersByCustomerId(customerId)
            .then(response =>{

                console.log(response.data);
                $scope.orderItems = [];
                var data = response.data;
                data.forEach(function(item){

                    var itemNames = "";
                    item.itemNames.forEach(function(itemName){
                        itemNames += itemName + ", ";
                    });

                    $scope.orderItems.push({status: item.status, date : item.date, itemNames: itemNames, total : item.total});
                });
            })
            .catch(error => {
               console.log(error);
            });
        }

    }]);

