Bridge.directive('attributeBoard', ['$compile', 'AttributeSrv', '$mdDialog',
    function($compile, AttributeSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/attribute-board.html',
            link: function(scope, element, attrs) {
                scope.attributes = [];
                scope.newattribute = {
                    Name : "",
                    Value : "",
                    Type : "text",
                    List : ""
                };
                scope.attrTypes = [
                    'text',
                    'list',
                ];
                scope.NewAttrShow = false;
                scope.addProcess = false;
                scope.AddAttr = function () {
                    scope.NewAttrShow = true;
                };
                scope.Discard = function () {
                    scope.NewAttrShow = false;
                    scope.newattribute = {
                        Name : "",
                        Value : ""
                    };
                };
                scope.SaveAttr = function (newattr) {
                    scope.addProcess = true;
                    AttributeSrv.AddAttr(newattr).then(function(promise) {
                        console.log(promise);
                        res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            scope.addProcess = false;
                            scope.NewAttrShow = false;
                            scope.newattribute = {
                                Name : "",
                                Value : ""
                            };
                            AttributeSrv.getList().then(function(promise) {
                                data = JSON.parse(promise.data);
                                if (data.items !== undefined && data.items !== null) {
                                    scope.attributes = data.items;
                                }
                            });
                            scope.alertSuccess({
                                message: 'Attribute added to all SKU'
                            });
                        } else {
                            scope.alertError({
                                message: 'Got error...'
                            });
                        }
                    });
                };
                scope.alertError = function(data) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .clickOutsideToClose(true)
                        .title('Alert !')
                        .textContent(data.message)
                        .ariaLabel('Alert')
                        .ok('Ok')
                    );
                };
                scope.alertSuccess = function(data) {
                    $mdDialog.show(
                        $mdDialog.alert()
                        .title('Success')
                        .content(data.message)
                        .ariaLabel('success').ok('Ok'));
                };
                AttributeSrv.getList().then(function(promise) {
                    data = JSON.parse(promise.data);
                    if (data.items !== undefined && data.items !== null) {
                        scope.attributes = data.items;
                    }
                });
                scope.GC = function () {
                    AttributeSrv.GcAttr().then(function(promise) {
                        res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            scope.alertSuccess({
                                message: 'Attribute table cleared'
                            });
                        } else {
                            scope.alertError({
                                message: 'Got error...'
                            });
                        }
                    });
                };
                scope.DelAttr = function(attr) {
                    var data = {
                        name: attr.Name
                    };
                    AttributeSrv.delAttr(data).then(function(promise) {
                        res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            for (var i = 0; i < scope.attributes.length; i++) {
                                if (scope.attributes[i].Name === attr.Name ) {
                                    scope.attributes.splice(i,1);
                                }
                            }
                            scope.alertSuccess({
                                message: 'Attribute marked to delete'
                            });
                        } else {
                            scope.alertError({
                                message: 'Got error...'
                            });
                        }
                    });
                };
                scope.BlockAttr = function(attr) {
                    AttributeSrv.setBlockAttr(JSON.stringify(attr)).then(function(promise) {
                        console.log(promise);
                    });
                    attr.Blocked = !attr.Blocked;
                    console.log(attr);
                };
            }
        };
    }
]);
