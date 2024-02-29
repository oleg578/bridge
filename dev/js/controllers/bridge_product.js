ProductModule.controller('Product', [
    '$scope', '$location', 'ProductSrv', 'AttributeSrv', 'ActionlogSrv', '$mdDialog', '$http',
    function($scope, $location, ProductSrv, AttributeSrv, ActionlogSrv, $mdDialog, $http) {
        $scope.ShortDescriptionEditor = {};
        $scope.DescriptionEditor = {};
        $scope.conditions = [
            'NEW',
            'USED',
            'REFURBISHED',
            'RECONDITIONED'
        ];
        $scope.flags = [
            'NoFlag',
            'ExclamationPoint',
            'QuestionMark',
            'NotAvailable',
            'Price',
            'BlueFlag',
            'GreenFlag',
            'RedFlag',
            'YellowFlag',
            'ItemCopied'
        ];
        $scope.QuantityUpdateTypes = [
            'AVAILABLE',
            'ABSOLUTE',
            'RELATIVE',
            'IN STOCK',
            'UNSHIPPED'
        ];
        $scope.labelsSet = [];
        $scope.alertError = function(data) {
            $mdDialog.show(
                $mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Alert !')
                .textContent(data.message)
                .ariaLabel('Alert')
                .ok('Ok')
            );
        };
        $scope.setLabel = function(label) {
            if (label.checked === true) {
                if ($scope.labelsSet.length === 3) {
                    $scope.alertError({
                        'message': "Max 3 Labels can be set..."
                    });
                    label.checked = false;
                    return;
                }
                $scope.labelsSet.push(label.name);
            } else {
                for (var i = 0; i < $scope.labelsSet.length; i++) {
                    if ($scope.labelsSet[i] === label.name) {
                        $scope.labelsSet.splice(i, 1);
                    }
                }
            }
            $scope.product.Labels = $scope.labelsSet.join(',');
        };
        $scope.SpyScroll = function(ev) {
            var target = ev.currentTarget.dataset.target;
            var targetTop = document.querySelector('#' + target).getBoundingClientRect().top;
            var delta = window.scrollY <= 50 ? 20 : 50;
            window.scrollTo(0, targetTop + window.scrollY - delta);
        };
        $scope.$watch('product.Classification', function(newValue, oldValue) {
            if (newValue !== null && newValue !== undefined) {
                if (oldValue !== undefined) {
                    //console.log('next newValue : ' + newValue);
                }
            }
        });
        $scope.$watch('product.ShortDescription', function(newValue, oldValue) {
            if (newValue !== null && newValue !== undefined && newValue.length > 1000) {
                $scope.alertError({
                    'message': "Decription can have max 1000 symbols..."
                });
                return;
            }
        });
        $scope.$watch('product.Description', function(newValue, oldValue) {
            if (newValue !== null && newValue !== undefined && newValue.length > 32000) {
                $scope.alertError({
                    'message': "Decription can have max 32000 symbols..."
                });
                return;
            }
        });
        $scope.DisableFlyNav = function () {
            document.querySelector(".items-nav").setAttribute("style", "display:none !important");
        };
        $scope.EnableFlyNav = function () {
            document.querySelector(".items-nav").setAttribute("style", "display:block");
        };
        $scope.VerifyImg = function (url) {
            var urlR = new RegExp('^https?:\/\/.+', 'i');
            if (url.match(urlR) !== null) {
                $http.get('/api/image/verifyurl/?imgurl='+url, function (promise) {
                    //console.log(promise);
                });
                return url;
            }
            return "";
        };
        $scope.CancelPage = function () {
            window.close();
        };
        $scope.CreateImg = function () {
            var maxNum = 0;
            var curNum = 0;
            var newImg = {
                FolderName : "",
                PlacementName : "ITEMIMAGEURL",
                Sku : $scope.product.Sku,
                URL : ""
            };
            for (var i = 0; i < $scope.product.images.length; i++) {
                curNum = $scope.product.images[i].PlacementName.replace(/\D/g,'');
                if ( curNum > maxNum ) {
                    maxNum = curNum;
                }
            }
            newImg.PlacementName += ++maxNum;
            $scope.product.images.splice(0, 0, newImg);
        };
        $scope.ClearImg = function (image) {
                image.URL = "";
        };
        $scope.Save = function () {
            $scope.product.Edited = true;
            $scope.product.Created = false;
            $scope.product.Deleted = false;
            ProductSrv.Update($scope.product).then(function (promise) {
                var res = JSON.parse(promise.data);
                var newproduct = res.product;
                newproduct.attributes = $scope.product.attributes;
                newproduct.bundle = $scope.product.bundle;
                newproduct.classificationlist = $scope.product.classificationlist;
                newproduct.images = $scope.product.images;
                newproduct.labelslist = $scope.product.labelslist;
                newproduct.shipping = $scope.product.shipping;
                $scope.product = newproduct;
                ActionlogSrv.SkuFilter($scope.product.Sku).then(function (promise) {
                    res = JSON.parse(promise.data);
                    $scope.actionlogs = res.actions;
                });
            });
        };
        $scope.SaveExit = function () {
            $scope.product.Edited = true;
            $scope.product.Created = false;
            $scope.product.Deleted = false;
            ProductSrv.Update($scope.product).then(function (promise) {
                window.close();
            });
        };
        $scope.MarkDelete = function () {
            ProductSrv.MarkDelete($scope.product.id).then(function (promise) {
                $scope.product.Deleted = true;
                ActionlogSrv.SkuFilter($scope.product.Sku).then(function (promise) {
                    res = JSON.parse(promise.data);
                    $scope.actionlogs = res.actions;
                });
            });
        };
    }
]);
