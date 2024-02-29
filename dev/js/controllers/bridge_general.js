Bridge.controller('General', [
    '$scope', 'ProductSrv',
    function($scope, ProductSrv) {
        $scope.criteria = {
            'sku' : null,
            'createdatefrom': null,
            'createdateto': null,
            'updatedatefrom': null,
            'updatedateto': null
        };
        $scope.$watch('criteria.createdatefrom', function(newValue, oldValue) {
            if (newValue !== oldValue && newValue !== null) {
                $scope.criteria.updatedatefrom = null;
                $scope.criteria.updatedateto = null;
            }
        });
        $scope.$watch('criteria.createdateto', function(newValue, oldValue) {
            if (newValue !== oldValue && newValue !== null) {
                $scope.criteria.updatedatefrom = null;
                $scope.criteria.updatedateto = null;
            }
        });
        $scope.$watch('criteria.updatedatefrom', function(newValue, oldValue) {
            if (newValue !== oldValue && newValue !== null) {
                $scope.criteria.createdatefrom = null;
                $scope.criteria.createdateto = null;
            }
        });
        $scope.$watch('criteria.updatedateto', function(newValue, oldValue) {
            if (newValue !== oldValue && newValue !== null) {
                $scope.criteria.createdatefrom = null;
                $scope.criteria.createdateto = null;
            }
        });
        $scope.SetCriteria = function() {
            ProductSrv.setCriteria(JSON.stringify($scope.criteria)).then(function(promise) {
                $scope.products = promise.data.items;
                $scope.paginator.currentpage = promise.data.currentpage;
                $scope.paginator.lastpage = promise.data.lastpage;
                $scope.paginator.previouspage = promise.data.previouspage;
                $scope.paginator.nextpage = promise.data.nextpage;
                $scope.criteria.sku = promise.data.criteria.sku?promise.data.criteria.sku:null;
                $scope.criteria.createdatefrom = promise.data.criteria.createdatefrom?new Date(promise.data.criteria.createdatefrom):null;
                $scope.criteria.createdateto = promise.data.criteria.createdateto?new Date(promise.data.criteria.createdateto):null;
                $scope.criteria.updatedatefrom = promise.data.criteria.updatedatefrom?new Date(promise.data.criteria.updatedatefrom):null;
                $scope.criteria.updatedateto = promise.data.criteria.updatedateto?new Date(promise.data.criteria.updatedateto):null;
            });
        };
        $scope.ClearCriteria = function() {
            $scope.criteria = {
                'sku' : null,
                'createdatefrom': null,
                'createdateto': null,
                'updatedatefrom': null,
                'updatedateto': null
            };
            ProductSrv.setCriteria(JSON.stringify($scope.criteria)).then(function(promise) {
                $scope.products = promise.data.items;
                $scope.paginator.currentpage = promise.data.currentpage;
                $scope.paginator.lastpage = promise.data.lastpage;
                $scope.paginator.previouspage = promise.data.previouspage;
                $scope.paginator.nextpage = promise.data.nextpage;
                $scope.criteria.sku = promise.data.criteria.sku?promise.data.criteria.sku:null;
                $scope.criteria.createdatefrom = promise.data.criteria.createdatefrom?new Date(promise.data.criteria.createdatefrom):null;
                $scope.criteria.createdateto = promise.data.criteria.createdateto?new Date(promise.data.criteria.createdateto):null;
                $scope.criteria.updatedatefrom = promise.data.criteria.updatedatefrom?new Date(promise.data.criteria.updatedatefrom):null;
                $scope.criteria.updatedateto = promise.data.criteria.updatedateto?new Date(promise.data.criteria.updatedateto):null;
            });
        };
    }
]);
