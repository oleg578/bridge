Admin.service('NscpMapSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/nscpmap/list",{cache:false});
    };
    var deleteRec = function(m) {
        return $http.post("/api/nscpmap/delete",JSON.stringify(m),{cache:false});
    };
    var updateRec = function(m) {
        return $http.post("/api/nscpmap/update",JSON.stringify(m),{cache:false});
    };
    var createMap = function(m) {
        return $http.post("/api/nscpmap/create",JSON.stringify(m),{cache:false});
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