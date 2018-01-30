app.controller('ctrlAdd', ['$http', '$scope', '$location', function ($http, $scope, $location){
     
    $scope.add = function (){
        var dataWithoutId = {
            name: $scope.contact.name,
            email: $scope.contact.email,
            number: $scope.contact.number
        };
        $http.post('/phonebook/posts', dataWithoutId).success(function (params) {
            $location.path('/contacts');
        });
    };
}]);