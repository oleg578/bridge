ProductModule.service('PushSrv', ['$http', function($http) {
    var push = function() {
        return $http.post("/api/push", {},{cache:false});
    };
    return {
        push: function() {
            return push();
        }
    };
}]);
