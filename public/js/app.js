var app = angular.module('PhoneBookApp',['ngRoute']).run(function($rootScope) {
    $rootScope.accessors = {
        getId: function(row) {
            return row._id;
        }
    };
});

app.config(function($routeProvider) {
    $routeProvider
        .when('/contacts',
            {
                controller: 'ctrlContacts',
                templateUrl: 'view/contacts.html'
            })
        .when('/delete-contact/:id',
            {
                controller: 'ctrlDelete',
		templateUrl: 'view/delete-contact.html'
            })
	.when('/view-contact/:id',
            {
		controller: 'ctrlView',
		templateUrl: 'view/view-contact.html'
            })
	.when('/add-contact',
            {
		controller: 'ctrlAdd',
		templateUrl: 'view/add-contact.html'
            })
	.when('/edit-contact/:id',
            {
            	controller: 'ctrlEdit',
		templateUrl: 'view/edit-contact.html'
            })
	.when('/send-message/:id',
            {
                controller: 'ctrlSendMsg',
                templateUrl: 'view/send-message.html'
            })
        .otherwise({ redirectTo: '/contacts' });
});
