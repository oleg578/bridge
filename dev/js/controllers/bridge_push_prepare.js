ProductModule.controller('PushPrepCtrl', ['$scope', 'PushSetSrv', '$mdDialog',
    function($scope, PushSetSrv, $mdDialog) {
        $scope.Save = function() {
            var fullset = {
                products: $scope.products,
                attributes: $scope.attributes,
            };
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
            $scope.alertSuccess = function(data) {
                $mdDialog.show(
                    $mdDialog.alert()
                    .title('Success')
                    .content(data.message)
                    .ariaLabel('success').ok('Ok'));
            };
            PushSetSrv.Save(fullset).then(function(promise) {
                var response = promise.data;
                if (response.result === 'success') {
                    $scope.alertSuccess({'message':"Set successfully updated"});
                } else {
                    $scope.alertError(response);
                }
            });
        };
    }
]);
