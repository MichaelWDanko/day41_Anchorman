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

app.controller('FeedViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {

    /*$scope.articles is the array of the articles*/
    $scope.articles = NewsService.getArticles();
    //$scope.articles = NewsService.getArticles().then(function (response) NewsService.showInterest(response) );

    /*$scope.saveArticle is run when the save button is clicked.*/
    $scope.saveArticle = function (article) {
        NewsService.saveArticle(article);
    };
    $scope.time = function(){

    };

    /* I'm passing in a function 'NewsService.getArticles()
    so we can use the 'NewsService.showInterest()'
    in the InterestViewController */
    $scope.interests = NewsService.getInterests();
    NewsService.showInterest($scope.articles, $scope.interests);

}]);

/*Create a controller for the Interests page*/
app.controller('InterestViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
    $scope.interests = NewsService.getInterests();
    $scope.saveInterest = function () {
        NewsService.saveInterest(document.getElementById('text-box').value);
    };
    $scope.removeInterest = function (interest) {
        NewsService.removeInterest(interest);
    };
}]);

/*Create a controller for the Saved page*/
app.controller('SavedViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
    $scope.articles = NewsService.getSavedArticles();
}]);
