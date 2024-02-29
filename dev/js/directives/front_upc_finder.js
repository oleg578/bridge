Bridge.directive('upcFinder', ['$compile','UpcFinderSrv',
    function($compile, UpcFinderSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/upc-finder.html',
            link: function(scope, element, attrs) {
                scope.mfgcodes = [];
                scope.selectedMFG = '';
                scope.Sku = '';
                scope.items = [];
                scope.paginator = {};
                scope.NoFound = false;
                scope.NewUPC = '';
                scope.NewUPCMFG = '';
                scope.NewUPCSKU = '';
                scope.UPCExists = false;
                scope.UPCSaved = false;
                scope.UPCFault = false;
                UpcFinderSrv.GetMfgCodes().then(function(promise) {
                    scope.mfgcodes = promise.data;
                });
                scope.SaveUPC = function () {
                    scope.UPCExists = false;
                    scope.UPCSaved = false;
                    scope.UPCFault = false;
                    var upc = {
                        UPC: scope.NewUPC,
                        MFGCODE: scope.NewUPCMFG,
                        SKU: scope.NewUPCSKU
                    };
                    UpcFinderSrv.SaveUPC(upc).then(function (promise) {
                        if (promise.data.result === 'success') {
                            scope.UPCSaved = true;
                            scope.Search();
                        }
                        if (promise.data.result === 'exists') {
                            scope.UPCExists = true;
                        }
                        if (promise.data.result === 'fault') {
                            scope.UPCFault = true;
                        }
                    });
                };
                scope.GetFreeUpc = function () {
                    UpcFinderSrv.GetFreeUpc().then(function (promise) {
                        scope.NewUPC = promise.data.UPC;
                        scope.NewUPCMFG = scope.selectedMFG;
                        scope.NewUPCSKU = scope.Sku;
                    });
                };
                scope.Search = function () {
                    scope.NoFound = false;
                    scope.NewUPC = '';
                    scope.NewUPCMFG = '';
                    scope.NewUPCSKU = '';
                    var obj = {
                        mfgcode : scope.selectedMFG,
                        sku: scope.Sku
                    };
                    UpcFinderSrv.SetCriteria(obj).then(function (promise) {
                        if (promise.data.result !== undefined && promise.data.result !== null) {
                            if (promise.data.result === 'success') {
                                UpcFinderSrv.GetUpc(1).then(function (promise) {
                                    if (promise.data.items.length === 0) {
                                        scope.NoFound = true;
                                        scope.UPCExists = false;
                                        scope.UPCSaved = false;
                                        scope.UPCFault = false;
                                        scope.GetFreeUpc();
                                    } else {
                                        scope.NoFound = false;
                                    }
                                    scope.items = promise.data.items;
                                    scope.paginator.currentpage = promise.data.currentpage;
                                    scope.paginator.lastpage = promise.data.lastpage;
                                    scope.paginator.previouspage = promise.data.previouspage;
                                    scope.paginator.nextpage = promise.data.nextpage;
                                });
                            }
                        }
                    });
                };
                scope.Reset = function () {
                    scope.NoFound = false;
                    scope.NewUPC = '';
                    scope.NewUPCMFG = '';
                    scope.NewUPCSKU = '';
                    scope.UPCExists = false;
                    scope.UPCSaved = false;
                    scope.UPCFault = false;
                    UpcFinderSrv.ResetCriteria().then(function (promise) {
                        if (promise.data.result !== undefined && promise.data.result !== null) {
                            if (promise.data.result === 'success') {
                                    scope.items = [];
                                    scope.selectedMFG = '';
                                    scope.Sku = '';
                            }
                        }
                    });
                };
                scope.paginator.GetPage =  function(pagenum) {
                    UpcFinderSrv.GetUpc(pagenum).then(function (promise) {
                        scope.items = promise.data.items;
                        scope.paginator.currentpage = promise.data.currentpage;
                        scope.paginator.lastpage = promise.data.lastpage;
                        scope.paginator.previouspage = promise.data.previouspage;
                        scope.paginator.nextpage = promise.data.nextpage;
                    });
                };
            }
        };
    }
]);
