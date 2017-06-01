(function () {
    'use strict';

    angular.module('notificationApp').config(routeApp);
    
    function routeApp($stateProvider, $urlRouterProvider) {
        $stateProvider.state('home', {
            name: 'home',
            url: '/home',
            template: '<app-home></app-home>'
        });
        $stateProvider.state('notice', {
            name: 'notice',
            url: '/notification',
            template: '<notification-directive></notification-directive>'
        });
        $urlRouterProvider.otherwise('/notification');
    }
})();