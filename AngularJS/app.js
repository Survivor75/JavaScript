//app.js
var myModule = angular.module('Angello', []);

myModule.factory('AngelloHelper', function() { });
myModule.service('AngelloModel', function() { });
myModule.controller('MainCtrl', function() { });
myModule.directive('story', function() { });

myModule.controller(’MainCtrl’, function() {
    var main = this;

    main.stories = [
        {
            title: 'First story',
            description: 'Our first story.',
            criteria: 'Criteria pending.',
            status: 'To Do',
            type: 'Feature',
            reporter: 'Lukas Ruebbelke',
            assignee: 'Brian Ford'
        },
        {
            title: 'Second story',
            description: 'Do something.',
            criteria: 'Criteria pending.',
            status: 'Back Log',
            type: 'Feature',
            reporter: 'Lukas Ruebbelke',
            assignee: 'Brian Ford'
        },
        {
            title: 'Another story',
            description: 'Just one more.',
            criteria: 'Criteria pending.',
            status: 'Code Review',
            type: 'Enhancement',
            reporter: 'Lukas Ruebbelke',
            assignee: 'Brian Ford'
        }
    ];

    main.createStory = function() {
        main.stories.push({
            title:'New Story',
            description:'Description pending.',
            criteria:'Criteria pending.',
            status:'Back Log',
            type:'Feature',
            reporter:'Pending',
            assignee:'Pending'
        });
    };

});