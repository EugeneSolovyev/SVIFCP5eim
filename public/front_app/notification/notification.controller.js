(function () {
    'use strict';
    angular
        .module('notificationApp')
        .controller('NotificationController', NotificationController);

    NotificationController.$inject = ['$http', '$scope'];

    function NotificationController($http, $scope) {
        var vm = this;
        vm.createCard = createCard;
        vm.deleteCard = deleteCard;
        vm.editCard = editCard;
        vm.updateCard = updateCard;

        vm.init_notes = [];

        function getCards() {
            $http.get('http://localhost:8000/get_all_notes').then(function (resolve_data) {
                angular.forEach(resolve_data.data, function (item) {
                    item.date = moment.unix(item.date).format('DD MMMM YYYY');
                    vm.init_notes.push(item);
                    vm.init_notes.reverse();
                });
            })
        } getCards();

        function createCard() {
            var note = {
                text: vm.text,
                title: vm.title,
                date: moment().unix()
            };
            if (_.isUndefined(note.text) || _.isUndefined(note.title)) {
                toastr.error('Please, enter your note');
                return false;
            }
            $http.post('http://localhost:8000/notes', note).then(function () {
                note.date = moment.unix(note.date).format('DD MMMM YYYY');
                vm.init_notes.unshift(note);
                toastr.success('Note was successfully added.', 'Congratulate!');
            }, function (reject) {
                console.log(reject);
            });
            vm.text = '';
            vm.title = '';
        }

        function editCard(card) {
            card.editable = true;
        }

        function updateCard(card) {
            card.editable = false;
            card.date = moment(new Date()).unix();
            $http.put('http://localhost:8000/update_note/' + card._id, card);
        }

        function deleteCard(card) {
            $http.delete('http://localhost:8000/delete_note/' + card._id).then(function () {
                var index = vm.init_notes.indexOf(card);
                vm.init_notes.splice(index, 1);
                toastr.info('Note was deleted.');
            });
        }
    }
})();