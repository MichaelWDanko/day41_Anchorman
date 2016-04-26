module.exports = (function () {
    
//        var filters = angular.module('publisherName', []);
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
    return {
        getArticles: function () {
            return stories;
        },
        saveArticle: function (article) {
            /*Write code to push the saved article to an array.*/
            savedStories.push(article);
            console.log('article saved.');
        },
        getSavedArticles: function () {
            return savedStories;
        },
        /*Not yet calling this function.*/
        getPublishers: function () {
            console.log('GetPublishers');
            return publishers;
        },
        saveInterest: function (interest) {
          console.log('Interest Saved!');
          interests.push(interest);
          console.log(interests);
        },
        getInterests: function () {
          return interests;
        },
    };
    });
}());
