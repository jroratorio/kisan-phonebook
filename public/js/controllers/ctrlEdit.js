app.controller('ctrlEdit', ['$http', '$scope', '$location', '$routeParams', function ($http, $scope, $location, $routeParams) {
    
    $http.get('/phonebook/posts/' + $routeParams.id).success(function (response) {
        $scope.contact = response;
    });
    
    $scope.saveContact = function(){
       $http.put('/phonebook/posts/'+ $routeParams.id, $scope.contact).success(function (response) {
          $location.path('/contacts');
       }); 
    };
}]);