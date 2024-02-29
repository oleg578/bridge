AdminActivityModule.directive('activityPanel', ['$compile','ActivitySrv',
    function($compile, ActivitySrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/activity-panel.html',
            link: function(scope, element, attrs) {
                ActivitySrv.getActivity(1).then(function(promise) {
                    var data = promise.data;
                    scope.users = data.users;
                    scope.paginator.lastpage = data.lastpage;
                    scope.paginator.currentpage = data.currentpage;
                    scope.paginator.nextpage = data.nextpage;
                    scope.paginator.previouspage = data.previouspage;
                    scope.criteria = data.criteria;
                });
            }
        };
    }
]);
