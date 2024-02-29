Admin.service('DeliverytimeSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/deliverytime/list",{cache:false});
    };
    var createDt = function(dt) {
        return $http.post("/api/deliverytime/create",JSON.stringify(dt),{cache:false});
    };
    var updateDt = function(dt) {
        return $http.post("/api/deliverytime/update",JSON.stringify(dt),{cache:false});
    };
    var deleteDt = function(dt) {
        return $http.post("/api/deliverytime/delete",JSON.stringify(dt),{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        createDt: function(dt) {
            return createDt(dt);
        },
        updateDt: function(dt) {
            return updateDt(dt);
        },
        deleteDt: function(dt) {
            return deleteDt(dt);
        }
    }
}]);
