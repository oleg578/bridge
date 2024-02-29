Admin.controller('HookApply', ['$scope','HookSrv',
    function($scope, HookSrv) {
        $scope.ApplyProgress = false;
        $scope.StartApply = function () {
            $scope.ApplyProgress = true;
            var panel = document.querySelector(".hook-apply-progress-panel");
            var nodes = panel.childNodes;
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].classList.contains('panel-body')) {
                    panel.removeChild(nodes[i]);
                    i--;
                }
            }
            HookSrv.Apply().then(function(promise) {
                $scope.ApplyProgress = false;
            });
        };
        $scope.CaWS = new WebSocket('ws://fmt-api.com:8888');
        $scope.CaWS.onmessage = function(ev) {
            $scope.ProcessingMsg(ev.data);
        };
        $scope.ProcessingMsg = function (msg) {
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
