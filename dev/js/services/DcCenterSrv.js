Admin.service('DcCenterSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/dccenter/list",{cache:false});
    };
    var deleteCenter = function(center) {
        return $http.post("/api/dccenter/delete",JSON.stringify(center),{cache:false});
    };
    var updateCenter = function(center) {
        return $http.post("/api/dccenter/update",JSON.stringify(center),{cache:false});
    };
    var createCenter = function(center) {
        return $http.post("/api/dccenter/create",JSON.stringify(center),{cache:false});
    };
    var getMaxLoc = function(center) {
        return $http.get("/api/dccenter/getmaxloc",{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        deleteCenter: function(center) {
            return deleteCenter(center);
        },
        updateCenter: function(center) {
            return updateCenter(center);
        },
        createCenter: function(center) {
            return createCenter(center);
        },
        getMaxLoc: function() {
            return getMaxLoc();
        }
    };
}]);
