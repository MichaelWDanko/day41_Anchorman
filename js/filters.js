/* jslint browser: true */
/* jslint esnext: true */
module.exports = (function () {

    /*This shouldn't be app.filter*/
    var filters = angular.module('publisherName', []);

    filters.filter('publisherName', ['NewsService', function (NewsService) {
        var publishers = NewsService.getPublishers();

        return function (id) {
            for (var i = 0; i < publishers.length; i++) {
                if (publishers[i].id === id) {
                    return publishers[i].name;
                }
            }
            return 'Loading...';
        };
    }]);
}());
