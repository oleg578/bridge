ProductModule.controller('PushCtrl', ['$scope','PushSrv',
    function($scope, PushSrv) {
        $scope.PushProgress = 0;
        $scope.prepareProcess = false;
        $scope.CAConnected = false;
        $scope.SendSuccess = false;
        $scope.FtpError = false;
        $scope.PushProcessActive = false;
        $scope.PushProcessActiveMsg = false;
        $scope.startPush = function () {
            $scope.PushProcessActive = true;
            var panel = document.querySelector(".hook-apply-progress-panel");
            var nodes = panel.childNodes;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].classList.contains('panel-body')) {
                    panel.removeChild(nodes[i]);
                    i--;
                }
            }
            PushSrv.push().then(function(promise) {
                if (promise.data !== null && promise.data !== undefined) {
                    if (promise.data.error !== null && promise.data.error !== undefined) {
                        document.querySelector("#push-progress-msg").innerHTML = promise.data.error;
                        $scope.PushProcessActiveMsg = true;
                        $scope.PushProcessActive = true;
                    }
                }
            });
            $scope.prepareProcess = true;
        };
        $scope.CaWS = new WebSocket('ws://fmt-api.com:8888');
        $scope.CaWS.onmessage = function(ev) {
            $scope.ProcessingMsg(ev.data);
        };
        $scope.ProcessingMsg = function (msg) {
            if (msg.substr(10,4) === 'push') {
                if (msg.substr(15,8) === 'progress') {
                    $scope.PushProgress = parseInt(msg.split(":").pop(), 10);
                    angular.element('#push-progress').width($scope.PushProgress+"%");
                    angular.element('#push-progress-info').html($scope.PushProgress+"%");
                }
            }
            if (msg === 'broadcast:push:ftp:connected') {
                $scope.CAConnected = true;
                $scope.$apply();
            }
            if (msg === 'broadcast:push:ftp:success') {
                $scope.SendSuccess = true;
                $scope.$apply();
            }
            if (msg.substr(15,5) === 'error') {
                angular.element('#errorftp').html(msg.substr(21));
                $scope.FtpError = true;
                $scope.$apply();
            }
            if (msg.substr(10,4) === 'hook') {
                var pr = msg.substr(15);
                pr = pr.replace(/\:/, " ");
                newmsg = document.createElement('div');
                newmsg.classList.add("panel-body");
                newmsg.classList.add("hook-apply-msg-box");
                newmsg.appendChild(document.createTextNode(pr));
                document.querySelector(".hook-apply-progress-panel").appendChild(newmsg);
            }
        };
    }
]);
