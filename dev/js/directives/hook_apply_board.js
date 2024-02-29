Admin.directive('hookApplyBoard', ['$compile', 'HookSrv', '$mdDialog',
    function($compile, HookSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/hook-apply-board.html',
            link: function(scope, element, attrs) {
                scope.hooks = [];
                scope.GetList = function() {
                    HookSrv.getActiveList().then(function(promise) {
                        data = JSON.parse(promise.data);
                        if (data.items !== undefined && data.items !== null) {
                            scope.hooks = data.items;
                        }
                    });
                };
                scope.GetList();
            }
        };
    }
]);
