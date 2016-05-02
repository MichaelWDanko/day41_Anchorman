/* jslint browser: true */
/* jslint esnext: true */
var angular = require('angular');
var angularRoute = require('angular-route');
require('./service');
require('./filters');

var app = angular.module('NewsFeedApp', ['ngRoute', 'publisherName', 'NewsService']);

// Makes the newest story populate first
app.filter('reverse', function () {
    return function (items) {
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

/*This is the controller for the initial News Feed.*/
app.controller('FeedViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {

    /*This is the $scope that works with the ng-class of the newsfeed 
    to display whether or not an article should be marked*/
    $scope.isInteresting = function (article) {
        for (var i = 0; i < NewsService.getInterests().length; i++) {
            if (article.allcaps.indexOf(NewsService.getInterests()[i]) !== -1) {
                return true;
            }
        }
        return false;
    };

    /*$scope.articles is the array of the articles*/
    $scope.articles = NewsService.getArticles();

    /*$scope.saveArticle is run when the save button is clicked.*/
    $scope.saveArticle = function (article) {
        NewsService.saveArticle(article);
    };
}]);

/*This is the controller for the initial page to add Interests.*/
app.controller('InterestViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
    $scope.interests = NewsService.getInterests();
    $scope.saveInterest = function () {
        NewsService.saveInterest(document.getElementById('text-box').value.toLowerCase());
    };
    $scope.removeInterest = function (interest) {
        NewsService.removeInterest(interest);
    };
}]);

/*This is a page for the list of saved articles.*/
app.controller('SavedViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
    $scope.articles = NewsService.getSavedArticles();
}]);
