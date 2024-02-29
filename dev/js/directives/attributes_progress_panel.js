Bridge.directive('attributesProgressPanel', ['$compile',
    function($compile) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/attr_progress_panel.html',
            link: function(scope, element, attrs) {
                scope.progress = {
                    CCostAverage : 0,
                    CCostMfg : 0,
                    CCostShipAverage : 0,
                    CPriceEbayBreakeven : 0,
                    CPriceFmt : 0,
                    CPriceFmtBreakeven : 0,
                    CPriceMap : 0,
                    CPriceMapEnabled : 0,
                    CPriceMsrp : 0,
                    DMdfTitle : 0,
                    CKitSingle : 0,
                    CKitIncl : 0
                };
                scope.JobFinished = false;
                scope.JobStarted = false;
                scope.ws = new WebSocket('ws://fmt-api.com:8888');
                scope.ws.onmessage = function(ev) {
                    var msg_array = ev.data.split(':');
                    var msg_type = "";
                    if (msg_array[0] === "broadcast") {
                        if (msg_array[1] === "attrset") {
                            msg_type = msg_array[2];
                            switch (msg_type) {
                                case "ccostavg":
                                    scope.progress.CCostAverage = msg_array.pop();
                                    break;
                                case "ccostmfg":
                                    scope.progress.CCostMfg = msg_array.pop();
                                    break;
                                case "fmtbreak":
                                    scope.progress.CPriceFmtBreakeven = msg_array.pop();
                                    break;
                                case "cshipavg":
                                    scope.progress.CCostShipAverage = msg_array.pop();
                                    break;
                                case "pricefmt":
                                    scope.progress.CPriceFmt = msg_array.pop();
                                    break;
                                case "pricemap":
                                    scope.progress.CPriceMap = msg_array.pop();
                                    break;
                                case "pmapenbl":
                                    scope.progress.CPriceMapEnabled = msg_array.pop();
                                    break;
                                case "pcremsrp":
                                    scope.progress.CPriceMsrp = msg_array.pop();
                                    break;
                                case "mfgtitle":
                                    scope.progress.DMdfTitle = msg_array.pop();
                                    break;
                                case "ebybreak":
                                    scope.progress.CPriceEbayBreakeven = msg_array.pop();
                                    break;
                                case "kitsngl":
                                    scope.progress.CKitSingle = msg_array.pop();
                                    break;
                                case "kitincl":
                                    scope.progress.CKitIncl = msg_array.pop();
                                    break;
                                case "job":
                                    if (msg_array.pop() === "finish") {
                                        scope.JobFinished = true;
                                    }
                                    break;
                                default:
                                break;
                            }
                            scope.$apply();
                        }
                    }
                };
            }
        };
    }
]);
