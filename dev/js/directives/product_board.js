Bridge.directive('productBoard', ['$compile', '$location', 'ProductSrv', 'ActionlogSrv', '$mdDialog',
    function($compile, $location, ProductSrv, ActionlogSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/product-board.html',
            link: function(scope, element, attrs) {
                window.onscroll = function() {
                    if (window.scrollY > 430) {
                        document.querySelector('.items-nav-rel').classList.add('items-nav-rel-hidden');
                        document.querySelector('.items-nav').classList.remove('items-nav-rel-hidden');
                    } else {
                        document.querySelector('.items-nav-rel').classList.remove('items-nav-rel-hidden');
                        document.querySelector('.items-nav').classList.add('items-nav-rel-hidden');
                    }
                };
                var id = null;

                CreateCtrl = function(scope, $mdDialog) {
                    scope.newproduct = {
                        Sku: "",
                        AuctionTitle: ""
                    };
                    scope.hide = function() {
                        $mdDialog.hide();
                    };
                    scope.cancel = function() {
                        $mdDialog.cancel();
                    };
                    scope.answer = function(answer) {
                        $mdDialog.hide(answer);
                    };
                };
                showCreate = function() {
                    $mdDialog.show({
                            templateUrl: '/partials/create_dialog.html',
                            parent: angular.element(document.body),
                            clickOutsideToClose: false,
                            controller: CreateCtrl,
                            locals: {
                                newproduct: scope.newproduct
                            }
                        })
                        .then(function(answer) {
                            ProductSrv.getNewSingle(answer).then(function(promise) {
                                scope.product = promise.data;
                                if (scope.product.QuantityUpdateType.length===0) {
                                    scope.product.QuantityUpdateType = 'AVAILABLE';
                                }
                                ActionlogSrv.SkuFilter(scope.product.Sku).then(function(promise) {
                                    res = JSON.parse(promise.data);
                                    scope.actionlogs = res.actions;
                                });
                            });
                        }, function() {
                            $mdDialog.hide();
                        });
                };
                var url = $location.absUrl().split("/");
                var action = url.pop();
                var prefix = url.pop();
                var target = prefix + action;
                var parms_ar = $location.absUrl().split("?");
                var sku = null;
                if (parms_ar.length === 2 && parms_ar[1].length !== 0) {
                    var parms = parms_ar.pop();
                    var id_proto = parms.split("=");
                    if (id_proto.length === 2 && id_proto[0] === 'id') {
                        id = id_proto.pop();
                    }
                    if (id_proto.length === 2 && id_proto[0] === 'sku') {
                        sku = id_proto.pop();
                    }
                }
                if (id !== null && id !== undefined && id.length === 32) {
                    ProductSrv.getProductSingle(id).then(function(promise) {
                        scope.product = promise.data;
                        if (scope.product.QuantityUpdateType.length===0) {
                            scope.product.QuantityUpdateType = 'AVAILABLE';
                        }
                        ActionlogSrv.SkuFilter(scope.product.Sku).then(function(promise) {
                            res = JSON.parse(promise.data);
                            scope.actionlogs = res.actions;
                        });
                        //short description
                        angular.element('#short-description-code').bind('blur keyup paste copy cut mouseup', function(e) {
                            ShortDesc_output();
                        });
                        angular.element('#short-description-code').html(scope.product.ShortDescription);

                        function ShortDesc_output() {
                            var newVal = angular.element('#short-description-code').html();
                            scope.product.ShortDescription = newVal.replace(/(&lt;\/?[a-zA-Z]*)&gt;/g, "");
                            //scope.$apply();
                        }
                        scope.SetBoldShortDescript = function (e) {
                            document.execCommand('bold', false, null);
                            ShortDesc_output();
                        };
                        //decription
                        angular.element('#description-code').bind('blur keyup paste copy cut mouseup', function(e) {
                            Desc_output();
                        });
                        angular.element('#description-code').html(scope.product.Description);

                        function Desc_output() {
                            var newVal = angular.element('#description-code').html();
                            scope.product.Description = newVal.replace(/(&lt;\/?[a-zA-Z]*)&gt;/g, "");
                        }
                        scope.SetBoldDescript = function (e) {
                            document.execCommand('bold', false, null);
                            Desc_output();
                        };
                    });
                } else if (sku !== null && sku !== undefined){
                    ProductSrv.getProductSingleSku(sku).then(function(promise) {
                        scope.product = promise.data;
                        if (scope.product.QuantityUpdateType.length===0) {
                            scope.product.QuantityUpdateType = 'AVAILABLE';
                        }
                        ActionlogSrv.SkuFilter(scope.product.Sku).then(function(promise) {
                            res = JSON.parse(promise.data);
                            scope.actionlogs = res.actions;
                        });
                        //short description
                        angular.element('#short-description-code').bind('blur keyup paste copy cut mouseup', function(e) {
                            ShortDesc_output();
                        });
                        angular.element('#short-description-code').html(scope.product.ShortDescription);

                        function ShortDesc_output() {
                            var newVal = angular.element('#short-description-code').html();
                            scope.product.ShortDescription = newVal.replace(/(&lt;\/?[a-zA-Z]*)&gt;/g, "");
                            //scope.$apply();
                        }
                        scope.SetBoldShortDescript = function (e) {
                            document.execCommand('bold', false, null);
                            ShortDesc_output();
                        };
                        //decription
                        angular.element('#description-code').bind('blur keyup paste copy cut mouseup', function(e) {
                            Desc_output();
                        });
                        angular.element('#description-code').html(scope.product.Description);

                        function Desc_output() {
                            var newVal = angular.element('#description-code').html();
                            scope.product.Description = newVal.replace(/(&lt;\/?[a-zA-Z]*)&gt;/g, "");
                        }
                        scope.SetBoldDescript = function (e) {
                            document.execCommand('bold', false, null);
                            Desc_output();
                        };
                    });
                } else {
                    if (target === 'productcreate') {
                        showCreate();
                    }
                }
                fixHeader = function() {
                    target = document.querySelector('#product-header');
                    body_el = document.querySelector('body');
                    bodyPosY = body_el.getBoundingClientRect().top;
                    targetPosY = target.getBoundingClientRect().top;
                    if (targetPosY < 0) {
                        target.classList.add('product-header-fix');
                        document.querySelector('.fix').style.height = '100px';
                    }
                    if (bodyPosY > -50) {
                        target.classList.remove('product-header-fix');
                        document.querySelector('.fix').style.height = '1rem';
                    }
                };
                window.addEventListener("scroll", fixHeader);
            }
        };
    }
]);
