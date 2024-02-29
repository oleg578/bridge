Admin.directive('nscpmapBoard', ['$compile', 'NscpMapSrv',
    function($compile, NscpMapSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/nscpmap-board.html',
            link: function(scope, element, attrs) {
                scope.nscpmaps = [];
                scope.newmap = {
                    Sku: "",
                    Price: 0.00
                };
                scope.NewMapShow = false;
                scope.HideAddMap = false;
                scope.AddNscpMap = function() {
                    scope.nemap = {
                        Sku: "",
                        Price: 0.00
                    };
                    scope.NewMapShow = true;
                    scope.HideAddMap = true;
                };
                scope.Discard = function() {
                    scope.NewMapShow = false;
                    scope.HideAddMap = false;
                    scope.newmap = {
                        Sku: "",
                        Price: 0.00
                    };
                };
                scope.GetList = function() {
                    NscpMapSrv.getList().then(function(promise) {
                        scope.nscpmaps = JSON.parse(promise.data);
                    });
                };
                scope.GetList();
                scope.deleteRec = function(a) {
                    NscpMapSrv.deleteRec(a).then(function () {
                        scope.GetList();
                    });
                };
                scope.updateRec = function(r) {
                    NscpMapSrv.updateRec(r).then(function () {
                        scope.GetList();
                    });
                };
                scope.createMap = function(m) {
                    NscpMapSrv.createMap(m).then(function () {
                        scope.GetList();
                        scope.Discard();
                    });
                };
            }
        };
    }
]);
