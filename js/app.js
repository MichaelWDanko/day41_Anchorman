/* jslint browser: true */
/* jslint esnext: true */
var angular = require('angular');
var angularRoute = require('angular-route');
require('./service');
require('./filters');


var app = angular.module('NewsFeedApp', ['ngRoute', 'publisherName', 'NewsService']);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});

/*Create a router*/
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/feed', {
            controller: 'FeedViewController',
            templateUrl: 'sections/feed.html'
        })
        .when('/interests', {
            controller: 'InterestViewController',
            templateUrl: 'sections/interests.html',
        })
        .when('/saved', {
            controller: 'SavedViewController',
            templateUrl: 'sections/saved.html',
        })
        .otherwise({
            redirectTo: '/feed',
        });
}]);

app.controller('FeedViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
    console.log('FeedViewController View');

    /*$scope.articles is the array of the articles*/
    $scope.articles = NewsService.getArticles();

    /*$scope.saveArticle is run when the save button is clicked.*/
    $scope.saveArticle = function (article) {
        console.log('Article save button clicked');
        console.log(article.title);
        NewsService.saveArticle(article);
    };

    //$scope.publisher = NewsService.getPublishers();
}]);

/*Create a controller for the Interests page*/
app.controller('InterestViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
    console.log('InterestViewController View');

    $scope.interests = NewsService.getInterests();
    $scope.saveInterest = function(){
      NewsService.saveInterest(document.getElementById('text-box').value);
    };
}]);

/*Create a controller for the Saved page*/
app.controller('SavedViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
    console.log('SavedViewController View');
    $scope.articles = NewsService.getSavedArticles();

}]);

/*Create a service to store the data*/
//app.factory('NewsService', function ($http) {
//
//    let stories = [];
//    let savedStories = [];
//    let publishers = [];
//    let interests = [];
//
//    /*Any data we need to store can go in here.*/
//    $http({
//            method: 'get',
//            url: 'http://chat.queencityiron.com/api/news/latest',
//        })
//        .then(function (response) {
//            console.log('Response of stories');
//            console.log(response);
//            angular.copy(response.data.stories, stories);
//        });
//    return {
//        getArticles: function () {
//            return stories;
//        },
//        saveArticle: function (article) {
//            /*Write code to push the saved article to an array.*/
//            savedStories.push(article);
//            console.log('article saved.');
//        },
//        getSavedArticles: function () {
//            return savedStories;
//        },
//        /*Not yet calling this function.*/
//        getPublishers: function () {
//            console.log('GetPublishers');
//            return publishers;
//        },
//        saveInterest: function (interest) {
//          console.log('Interest Saved!');
//          interests.push(interest);
//          console.log(interests);
//        },
//        getInterests: function () {
//          return interests;
//        },
//    };
//
//});