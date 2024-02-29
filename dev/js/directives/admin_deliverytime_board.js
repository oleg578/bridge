Admin.directive('deliverytimeBoard', ['$compile', 'DeliverytimeSrv', '$mdDialog',
    function ($compile, DeliverytimeSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/deliverytime_board.html',
            link: function (scope) {
                scope.dts = [];
                scope.newdt = {
                    mfgcode: "",
                    stockinstock: 0,
                    stockoutofstock: 0,
                    otherinstock: 0,
                    otheroutofstock: 0,
                    MinQty: 0
                };
                scope.AddMfgCodeShow = false;
                scope.GetList = function () {
                    DeliverytimeSrv.getList().then(function (promise) {
                        scope.dts = JSON.parse(promise.data);
                    });
                };
                scope.AddMfgCode = function () {
                    scope.AddMfgCodeShow = !scope.AddMfgCodeShow
                };
                scope.GetList();
                scope.Discard = function () {
                    scope.AddMfgCodeShow = !scope.AddMfgCodeShow;
                    scope.newdt = {
                        mfgcode: "",
                        stockinstock: 0,
                        stockoutofstock: 0,
                        otherinstock: 0,
                        otheroutofstock: 0,
                        MinQty: 0
                    };
                };
                scope.CreateDt = function (dtobj) {
                    DeliverytimeSrv.createDt(dtobj).then(function () {
                        scope.GetList();
                        scope.Discard();
                    });
                };
                scope.updateDt = function (dt) {
                    DeliverytimeSrv.updateDt(dt).then(function () {
                        scope.GetList();
                    });
                };
                scope.deleteDt = function (dt) {
                    DeliverytimeSrv.deleteDt(dt).then(function () {
                        scope.GetList();
                    });
                };
            }
        };
    }
]);