
storeApp.config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/account',{
            templateUrl : 'pages/account.html',
            controller: 'accountController'
        })
        .when('/store',{
            templateUrl : 'pages/store.html',
            controller: 'storeController'
        })
});


