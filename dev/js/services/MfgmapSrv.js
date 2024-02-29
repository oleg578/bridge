Admin.service('MfgMapSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/mfgmap/list",{cache:false});
    };
    var deleteRec = function(mfgmap) {
        return $http.post("/api/mfgmap/delete",JSON.stringify(mfgmap),{cache:false});
    };
    var updateRec = function(mfgmap) {
        return $http.post("/api/mfgmap/update",JSON.stringify(mfgmap),{cache:false});
    };
    var createMfgMap = function(mfgmap) {
        return $http.post("/api/mfgmap/create",JSON.stringify(mfgmap),{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        deleteRec: function(mfgmap) {
            return deleteRec(mfgmap);
        },
        updateRec: function(mfgmap) {
            return updateRec(mfgmap);
        },
        createMfgMap: function(mfgmap) {
            return createMfgMap(mfgmap);
        }
    };
}]);