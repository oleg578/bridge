AdminNavModule.directive('actionMenu', ['$compile',
    function($compile) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/action-menu.html',
            link: function(scope, element, attrs) {
            }
        };
    }
]);
