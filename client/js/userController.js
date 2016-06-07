myApp.controller('userController', function($scope, $http, $state){
    
    $scope.addUser = function(user, userId) {
            user._id = userId;
          $http.post('/createUser', user)
            .success(function(data) {
               $scope.alert = data.alert;
               $scope.user = {};
               $scope.searchUser();
            })
            .error(function() {
                $scope.alert = 'Registration Failed';
            });
          
        };
        
        
    $scope.searchUser = function(search) {
        
        $http.get('/searchUser',  {
            params: search
        })
            .success(function(data) {
                $scope.search = {};
                $scope.usergroup = data;
            });
    };

    
    
    $scope.editUser = function(edit) {
        console.log(edit);
        $http.get('/searchUser', {
            params: edit
        })
            .success(function(data) { 
                $scope.edit = {};
                $scope.editgroup = data;
                $scope.searchUser();
            });
    };
    
    $scope.saveEdit = function(save, userid) {
        save._id = userid;
        $http.put('/editUser', save)
            .success(function(data) {
                $scope.alert = data.alert;
                $scope.searchUser();
            });
    };
   
    $scope.deleteUser = function(userid) {
        console.log(userid);
        
        $http.delete('/deleteUser', {
            params: {
                        _id: userid
                    }
        })
            .success(function(data) {
               $scope.alert = data.alert; 
               $scope.searchUser();
            });
    };
    
}); 