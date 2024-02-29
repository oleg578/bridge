Admin.directive('dccenterBoard', ['$compile', 'DcCenterSrv', '$mdDialog',
    function($compile, DcCenterSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/dccenter-board.html',
            link: function(scope, element, attrs) {
                scope.centers = [];
                scope.newcenter = {
                    DCCenter: "",
                    LocationId: 0
                };
                scope.fault= false;
                scope.dctype = [
                    {dctype:"ghost"},
                    {dctype:"real"},
                    {dctype:"virtual"},
                    {dctype:"default"},
                ];
                scope.NewCenterShow = false;
                scope.HideAddCenter = false;
                scope.AddCenter = function() {
                    scope.newcenter = {
                        DCCenter: "",
                        LocationId: 0
                    };
                    DcCenterSrv.getMaxLoc().then(function(promise) {
                        data = JSON.parse(promise.data);
                        if (data!==null && data!==undefined) {
                            if (data.maxloc!==null && data.maxloc!==undefined) {
                                scope.newcenter.LocationId = data.maxloc+1;
                            }
                        }
                    });
                    scope.NewCenterShow = true;
                    scope.HideAddCenter = true;
                };
                scope.Discard = function() {
                    scope.NewCenterShow = false;
                    scope.HideAddCenter = false;
                    scope.newcenter = {
                        DCCenter: "",
                        LocationId: 0
                    };
                };
                scope.GetList = function() {
                    DcCenterSrv.getList().then(function(promise) {
                        data = JSON.parse(promise.data, function(k, v) {
                            if (k === 'LocationId') {
                                return parseInt(v, 10); /*parse LocationId to integer*/
                            }
                            return v;
                        });
                        scope.centers = data;
                    });
                };
                scope.GetList();
                scope.deleteCenter = function(center) {
                    DcCenterSrv.deleteCenter(center).then(function (promise) {
                        scope.GetList();
                    });
                };
                scope.updateCenter = function(center) {
                    DcCenterSrv.updateCenter(center).then(function (promise) {
                        if (promise.data.result == "fault") {
                            scope.fault= true;
                        }
                        scope.GetList();
                    });
                };
                scope.createCenter = function(center) {
                    DcCenterSrv.createCenter(center).then(function (promise) {
                        scope.GetList();
                        scope.Discard();
                    });
                };
                scope.alertError = function(data) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Alert !')
                        .textContent(data.message)
                        .ariaLabel('Alert')
                        .ok('Ok')
                    );
                };
            }
        };
    }
]);
