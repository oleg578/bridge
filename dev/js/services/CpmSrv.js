Admin.service('CpmSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/cpm/list",{cache:false});
    };
    var deleteRec = function(m) {
        return $http.post("/api/cpm/delete",JSON.stringify(m),{cache:false});
    };
    var updateRec = function(m) {
        return $http.post("/api/cpm/update",JSON.stringify(m),{cache:false});
    };
    var createMap = function(m) {
        return $http.post("/api/cpm/create",JSON.stringify(m),{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        deleteRec: function(m) {
            return deleteRec(m);
        },
        updateRec: function(m) {
            return updateRec(m);
        },
        createMap: function(m) {
            return createMap(m);
        }
    };
}]);