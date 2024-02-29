Admin.directive('mappingTable', ['$compile', 'MappingSrv',
    function($compile, MappingSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/mapping_table.html',
            link: function(scope, element, attrs) {
                scope.items = [];
                MappingSrv.getList().then(function(promise){
                    scope.items = promise.data;
                });
                scope.ChangeTrigger = function(item) {
                    if (item.dirty === null && item.dirty === undefined) {
                        item.dirty = false;
                    }
                    item.dirty = true;
                };
                scope.Save = function(item) {
                    MappingSrv.Save(item).then(function(promise){
                        scope.items = promise.data;
                    });
                };
            }
        }
    }
]);
