Admin.directive('pushManageBoard', ['$compile', 'PushManageSrv', '$mdDialog',
    function($compile, PushManageSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/push-manage-board.html',
            link: function(scope, element, attrs) {
                scope.paginator = {};
                scope.products = [];
                scope.criteria = {
                    sku: ''
                };
                PushManageSrv.getProducts(1).then(function(promise) {
                    scope.products = promise.data.items;
                    scope.paginator.currentpage = promise.data.currentpage;
                    scope.paginator.lastpage = promise.data.lastpage;
                    scope.paginator.previouspage = promise.data.previouspage;
                    scope.paginator.nextpage = promise.data.nextpage;
                    if (promise.data.criteria !== null && promise.data.criteria !== undefined) {
                        scope.criteria.sku = promise.data.criteria.sku ? promise.data.criteria.sku : null;
                    }
                    scope.paginator.GetPage = function(pagenum) {
                        PushManageSrv.getProducts(pagenum).then(function(promise) {
                            scope.products = promise.data.items;
                            scope.paginator.currentpage = promise.data.currentpage;
                            scope.paginator.lastpage = promise.data.lastpage;
                            scope.paginator.previouspage = promise.data.previouspage;
                            scope.paginator.nextpage = promise.data.nextpage;
                            if (promise.data.criteria !== null && promise.data.criteria !== undefined) {
                                scope.criteria.sku = promise.data.criteria.sku ? promise.data.criteria.sku : null;
                            }
                        });
                    };
                    scope.$watch("criteria.sku", function(NewVal, OldVal) {
                        if (scope.criteria.sku !== null && scope.criteria.sku !== undefined) {
                            scope.criteria.sku = NewVal.toUpperCase();
                        }
                    });
                    scope.ClearCriteria = function() {
                        scope.criteria.sku = '';
                        PushManageSrv.SetCriteria(scope.criteria).then(function() {
                            scope.paginator.GetPage(1);
                        });
                    };
                    scope.SetCriteria = function() {
                        PushManageSrv.SetCriteria(scope.criteria).then(function() {
                            scope.paginator.GetPage(1);
                        });
                    };
                    scope.SetPush = function() {
                        PushManageSrv.SetPush().then(function() {
                            scope.paginator.GetPage(1);
                        });
                    };
                    scope.UnsetPush = function() {
                        PushManageSrv.UnsetPush().then(function() {
                            scope.paginator.GetPage(1);
                        });
                    };
                });
            }
        };
    }
]);
