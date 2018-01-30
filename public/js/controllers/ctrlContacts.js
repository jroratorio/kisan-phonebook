app.controller('ctrlContacts', ['$http', '$scope', function ($http, $scope) {
    $http.get('/phonebook/posts').success(function (response) {
        $scope.contacts = response;
        $scope.contact = "";
    });
}]);