app.controller('ctrlView', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
    $http.get('/phonebook/posts/' + $routeParams.id).success(function (response) {
        $scope.contact = response;
    });
}]);