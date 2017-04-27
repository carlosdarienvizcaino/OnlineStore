
storeApp.service('customerService', function(){

    this.customerId = undefined;

    this.firstName = "John";

    this.lastName = "Doe";

    this.credit = 0;

    this.isCustomerRegistered = function(){
       return this.customerId != undefined;
    }
});