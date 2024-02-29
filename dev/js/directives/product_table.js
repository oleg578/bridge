Bridge.directive('productTable', ['$compile', 'ProductSrv',
    function($compile, ProductSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/product-table.html',
            link: function(scope, element, attrs) {
                scope.paginator = {};
                scope.products = [];
                ProductSrv.getProducts(1).then(function(promise) {
                    scope.products = promise.data.items;
                    scope.paginator.currentpage = promise.data.currentpage;
                    scope.paginator.lastpage = promise.data.lastpage;
                    scope.paginator.previouspage = promise.data.previouspage;
                    scope.paginator.nextpage = promise.data.nextpage;
                    if (promise.data.criteria !== null && promise.data.criteria !== undefined) {
                        scope.criteria.sku = promise.data.criteria.sku?promise.data.criteria.sku:null;
                        scope.criteria.createdatefrom = promise.data.criteria.createdatefrom?new Date(promise.data.criteria.createdatefrom):null;
                        scope.criteria.createdateto = promise.data.criteria.createdateto?new Date(promise.data.criteria.createdateto):null;
                        scope.criteria.updatedatefrom = promise.data.criteria.updatedatefrom?new Date(promise.data.criteria.updatedatefrom):null;
                        scope.criteria.updatedateto = promise.data.criteria.updatedateto?new Date(promise.data.criteria.updatedateto):null;
                    }
                    scope.paginator.GetPage =  function(pagenum) {
                        ProductSrv.getProducts(pagenum).then(function(promise) {
                            scope.products = promise.data.items;
                            scope.paginator.currentpage = promise.data.currentpage;
                            scope.paginator.lastpage = promise.data.lastpage;
                            scope.paginator.previouspage = promise.data.previouspage;
                            scope.paginator.nextpage = promise.data.nextpage;
                            if (promise.data.criteria !== null && promise.data.criteria !== undefined) {
                                scope.criteria.sku = promise.data.criteria.sku?promise.data.criteria.sku:null;
                                scope.criteria.createdatefrom = promise.data.criteria.createdatefrom?new Date(promise.data.criteria.createdatefrom):null;
                                scope.criteria.createdateto = promise.data.criteria.createdateto?new Date(promise.data.criteria.createdateto):null;
                                scope.criteria.updatedatefrom = promise.data.criteria.updatedatefrom?new Date(promise.data.criteria.updatedatefrom):null;
                                scope.criteria.updatedateto = promise.data.criteria.updatedateto?new Date(promise.data.criteria.updatedateto):null;
                            }
                        });
                    };
                });
            }
        };
    }
]);
