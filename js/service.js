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
                    console.log('Publisher response');
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
                interests.splice(interests.indexOf(value), 1);
            },
            showInterest: function (list, interests) {
                //                console.log('show interest is running');
                //                console.log("Display the list below");
                //                console.log(list);
                //                console.log('Display the interests below');
                //                console.log(interests);
                //                
                console.log('length:');
                console.log(list.length);
                console.log(interests.length);

                for (var i = 0; i < list.length; i++) {
                    for (var x = 0; x < interests.length; x++) {
                        //                       console.log('We made it');
                        if (list[i].title.indexOf(interests[x]) !== -1) {
//                            var multibutton = angular.element(element.getElementsByClassName(".multi-files"));
//                            var id = angular.element(element.getElementById("#hidden"));
                            console.log('Found one!');
                            console.log(list[i]);
                            console.log(list[i].id);
//                            console.log(angular.element('#list[i].id'));
                            angular.element('list[i].id').removeClass('hidden');
                        }
                    }
                }
            },
        };
    });
}());
