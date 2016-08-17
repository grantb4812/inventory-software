myApp.controller('authController', function($scope, $http, $state) {
        $scope.user = {username:'', password:''};
        $scope.alert = "";
        
        $scope.userinfo = function(user) {
          $http.get('/currentuser', user)
            .success(function(data) {
                $scope.loggeduser = data;
            })
            .error(function() {
               $state.go('login'); 
            });
        };
        $scope.userinfo();
        
        $scope.login = function(user) {
          $http.post('/login', user)
            .success(function(data) {
                $state.go('dashboard');
                console.log(data);
            });
        };
        
        $scope.logout = function(user) {
            $http.get('/logout', user) 
                .success(function(data) {
                   $scope.loggeduser = {};
                   $state.go('login');
                })
                .error(function() {
                   $scope.alert = "Logout Failed"; 
                });
        };
});