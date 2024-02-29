AdminNavModule.controller('AdminNavCtrl', [
    '$scope', '$mdSidenav',
    function($scope, $mdSidenav) {
        $scope.restricted = {
            guest: false,
            user: false,
            manager: false,
            admin: false,
            superadmin: false
        };
        $scope.userRole = document.querySelector('main[data-user-role]').getAttribute('data-user-role');
        $scope.$watch('userRole', function(newVal, oldVal) {
            var menu_keys = Object.keys($scope.menuitems);
            var menu_keys_len = menu_keys.length;
            for (var i = 0; i < menu_keys_len; i++) {
                var submenu = $scope.menuitems[i].subitems;
                var sub_len = submenu.length;
                for (var k = 0; k < sub_len; k++) {
                    if (submenu[k].roles === '*') {
                        submenu[k].show = true;
                        $scope.menuitems[i].allow = true;
                    } else {
                        var roles = submenu[k].roles.split(",");
                        for (var ir = 0; ir < roles.length; ir++) {
                            roles[ir] = roles[ir].trim();
                        }
                        if (roles.indexOf($scope.userRole) !== -1) {
                            submenu[k].show = true;
                            $scope.menuitems[i].allow = true;
                        }
                    }
                }
            }
        });
        $scope.toggleNav = function() {
            $mdSidenav('left').toggle().then(function() {});
        };
        $scope.closeNav = function() {
            $mdSidenav('left').close().then(function() {});
        };
        $scope.login = function() {
            var user_panel = document.querySelector('.user-panel');
            user_panel.classList.toggle('unvisible');
        };
        $scope.menuitems = [{
            name: 'Users',
            show: false,
            allow: false,
            subitems: [{
                name: 'Users Activity',
                link: '/admin/users/activity',
                roles: 'admin,superadmin',
                show: false
            }]
        },{
            name: 'Hooks',
            show: false,
            allow: false,
            subitems: [{
                name: 'Manage',
                link: '/admin/hooks/manage',
                roles: 'admin,superadmin',
                show: false
            },{
                name: 'Apply',
                link: '/admin/hooks/apply',
                roles: 'admin,superadmin',
                show: false
            }]
        },{
            name: 'Push',
            show: false,
            allow: false,
            subitems: [{
                name: 'Manage',
                link: '/admin/push/manage',
                roles: 'admin,superadmin',
                show: false
            }]
        },{
            name: 'DcCenter',
            show: false,
            allow: false,
            subitems: [{
                name: 'Manage',
                link: '/admin/dccenter/manage',
                roles: 'admin,superadmin',
                show: false
            }]
        },{
            name: 'MfgMap',
            show: false,
            allow: false,
            subitems: [{
                name: 'Manage',
                link: '/admin/mfgmap/manage',
                roles: 'superadmin',
                show: false
            }]
        },{
            name: 'Mapping',
            show: false,
            allow: false,
            subitems: [{
                name: 'Manage',
                link: '/admin/mapping/manage',
                roles: 'admin,superadmin',
                show: false
            },{
                name: 'C_Price_Map',
                link: '/admin/nscpmap/manage',
                roles: 'admin,superadmin',
                show: false
            },{
                name: 'C_Price_Map Mfg reducer',
                link: '/admin/cpm/manage',
                roles: 'admin,superadmin',
                show: false
            }]
        },{
            name: 'Delivery Time',
            show: false,
            allow: false,
            subitems: [{
                name: 'Delivery Time',
                link: '/admin/deliverytime/manage',
                roles: 'admin,superadmin',
                show: false
            }]
        }];
    }
]);
