/* jslint browser: true */
/* jslint esnext: true */
module.exports = (function () {

    var service = angular.module('NewsService', []);

    service.factory('NewsService', function ($http) {

        let stories = [];
        let savedStories = [];
        let publishers = [];
        let interests = [];

        /*Any data we need to store can go in here.*/
        $http({
            method: 'get',
            url: 'http://chat.queencityiron.com/api/news/latest',
        })
        .then(function (response) {
            console.log('Response of stories');
            console.log(response);
            angular.copy(response.data.stories, stories);
        });

        if (publishers.length === 0) {
        $http({
                method: 'get',
                url: 'http://chat.queencityiron.com/api/publishers'
            })
            .then(function (response) {
                console.log('response');
                console.log(response);
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
          interests.push(interest);
        },
        getInterests: function () {
          return interests;
        },
        removeInterest: function (value) {
          console.log(interests.indexOf(value));
          interests.splice(value, 1);
        },
      };
    });
}());
