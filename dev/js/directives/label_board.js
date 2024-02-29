Bridge.directive('labelBoard', ['$compile', 'LabelSrv', '$mdDialog',
    function($compile, LabelSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/label-board.html',
            link: function(scope, element, attrs) {
                scope.labels = [];
                scope.newlabel = {
                    name : ""
                };
                scope.NewLblShow = false;
                scope.addProcess = false;
                scope.AddLbl = function () {
                    scope.NewLblShow = true;
                };
                scope.Discard = function () {
                    scope.NewLblShow = false;
                    scope.newlabel = {
                        name : ""
                    };
                };
                scope.SaveLbl = function (newlabel) {
                    scope.addProcess = true;
                    LabelSrv.AddLbl(newlabel).then(function(promise) {
                        res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            scope.addProcess = false;
                            scope.NewLblShow = false;
                            scope.newlabel = {
                                name : ""
                            };
                            LabelSrv.getList().then(function(promise) {
                                data = JSON.parse(promise.data);
                                if (data.items !== undefined && data.items !== null) {
                                    scope.labels = data.items;
                                }
                            });
                            scope.alertSuccess({
                                message: 'New Label created'
                            });
                        } else {
                            scope.alertError({
                                message: 'Got error...'
                            });
                        }
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
                scope.alertSuccess = function(data) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .title('Success')
                        .content(data.message)
                        .ariaLabel('success').ok('Ok'));
                };
                LabelSrv.getList().then(function(promise) {
                    data = JSON.parse(promise.data);
                    if (data.items !== undefined && data.items !== null) {
                        scope.labels = data.items;
                    }
                });
                scope.DelLbl = function(lbl) {
                    var data = {
                        id: lbl.id
                    };
                    LabelSrv.delLbl(data).then(function(promise) {
                        res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            for (var i = 0; i < scope.labels.length; i++) {
                                if (scope.labels[i].id === lbl.id ) {
                                    scope.labels.splice(i,1);
                                }
                            }
                            scope.alertSuccess({
                                message: 'Label deleted'
                            });
                        } else {
                            scope.alertError({
                                message: 'Got error...'
                            });
                        }
                    });
                };
            }
        };
    }
]);
