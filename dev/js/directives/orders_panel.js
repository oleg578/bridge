Bridge.directive('ordersReviewPanel', ['$compile', '$location', 'OrderSrv',
    function($compile, $location, OrderSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/orders-panel.html',
            link: function(scope, element, attrs) {
                scope.orders = [];
                scope.paginator = {};
                scope.criteria = {
                    SiteOrderID : "",
                    OrderDateFrom : null,
                    OrderDateTo : null
                };
                scope.DateFromChange = function(dateFrom) {
                    console.log(dateFrom.toISOString().split("T").shift());
                };
                scope.DateToChange = function(dateTo) {
                    console.log(dateTo.toISOString().split("T").shift());
                };
                scope.OrderIDChange = function(orderID) {
                    console.log(orderID);
                };
                scope.setData = function(data) {
                    if (data.items !== undefined && data.items !== null) {
                        scope.orders = data.items.items;
                        scope.criteria.SiteOrderID = data.items.criteria.SiteOrderID;
                        if (data.items.criteria.OrderDateFrom !== null && data.items.criteria.OrderDateFrom !== undefined) {
                            scope.criteria.OrderDateFrom = new Date(data.items.criteria.OrderDateFrom);
                        } else {
                            scope.criteria.OrderDateFrom = null;
                        }
                        if (data.items.criteria.OrderDateTo !== null && data.items.criteria.OrderDateTo !== undefined) {
                            scope.criteria.OrderDateTo = new Date(data.items.criteria.OrderDateTo);
                        } else {
                            scope.criteria.OrderDateTo = null;
                        }
                        scope.paginator.currentpage = data.items.currentpage;
                        scope.paginator.lastpage = data.items.lastpage;
                        scope.paginator.previouspage = data.items.previouspage;
                        scope.paginator.nextpage = data.items.nextpage;
                    }
                };
                scope.SetCriteria = function(criteria) {
                    var newcriteria = {
                        SiteOrderID : '',
                        OrderDateFrom : null,
                        OrderDateTo : null
                    };
                    if (scope.criteria.SiteOrderID !== null && scope.criteria.SiteOrderID !== undefined) {
                        newcriteria.SiteOrderID = scope.criteria.SiteOrderID;
                    }
                    if (scope.criteria.OrderDateFrom !== null && scope.criteria.OrderDateFrom !== undefined) {
                        newcriteria.OrderDateFrom = scope.criteria.OrderDateFrom.toISOString().split("T").shift();
                    }
                    if (scope.criteria.OrderDateTo !== null && scope.criteria.OrderDateTo !== undefined) {
                        newcriteria.OrderDateTo = scope.criteria.OrderDateTo.toISOString().split("T").shift();
                    }
                    OrderSrv.setCriteria(newcriteria).then(function(promise) {
                        OrderSrv.getList().then(function(promise) {
                            scope.setData(promise.data);
                        });
                    });
                };
                scope.ResetCriteria = function() {
                    OrderSrv.resetCriteria().then(function(promise) {
                        OrderSrv.getList().then(function(promise) {
                            scope.setData(promise.data);
                        });
                    });
                };
                OrderSrv.getList().then(function(promise) {
                    scope.setData(promise.data);
                    scope.paginator.GetPage =  function(pagenum) {
                        OrderSrv.getList(pagenum).then(function(promise) {
                            scope.setData(promise.data);
                        });
                    };
                });
            }
        };
    }
]);
