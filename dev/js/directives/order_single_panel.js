Bridge.directive('orderPanel', ['$compile', '$location', 'OrderSrv',
    function($compile, $location, OrderSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/order-single-panel.html',
            link: function(scope, element, attrs) {
                scope.order = {};
                var url = $location.absUrl().split("/");
                var action = url.pop();
                var prefix = url.pop();
                var target = prefix + action;
                var parms_ar = $location.absUrl().split("?");
                var orderId = '';
                if (parms_ar.length === 2 && parms_ar[1].length !== 0) {
                    var parms = parms_ar.pop();
                    var id_proto = parms.split("=");
                    if (id_proto.length === 2 && id_proto[0] === 'orderId') {
                        orderId = id_proto.pop();
                    }
                }
                OrderSrv.getSingle(orderId).then(function(promise) {
                    scope.order = promise.data;
                });
            }
        };
    }
]);
