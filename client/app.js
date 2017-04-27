
var storeApp = angular.module('storeApp',['ngRoute', 'ngResource']);

// Necessary in Angular 1.6 to do routing.
storeApp.config(['$locationProvider', '$resourceProvider', function($locationProvider, $resourceProvider ) {
    $locationProvider.hashPrefix('');
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);
