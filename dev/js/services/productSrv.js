Bridge.service('ProductSrv', ['$http', function($http) {
    var getProducts = function(pagenum) {
        if (pagenum === null || pagenum === undefined) {
            pagenum = 1;
        }
        return $http.get("/api/product/get/page/?page=" + pagenum,{cache:false});
    };
    var getProductSingle = function(id) {
        if (id === null || id === undefined) {
            id = false;
        }
        if (id !== false) {
            return $http.get("/api/product/get/single/?id=" + id,{cache:false});
        }
        return false;
    };
    var getProductSingleSku = function(sku) {
        if (sku === null || sku === undefined) {
            sku = false;
        }
        if (sku !== false) {
            return $http.get("/api/product/get/single/?sku=" + sku,{cache:false});
        }
        return false;
    };
    var getNewSingle = function(obj) {
        return $http.post("/api/product/create/", JSON.stringify(obj),{cache:false});
    };
    var setCriteria = function(criteria) {
        return $http.post("/api/product/setcriteria",JSON.stringify(criteria),{cache:false});
    };
    var Update = function(productobj) {
        return $http.post("/api/product/update",JSON.stringify(productobj),{cache:false});
    };
    var MarkDelete = function(productId) {
        prdobj = {
            id : productId
        };
        return $http.post("/api/product/markdelete",JSON.stringify(prdobj),{cache:false});
    };
    return {
        getProducts: function(par) {
            return getProducts(par);
        },
        getProductSingle: function(id) {
            return getProductSingle(id);
        },
        getProductSingleSku: function(sku) {
            return getProductSingleSku(sku);
        },
        getNewSingle : function (obj) {
            return getNewSingle(obj);
        },
        setCriteria: function(criteria) {
            return setCriteria(criteria);
        },
        Update: function(productobj) {
            return Update(productobj);
        },
        MarkDelete: function(prdid) {
            return MarkDelete(prdid);
        }
    };
}]);
