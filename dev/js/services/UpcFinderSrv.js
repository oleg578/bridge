Bridge.service('UpcFinderSrv', ['$http', function($http) {
    var GetMfgCodes = function() {
        return $http.get("/api/upc/get/mfgcodes",{cache:false});
    };
    var GetUpc = function(page) {
        return $http.get("/api/upc/get/upc/?page="+page,{cache:false});
    };
    var GetFreeUpc = function() {
        return $http.get("/api/upc/get/freeupc",{cache:false});
    };
    var SaveUPC = function(obj) {
        return $http.post("/api/upc/saveupc",JSON.stringify(obj),{cache:false});
    };
    var SetCriteria = function(obj) {
        return $http.post("/api/upc/setcriteria",JSON.stringify(obj),{cache:false});
    };
    var ResetCriteria = function() {
        return $http.post("/api/upc/resetcriteria",{cache:false});
    };
    return {
        GetMfgCodes: function() {
            return GetMfgCodes();
        },
        GetUpc: function(page) {
            return GetUpc(page);
        },
        GetFreeUpc: function() {
            return GetFreeUpc();
        },
        SaveUPC: function(obj) {
            return SaveUPC(obj);
        },
        SetCriteria: function(obj) {
            return SetCriteria(obj);
        },
        ResetCriteria: function() {
            return ResetCriteria();
        }
    };
}]);
