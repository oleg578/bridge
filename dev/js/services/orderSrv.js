Bridge.service('OrderSrv', ['$http', function($http) {
    var getList = function(pagenum) {
        if (pagenum === null || pagenum === undefined) {
            pagenum = 1;
        }
        return $http.get("/api/order/list/?page=" + pagenum,{cache:false});
    };
    var setCriteria = function(criteria) {
        return $http.post("/api/order/setcriteria", JSON.stringify(criteria),{cache:false});
    };
    var resetCriteria = function() {
        return $http.post("/api/order/resetcriteria", null,{cache:false});
    };
    var getSingle = function(orderid) {
        return $http.get("/api/order/get/?orderId="+orderid,{cache:false});
    };
    return {
        getList: function(pn) {
            return getList(pn);
        },
        setCriteria: function(criteria) {
            return setCriteria(criteria);
        },
        resetCriteria: function() {
            return resetCriteria();
        },
        getSingle: function(orderId) {
            return getSingle(orderId);
        }
    };
}]);
