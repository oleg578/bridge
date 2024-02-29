AttributeModule.controller('AttrSpec', [
    '$scope', 'AttributeSrv',
    function($scope, AttributeSrv) {
        $scope.StartProcess = function() {
            AttributeSrv.setSpecAttr().then(function() {
                $scope.JobStarted = true;
            });
        };
    }
]);
