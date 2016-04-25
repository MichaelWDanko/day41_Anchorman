/* jslint browser: true */
/* jslint esnext: true */
var angular = require('angular');
var angularRoute = require('angular-route');
var app = angular.module('NewsFeedApp', ['ngRoute']);

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
    //        .otherwise({
    //            controller: 'FeedViewController',
    //            templateUrl: '/sections/feed.html'
    //        });

}]);

/*Create a controller for the Home feed page*/
app.controller('FeedViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
    console.log('FeedViewController View');

    $scope.articles = NewsService.getArticles();
}]);


/*Create a controller for the Interests page*/
app.controller('InterestViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
    console.log('InterestViewController View');
}]);


/*Create a controller for the Saved page*/
app.controller('SavedViewController', ['$scope', '$http', 'NewsService', function ($scope, $http, NewsService) {
    console.log('SavedViewController View');


}]);



/*Create a service to store the data*/
app.factory('NewsService', function ($http) {

    let stories = [];

    /*Any data we need to store can go in here.*/
    $http({
            method: 'get',
            url: 'http://chat.queencityiron.com/api/news/latest',
        })
        .then(function (response) {
            console.log(response);
            angular.copy(response.data.stories, stories);
            console.log('start');
            console.log(stories);
        });

    return {
        getArticles: function () {
            return stories;
        }
    }

});
