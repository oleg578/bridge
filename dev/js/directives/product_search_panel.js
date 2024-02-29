Bridge.directive('productSearchPanel', ['$compile',
    function($compile) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/product-search-panel.html',
            link: function(scope, element, attrs) {
            }
        };
    }
]);
