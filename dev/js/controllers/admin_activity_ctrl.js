AdminActivityModule.controller('AdminActivityCtrl', [
    '$scope', 'ActivitySrv',
    function($scope, ActivitySrv) {
        $scope.users = [];
        $scope.paginator = {};
        $scope.criteria = {
            email : ''
        };
        $scope.SearchCriteria = function(ev) {
            if (ev.keyCode === 13) {
                ActivitySrv.setCriteria($scope.criteria).then(function(promise) {
                    var data = promise.data;
                    $scope.users = data.users;
                    $scope.paginator.lastpage = data.lastpage;
                    $scope.paginator.currentpage = data.currentpage;
                    $scope.paginator.nextpage = data.nextpage;
                    $scope.paginator.previouspage = data.previouspage;
                    $scope.criteria = data.criteria;
                });
            }
        };
        $scope.GetPage = function(page) {
            ActivitySrv.getActivity(page).then(function(promise) {
                var data = promise.data;
                $scope.users = data.users;
                $scope.paginator.lastpage = data.lastpage;
                $scope.paginator.currentpage = data.currentpage;
                $scope.paginator.nextpage = data.nextpage;
                $scope.paginator.previouspage = data.previouspage;
                $scope.criteria = data.criteria;
            });
        };
    }
]);
