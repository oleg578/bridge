AdminActivityModule.service('ActivitySrv', ['$http', function($http) {
    var getActivity = function(pagenum) {
        if (pagenum === null || pagenum === undefined) {
            pagenum = 1;
        }
        return $http.get("/api/admin/activity/get/page/" + pagenum,{cache:false});
    };
    var setCriteria = function(criteria) {
        return $http.post("/api/admin/activity/setcriteria", JSON.stringify(criteria),{cache:false});
    };
    return {
        getActivity: function(par) {
            return getActivity(par);
        },
        setCriteria: function(par) {
            return setCriteria(par);
        }
    };
}]);
