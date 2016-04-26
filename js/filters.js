/* jslint browser: true */
/* jslint esnext: true */
module.exports = (function () {

    /*This shouldn't be app.filter*/
    var filters = angular.module('publisherName', []);

    filters.filter('publisherName', ['NewsService', function (NewsService) {
        let publishers = NewsService.getPublishers();
        
        return function (id) {
            for (let i = 0; i < publishers.length; i++) {
                if (publishers[i].id === id) {
                    return publishers[i].name;
                }
            }
            return 'loading...';
        };
    }]);

}());
