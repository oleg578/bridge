Admin.directive('mfgmapBoard', ['$compile', 'MfgMapSrv',
    function($compile, MfgMapSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/mfgmap-board.html',
            link: function(scope, element, attrs) {
                scope.mfgmaps = [];
                scope.newmfgmap = {
                    oldmfg: "",
                    newmfg: ""
                };
                scope.NewMfgMapShow = false;
                scope.HideAddMfgMap = false;
                scope.AddMfgMap = function() {
                    scope.newcenter = {
                        oldmfg: "",
                        newmfg: ""
                    };
                    scope.NewMfgMapShow = true;
                    scope.HideAddMfgMap = true;
                };
                scope.Discard = function() {
                    scope.NewMfgMapShow = false;
                    scope.HideAddMfgMap = false;
                    scope.newmfgmap = {
                        oldmfg: "",
                        newmfg: ""
                    };
                };
                scope.GetList = function() {
                    MfgMapSrv.getList().then(function(promise) {
                        scope.mfgmaps = JSON.parse(promise.data);
                    });
                };
                scope.GetList();
                scope.deleteRec = function(a) {
                    MfgMapSrv.deleteRec(a).then(function () {
                        scope.GetList();
                    });
                };
                scope.updateRec = function(r) {
                    MfgMapSrv.updateRec(r).then(function () {
                        scope.GetList();
                    });
                };
                scope.createMfgMap = function(m) {
                    MfgMapSrv.createMfgMap(m).then(function () {
                        scope.GetList();
                        scope.Discard();
                    });
                };
            }
        };
    }
]);
