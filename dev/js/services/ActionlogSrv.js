Bridge.service('ActionlogSrv', ['$http', function($http) {
    var SkuFilter = function(sku) {
        skuobj = {
            'sku' : sku
        };
        return $http.post("/api/actionlog/skufilter",JSON.stringify(skuobj),{cache:false});
    };
    return {
        SkuFilter: function(sku) {
            return SkuFilter(sku);
        }
    };
}]);
