Bridge.service('PushSetSrv', ['$http', function($http) {
    var getProducts = function() {
        return $http.get("/api/pushsrv/get/products",{cache:false});
    };
    var getAttributes = function() {
        return $http.get("/api/pushsrv/get/attributes",{cache:false});
    };
    var Save = function(setobj) {
        return $http.post("/api/pushsrv/save",JSON.stringify(setobj),{cache:false});
    };
    return {
        getProducts: function() {
            return getProducts();
        },
        getAttributes: function() {
            return getAttributes();
        },
        Save: function(setobj) {
            return Save(setobj);
        }
    };
}]);
