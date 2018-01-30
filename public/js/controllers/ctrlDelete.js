
app.controller('ctrlDelete', ['$http', '$scope', '$location', '$routeParams', function ($http, $scope, $location, $routeParams) {
    $scope.deleteContact = function (){
        $http.delete('/phonebook/posts/' + $routeParams.id).success(function (params) {
            $location.path('/contacts');
        }); 
    };
    $scope.back = function() {
         $location.path('/view-contact/' + $routeParams.id);
     };   
}]);