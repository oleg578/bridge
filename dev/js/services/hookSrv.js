Admin.service('HookSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/hook/list",{cache:false});
    };
    var getActiveList = function() {
        return $http.get("/api/hook/list/active",{cache:false});
    };
    var CreateHook = function(hook) {
        return $http.post("/api/hook/create",JSON.stringify(hook),{cache:false});
    };
    var StoreHook = function(hook) {
        return $http.post("/api/hook/store",JSON.stringify(hook),{cache:false});
    };
    var ChangeStatus = function(hook) {
        return $http.post("/api/hook/changestatus",JSON.stringify(hook),{cache:false});
    };
    var Delete = function(hook) {
        return $http.post("/api/hook/delete",JSON.stringify(hook),{cache:false});
    };
    var Apply = function() {
        return $http.post("/api/hook/apply",{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        getActiveList: function() {
            return getActiveList();
        },
        CreateHook: function(hook) {
            return CreateHook(hook);
        },
        StoreHook: function(hook) {
            return StoreHook(hook);
        },
        ChangeStatus: function(hook) {
            return ChangeStatus(hook);
        },
        Delete: function(hook) {
            return Delete(hook);
        },
        Apply: function() {
            return Apply();
        }
    };
}]);
