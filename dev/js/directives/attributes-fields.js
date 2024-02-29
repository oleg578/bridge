Bridge.directive('attributesFields', ['$compile', 'PushSetSrv',
    function($compile, PushSetSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/attributes-fields.html',
            link: function(scope, element, attrs) {
                scope.attributes = [];
                scope.FullAttr = false;
                PushSetSrv.getAttributes().then(function(promise) {
                    scope.attributes = promise.data;
                });
                scope.fullAttrChange = function(fullflag) {
                    if (fullflag) {
                        for (var i = 0; i < scope.attributes.length; i++) {
                            scope.attributes[i].Push=1;
                        }
                    } else {
                        for (var ii = 0; ii < scope.attributes.length; ii++) {
                                scope.attributes[ii].Push=0;
                        }
                    }
                };
            }
        };
    }
]);
