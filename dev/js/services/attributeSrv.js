Bridge.service('AttributeSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/attribute/list",{cache:false});
    };
    var delAttr = function(name) {
        return $http.post("/api/attribute/delete",JSON.stringify(name),{cache:false});
    };
    var GcAttr = function() {
        return $http.post("/api/attribute/gc",JSON.stringify([]),{cache:false});
    };
    var AddAttr = function(obj) {
        return $http.post("/api/attribute/add",JSON.stringify(obj),{cache:false});
    };
    var setSpecAttr = function() {
        return $http.post("/api/attribute/setattr",null,{cache:false});
    };
    var setBlockAttr = function(attr) {
        return $http.post("/api/attribute/setblockattr",attr,{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        delAttr: function(name) {
            return delAttr(name);
        },
        GcAttr: function() {
            return GcAttr();
        },
        AddAttr: function(obj) {
            return AddAttr(obj);
        },
        setSpecAttr: function() {
            return setSpecAttr();
        },
        setBlockAttr: function(attr) {
            return setBlockAttr(attr);
        }
    };
}]);
