Admin.service('PushManageSrv', ['$http', function($http) {
    var getProducts = function(page) {
        return $http.get("/api/product/manage/get/page/?page="+page,{cache:false});
    };
    var SetCriteria = function(criteria) {
        return $http.post("/api/product/manage/setcriteria",JSON.stringify(criteria),{cache:false});
    };
    var SetPush = function() {
        return $http.post("/api/product/manage/setpush",{cache:false});
    };
    var UnsetPush = function() {
        return $http.post("/api/product/manage/unsetpush",{cache:false});
    };
    return {
        getProducts: function(page) {
            return getProducts(page);
        },
        SetCriteria: function(criteria) {
            return SetCriteria(criteria);
        },
        SetPush: function() {
            return SetPush();
        },
        UnsetPush: function() {
            return UnsetPush();
        }
    };
}]);
