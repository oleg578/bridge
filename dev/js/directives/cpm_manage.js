Admin.directive('cpmBoard', ['$compile', 'CpmSrv',
    function($compile, CpmSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/cpm-board.html',
            link: function(scope) {
                scope.cpms = [];
                scope.newmap = {
                    Brand: "",
                    maprule: 0.00
                };
                scope.NewMapShow = false;
                scope.HideAddMap = false;
                scope.AddCpmMap = function() {
                    scope.newmap = {
                        Brand: "",
                        maprule: 0.00
                    };
                    scope.NewMapShow = true;
                    scope.HideAddMap = true;
                };
                scope.Discard = function() {
                    scope.NewMapShow = false;
                    scope.HideAddMap = false;
                    scope.newmap = {
                        Brand: "",
                        maprule: 0.00
                    };
                };
                scope.GetList = function() {
                    CpmSrv.getList().then(function(promise) {
                        scope.cpms = JSON.parse(promise.data);
                        console.log(scope.cpms)
                    });
                };
                scope.GetList();
                scope.deleteRec = function(a) {
                    CpmSrv.deleteRec(a).then(function () {
                        scope.GetList();
                    });
                };
                scope.updateRec = function(r) {
                    CpmSrv.updateRec(r).then(function () {
                        scope.GetList();
                    });
                };
                scope.createMap = function(m) {
                    CpmSrv.createMap(m).then(function () {
                        scope.GetList();
                        scope.Discard();
                    });
                };
            }
        };
    }
]);
