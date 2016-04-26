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
    $scope.removeInterest = function(interest){
      console.log(interest);
      NewsService.removeInterest(interest);
    };
}]);

/*Create a controller for the Saved page*/
app.controller('SavedViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
    console.log('SavedViewController View');
    $scope.articles = NewsService.getSavedArticles();
}]);
