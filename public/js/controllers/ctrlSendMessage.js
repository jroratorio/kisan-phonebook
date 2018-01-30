app.controller('ctrlSendMsg', ['$http', '$scope', '$routeParams', function ($http, $scope, $routeParams) {
    
    $http.get('/phonebook/posts/' + $routeParams.id).success(function (response) {
        $scope.contact = response;
    });
    
    $scope.msgbody = '';
    
    $scope.flashtext = '';
    $scope.success = false;
    $scope.loading = false;
    
    $scope.generateOTP = function(){
        var num = Math.floor(Math.random() * 90000) + 10000;
        $scope.msgbody = 'Your OTP is ' + num;
    };
    
    $scope.submit = function(){
        $scope.loading = true;
        $http.post('/phonebook/sendmessage', { id: $routeParams.id, dest: $scope.contact.number, body: $scope.msgbody }).success(function(data, status){
            $scope.flashtext = 'Message has been sent to ' + $scope.contact.number;
            $scope.success = true;
            $scope.loading = false;
            $scope.msgbody = '';
        }).error(function(data, status){
            $scope.flashtext = 'Message could not be sent to ' + $scope.contact.number;
            $scope.success = false;
            $scope.loading = false;
            $scope.msgbody = '';                      
        });
    };
}]);