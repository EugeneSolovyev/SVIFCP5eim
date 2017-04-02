(function () {
    'use strict';

    angular.module('notificationApp').controller('HomeController', HomeController);

    HomeController.$inject = ['$http'];

    function HomeController($http) {
        var vm = this;
        vm.init_notes = [];
        vm.today = moment().format('DD MMMM YYYY');

        function getCards() {
            var today = {
                start: moment().startOf('day').unix(),
                end: moment().endOf('day').unix(),
            };
            $http.get('http://localhost:8000/get_all_notes').then(function (resolve_data) {
                angular.forEach(resolve_data.data, function (item) {
                    if (item.date >= today.start && item.date <= today.end) {
                        item.date = moment.unix(item.date).format('DD MMMM YYYY');
                        vm.init_notes.push(item);
                        vm.init_notes.reverse();
                    } else {
                        return false;
                    }
                });
            });
        } getCards();

        function getTodayExchange() {
            vm.interested_rates = [];
            $http.get('http://api.fixer.io/latest?base=USD').then(function (resolve) {
                vm.interested_rates.push({rate: resolve.data.rates.EUR, name: 'Euro'});
                vm.interested_rates.push({rate: resolve.data.rates.PLN, name: 'Zloty'});
                vm.interested_rates.push({rate: resolve.data.rates.RUB, name: 'Rubel'});
                console.log(vm.interested_rates);
            });

        } getTodayExchange();
    }
})();