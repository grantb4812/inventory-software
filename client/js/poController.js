myApp.controller('poController', function($scope, $http) {
    
    $scope.addPart = function(part) {
        $http.post('/addPart', part) 
            .success(function(data) {
                console.log('Added Part!');
            });
    };
    
    $scope.updatePart = function(part, num) {
        console.log(part.partnumber);
        part.partNumber = num;
      $http.post('/updatePart', part) 
        .success(function(data) {
            console.log(data);
        });
    };
   
    $scope.createPo = function(po) {
        
        $http.post('/createPo', po) 
            .success(function(data) {
                $scope.alert = data.alert;
                $scope.po = {};
                $scope.getPo();
            })
            .error(function() {
                $scope.alert = po.alert;
            
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
    
    $scope.editPo = function(po, poId) {
        po._id = poId;
        $http.put('/editPo', po)
            .success(function(data) {
               $scope.alert = data.alert; 
               $scope.getPo();
            });
    };
    
    $scope.deletePo = function(poid) {
        $http.delete('/deletePo', {
            params: {
                _id: poid
            }
        })
        .success(function(data) {
            $scope.alert = data.alert;
            $scope.getPo();
        });
    };
    
    $scope.receivePo = function(rec, id, num, desc, belongsTo) {
      
        rec.partNumber = num;
        rec.description = desc;
        rec._id = id;
        rec.belongsTo = belongsTo;
        $http.put('/receivePo', rec) 
            .success(function(data) {
                $scope.alert = data.alert;
                $scope.getPo();
            });
    };
    
    $scope.getPart = function(part) {
        $http.get('/getPart', {
            params: part
        })
            .success(function(part) {
                $scope.part = {};
                $scope.materialgroup = part;
            });
    };
    
    $scope.changePart = function(part, partid) {
        console.log(part);
        part._id = partid;
        $http.put('/changePart', part)
            .success(function(data) {
                $scope.alert = data.alert;
                $scope.getPart();
            });
    };
    
    $scope.removePart = function(partid) {
        $http.delete('/removePart', {
            params: {
                _id: partid
            }
        })
        .success(function(data) {
            $scope.alert = data.alert;
            $scope.getPart();
        });
    };
    
    
});