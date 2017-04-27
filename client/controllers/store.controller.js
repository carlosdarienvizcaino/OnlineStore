
storeApp.controller("storeController", ['$scope', 'customerService', 'resourcesService',
    function($scope, customerService, resourcesService){

        $scope.storeItems = [
            { logoUrl : "http://sites.psu.edu/siowfa15/wp-content/uploads/sites/29639/2015/09/04_Apples.jpg", name : "Apple", price : 1, qty : 1 },
            { logoUrl : "http://www.imagehandler.net/?iset=0108&img=A88203000&fmt=png&w=300&h=300&iindex=0088&c=999", name : "Nike Soccer Shoes", price : 90, qty : 1 },
            { logoUrl : "http://images.eastbay.com/pi/2714100/zoom/nike-ordem-3-soccer-ball", name : "Soccer Ball", price : 120, qty : 1 },
            { logoUrl : "https://qph.ec.quoracdn.net/main-qimg-e966f479b74b12155f6a6ebdff1999cd-c", name : "Design Book Pattern Book", price : 25, qty : 1 },
            { logoUrl : "https://cdn.pixabay.com/photo/2014/04/22/02/56/pizza-329523__340.jpg", name : "Pizza", price : 10, qty : 1 }
        ];

        $scope.isCustomerRegistered = function() {
            return customerService.isCustomerRegistered();
        };

        $scope.isCostumerRegisterd = false;

        $scope.purchase = function () {

            if ( customerService.isCustomerRegistered() && $scope.selectedItems.length > 0 ) {

                var total = 0;
                var itemNames = [];

                $scope.selectedItems.forEach(function(currentItem){
                    total += currentItem.price * currentItem.qty;
                    itemNames.push(currentItem.name);
                });

                var customer = {
                    id : customerService.customerId,
                    itemNames : itemNames,
                    total : total
                };

                resourcesService.createOrder(customer)
                    .then(response => {
                       setTimeout(function(){ updateCustomerData(); }, 2000);
                    })
                    .catch( err =>{
                        console.log(err);
                    });
            }
        };

        function updateCustomerData() {
            resourcesService.getCustomerById(customerService.customerId)
                .then(response => {
                    customerService.credit = response.data[0].credit;
                })
                .catch( err =>{
                    console.log(err);
                });
        }

        $scope.getCustomerFirstName = function () {
            return customerService.firstName;
        };

        $scope.getCustomerLastName = function () {
            return customerService.lastName;
        };

        $scope.getCustomerCredit = function () {
            return customerService.credit;
        };

        $scope.selectedItems = [];
        $scope.selectedItemsByIndex = [];

        $scope.updateSelectedItems = function(name, price, qty, index) {

            var currentItem = {name: name, price:price, qty: qty};
            var indexOfCurrentItem = this.selectedItemsByIndex.indexOf(index);

            // Add
            if (indexOfCurrentItem < 0) {
              this.selectedItemsByIndex.push(index);
              this.selectedItems.push(currentItem);
            }
            // Remove
            else {
                this.selectedItemsByIndex.splice(indexOfCurrentItem, 1);
               this.selectedItems.splice(indexOfCurrentItem, 1);
            }

        };

    }]);
