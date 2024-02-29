Bridge.directive('productFields', ['$compile', 'PushSetSrv',
    function($compile, PushSetSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/product-fields.html',
            link: function(scope, element, attrs) {
                scope.products = [];
                scope.FullProduct = false;
                PushSetSrv.getProducts().then(function(promise) {
                    scope.products = promise.data;
                });
                scope.fChange = function(product) {
                    if (product.Name === 'Sku') {
                        product.Push = 1;
                    }
                };
                scope.fullProductChange = function(fullflag) {
                    if (fullflag) {
                        for (var i = 0; i < scope.products.length; i++) {
                            scope.products[i].Push=1;
                        }
                    } else {
                        for (var ii = 0; ii < scope.products.length; ii++) {
                            if (scope.products[ii].Name === 'Sku') {
                                scope.products[ii].Push=1;
                            } else {
                                scope.products[ii].Push=0;
                            }
                        }
                    }
                };
            }
        };
    }
]);
