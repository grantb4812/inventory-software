myApp.controller('orderController', function($scope, $http) {
    
   
    $scope.createOrder = function(order) {
        console.log(order);
        $http.post('/createOrder', order) 
            .success(function(data) {
                $scope.alert = data.alert;
                $scope.order = {};
                $scope.getOrder();
            });
        
    };
    
    $scope.getOrder = function(order) {
        $http.get('/getOrder', {
            params: order
        })
            .success(function(order) {
                console.log(order.tracking);
                $scope.order = {};
                $scope.ordergroup = order;
            });
    };
    
    $scope.availableParts = function() {
        $http.get('/part')
            .success(function(data) {
                $scope.availablePart = data;
              
            });
    };
    
    $scope.editOrder = function(order, orderid) {
        order._id = orderid;
        $http.put('/editOrder', order)
            .success(function(data) {
               $scope.alert = data.alert; 
               $scope.getOrder();
            });
    };
    
    $scope.deleteOrder = function(orderid) {
        $http.delete('/deleteOrder', {
            params: {
                _id: orderid
            }
        })
        .success(function(data) {
            $scope.alert = data.alert;
            $scope.getOrder();
        });
    };
    
});