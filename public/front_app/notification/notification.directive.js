(function () {
    'use strict';

    angular
        .module('notificationApp')
        .directive('notificationDirective', notificationDirective);

    function notificationDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'front_app/notification/notification.html',
            controller: 'NotificationController',
            controllerAs: 'vm'
        }
    }
})();