Bridge.directive('bundleReviewPanel', ['$compile', '$location', 'BundleSrv',
    function($compile, $location, BundleSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/bundle-panel.html',
            link: function(scope, element, attrs) {
                scope.bundles = [];
                scope.paginator = {};
                BundleSrv.getList().then(function(promise) {
                    data = JSON.parse(promise.data);
                    if (data.items !== undefined && data.items !== null) {
                        scope.bundles = data.items.items;
                        scope.paginator.currentpage = data.items.currentpage;
                        scope.paginator.lastpage = data.items.lastpage;
                        scope.paginator.previouspage = data.items.previouspage;
                        scope.paginator.nextpage = data.items.nextpage;
                    }
                    scope.paginator.GetPage =  function(pagenum) {
                        console.log(pagenum);
                        BundleSrv.getList(pagenum).then(function(promise) {
                            data = JSON.parse(promise.data);
                            if (data.items !== undefined && data.items !== null) {
                                scope.bundles = data.items.items;
                                scope.paginator.currentpage = data.items.currentpage;
                                scope.paginator.lastpage = data.items.lastpage;
                                scope.paginator.previouspage = data.items.previouspage;
                                scope.paginator.nextpage = data.items.nextpage;
                            }
                        });
                    };
                });
            }
        };
    }
]);
