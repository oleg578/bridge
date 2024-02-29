Bridge.service('LabelSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/label/list",{cache:false});
    };
    var delLbl = function(lbl) {
        return $http.post("/api/label/delete",JSON.stringify(lbl),{cache:false});
    };
    var AddLbl = function(obj) {
        return $http.post("/api/label/add",JSON.stringify(obj),{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        delLbl: function(lbl) {
            return delLbl(lbl);
        },
        AddLbl: function(obj) {
            return AddLbl(obj);
        }
    };
}]);
