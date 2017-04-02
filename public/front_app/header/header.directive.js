(function () {
    'use strict';

    angular
        .module('notificationApp')
        .directive('headerApp', headerApp);
    
    function headerApp() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'front_app/header/header.html',
            link: linker
        };

        function linker(scope, elem, attr) {
            scope.openMenu = function () {
                angular.element('.navigation').toggleClass('active-nav')
            }
        }
    }
})();