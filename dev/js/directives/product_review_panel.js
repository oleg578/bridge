Bridge.directive('productReviewPanel', ['$compile',
    function($compile) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/product-review-panel.html',
            link: function(scope, element, attrs) {
            }
        };
    }
]);
