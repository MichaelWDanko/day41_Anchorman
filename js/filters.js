/* jslint browser: true */
/* jslint esnext: true */
module.exports = (function () {

    /*This shouldn't be app.filter*/
    var filters = angular.module('publisherName', []);

    filters.filter('publisherName', function ($http) {
        let publishers = [];
        if (publishers.length === 0) {
            $http({
                    method: 'get',
                    url: 'http://chat.queencityiron.com/api/publishers',
                })
                .then(function (response) {
                    publishers = response.data.providers;
                });
            return "Pending";
        } else {
            return function (id) {
                for (var i = 0; i < publishers.length; i++) {
                    if (id === publishers[i].id) {
                        return publishers[i].name;
                    }
                }
            };
        }
    });
}());
