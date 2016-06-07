myApp.controller('reportsController', function($scope, $http) {
   console.log('working'); 
   
   $scope.cyclecount = function() {
        $http.get('/cyclecount')
            .success(function(part) {
               $scope.part  = part;
               console.log(part);
            });
   };
   
   $scope.getPo = function(po) {
        if (po) {
            var data = {poNumber: po.poNumber};
        } 
        $http.get('/getPo', {
            params: data
        })
            .success(function(po) {
                $scope.po = {};
                $scope.pogroup = po;
                console.log(po);
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
    
    
});