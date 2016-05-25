/* jslint browser: true */
/* jslint esnext: true */
var moment = require('moment');
module.exports = (function () {

    var service = angular.module('NewsService', []);

    service.factory('NewsService', function ($http) {

        var stories = [];
        var savedStories = [];
        var publishers = [];
        var interests = [];

        /*Any data we need to store can go in here.*/
        $http({
                method: 'get',
                url: 'http://chat.queencityiron.com/api/news/latest',
            })
            .then(function (response) {
                console.log(response.data.stories.length);
                for (var i = 0; i < response.data.stories.length; i++) {
                    response.data.stories[i].allcaps = response.data.stories[i].title.toLowerCase();
                }
                return response.data.stories;
            })
            .then(function (response) {
                for (var i = 0; i < response.length; i++) {
                    response[i].time = moment(response[i].published).fromNow();
                }
                return response;
            })
            .then(function (response) {
                angular.copy(response, stories);
                return response;
            });

        if (publishers.length === 0) {
            $http({
                    method: 'get',
                    url: 'http://chat.queencityiron.com/api/publishers'
                })
                .then(function (response) {
                    angular.copy(response.data.providers, publishers);
                });
        }

        return {
            getArticles: function () {
                return stories;
            },
            saveArticle: function (article) {
                /*Write code to push the saved article to an array.*/
                savedStories.push(article);
            },
            getSavedArticles: function () {
                return savedStories;
            },
            /*Not yet calling this function.*/
            getPublishers: function () {
                return publishers;
            },
            saveInterest: function (interest) {
                if (interests.indexOf(interest) === -1) {
                    interests.push(interest);

                }
            },
            getInterests: function () {
                return interests;
            },
            removeInterest: function (value) {
                interests.splice(interests.indexOf(value), 1);
            },
            showInterest: function (list, interests) {

                for (var i = 0; i < list.length; i++) {
                    for (var x = 0; x < interests.length; x++) {
                        if (list[i].title.indexOf(interests[x]) !== -1) {
                            angular.element('list[i].id').removeClass('hidden');
                        }
                    }
                }
            },
        };
    });
}());
