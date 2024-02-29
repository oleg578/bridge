Admin.service('MappingSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/mapping/list",{cache:false});
    };
    var Save = function(item) {
        return $http.post("/api/mapping/save",JSON.stringify(item),{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        Save: function(item) {
            return Save(item);
        }
    };
}]);

