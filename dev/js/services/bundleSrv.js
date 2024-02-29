Bridge.service('BundleSrv', ['$http', function($http) {
    var getList = function(pagenum) {
        if (pagenum === null || pagenum === undefined) {
            pagenum = 1;
        }
        return $http.get("/api/bundle/list/?page=" + pagenum,{cache:false});
    };
    return {
        getList: function(pn) {
            return getList(pn);
        },
    };
}]);
