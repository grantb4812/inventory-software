var myApp = angular.module('myApp', [
    
    'ui.router',
    "xeditable"
]);

myApp.run(function(editableOptions) {
  editableOptions.theme = 'default'; 
});

myApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/login');
    
    
    $stateProvider
        .state('login', {
           url: "/",
           templateUrl: 'views/login.html',
           controller: 'authController'
        })
        .state('register', {
            url: '/register',
            templateUrl:'views/register.html',
            controller: 'userController'
        })
        .state('dashboard', {
            url:'/dashboard',
            templateUrl: 'views/dashboard.html',
            controller: 'authController'
        })
        .state('dashboard.user', {
            url: '/user',
            templateUrl: 'views/user/user.html',
            controller: 'userController'
        })
        .state('dashboard.po', {
            url: '/po',
            templateUrl: 'views/po/po.html',
            controller: 'poController'
        })
        .state('dashboard.order', {
            url: '/order',
            templateUrl: 'views/order/order.html',
            controller: 'orderController'
        })
        .state('dashboard.material', {
            url: '/materialmanagement',
            templateUrl: 'views/material/material.html',
            controller: 'poController'
        })
        .state('dashboard.receiving', {
            url: '/receiving',
            templateUrl: 'views/receiving/receiving.html',
            controller: 'poController'
        })
        .state('dashboard.shipping', {
            url: '/shipping',
            templateUrl: 'views/shipping/shipping.html',
            controller: 'orderController'
        })
        .state('dashboard.reports', {
            url: '/reports',
            templateUrl: 'views/reports/reports.html',
            controller: 'reportsController'
        })
        .state('dashboard.reports.cycle', {
            url: '/reports',
            templateUrl: 'views/reports/cyclecount.html',
            controller: 'reportsController'
        })
        .state('dashboard.reports.receiving', {
            url: '/reports',
            templateUrl: 'views/reports/receivingreports.html',
            controller: 'reportsController'
        })
        .state('dashboard.reports.shipping', {
            url: '/reports',
            templateUrl: 'views/reports/shippingreports.html',
            controller: 'reportsController'
        });
});



myApp.controller('mainController', function($scope, $window) {
    $scope.hgt = {height: $window.innerHeight + 'px'};
});


