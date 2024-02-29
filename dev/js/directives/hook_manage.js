Admin.directive('hookBoard', ['$compile', 'HookSrv', '$mdDialog',
    function($compile, HookSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/hook-board.html',
            link: function(scope, element, attrs) {
                scope.hooks = [];
                scope.HideAddHook = false;
                scope.StatusChanged = false;
                scope.newhook = {
                    Name: "",
                    ProcName: "",
                    Type: "procedure",
                    Active: false,
                    Description: "",
                    Nice: 0
                };
                scope.hookTypes = [
                    'procedure',
                    'script',
                ];
                scope.AddHook = function() {
                    scope.NewHookShow = true;
                    scope.HideAddHook = true;
                };
                scope.Discard = function() {
                    scope.NewHookShow = false;
                    scope.HideAddHook = false;
                    scope.newhook = {
                        Name: "",
                        ProcName: "",
                        Type: "procedure",
                        Active: false,
                        Description: ""
                    };
                };
                scope.GetList = function() {
                    HookSrv.getList().then(function(promise) {
                        data = JSON.parse(promise.data, function(k, v) {
                            if (k === 'Nice') {
                                return parseInt(v,10);/*parse Nice to integer*/
                            }
                            return v;
                        });
                        if (data.items !== undefined && data.items !== null) {
                            scope.hooks = data.items;
                        }
                    });
                };
                scope.GetList();
                scope.SaveHook = function(newhook) {
                    HookSrv.CreateHook(newhook).then(function(promise) {
                        var res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            scope.GetList();
                            scope.Discard();
                        } else {
                            scope.alertError({
                                message: res.message
                            });
                        }
                    });
                };
                scope.StoreHook = function(newhook) {
                    HookSrv.StoreHook(newhook).then(function(promise) {
                        var res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            scope.GetList();
                            scope.Discard();
                        } else {
                            scope.alertError({
                                message: res.message
                            });
                        }
                    });
                };
                scope.Delete = function(hook) {
                    HookSrv.Delete(hook).then(function(promise) {
                        var res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            scope.GetList();
                        } else {
                            scope.alertError({
                                message: res.message
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
                scope.ChangeStatus = function(hook) {
                    //scope.StatusChanged = false;
                    HookSrv.ChangeStatus(hook).then(function(promise) {
                        var res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            hook.StatusChanged = true;
                        } else {
                            console.log(hook);
                            if (hook.Active === '0') {
                                hook.Active = '1';
                            } else {
                                hook.Active = '0';
                            }
                            console.log(hook);
                        }
                    });
                };
            }
        };
    }
]);
