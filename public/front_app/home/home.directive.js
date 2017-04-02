(function () {
    'use strict';

    angular.module('notificationApp').directive('appHome', appHome);

    function appHome() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'front_app/home/home.html',
            controller: 'HomeController',
            controllerAs: 'vm'
        }
    }
})();