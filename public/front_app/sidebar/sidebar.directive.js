(function () {
    'use strict';
    angular.module('notificationApp').directive('sidebarDirective', sidebarDirective);

    function sidebarDirective() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'front_app/sidebar/sidebar.html',
            link: linkFunc
        };

        function linkFunc(scope, elem, attr) {
            scope.removeActive = function () {
                angular.element('.navigation').removeClass('active-nav')
            };
        }
    }
})();