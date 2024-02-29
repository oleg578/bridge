NavModule.controller('FrontNavCtrl', [
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
            name: 'Product',
            show: false,
            allow: false,
            subitems: [{
                name: 'Create',
                link: '/product/create',
                roles: 'manager,admin,superadmin',
                show: false
            },{
                name: 'Browse',
                link: '/',
                roles: 'manager,admin,superadmin',
                show: false
            }, {
                name: 'Import',
                link: '/product/import',
                roles: 'manager,admin,superadmin',
                show: false
            }, {
                name: 'Push',
                link: '/product/push',
                roles: 'manager,admin,superadmin',
                show: false
            }, {
                name: 'Push Prepare',
                link: '/product/push/prepare',
                roles: 'manager,admin,superadmin',
                show: false
            }]
        }, {
            name: 'Bundle',
            show: false,
            allow: false,
            subitems: [{
                name: 'Import',
                link: '/bundle/import',
                roles: 'manager,admin,superadmin',
                show: false
            },{
                name: 'Browse',
                link: '/bundle/browse',
                roles: 'manager,admin,superadmin',
                show: false
            }]
        }, {
            name: 'Orders',
            show: false,
            allow: false,
            subitems: [{
                name: 'Import',
                link: '/order/import',
                roles: 'manager,admin,superadmin',
                show: false
            },{
                name: 'Browse',
                link: '/order/browse',
                roles: 'manager,admin,superadmin',
                show: false
            }]
        }, {
            name: 'Attributes',
            show: false,
            allow: false,
            subitems: [{
                name: 'Manage',
                link: '/attribute/manage',
                roles: 'manager,admin,superadmin',
                show: false
            },{
                name: 'Generate',
                link: '/attribute/special',
                roles: 'manager,admin,superadmin',
                show: false
            }]
        }, {
            name: 'Labels',
            show: false,
            allow: false,
            subitems: [{
                name: 'Manage',
                link: '/label/manage',
                roles: 'manager,admin,superadmin',
                show: false
            }]
        }, {
            name: 'Reports',
            show: false,
            allow: false,
            subitems: [{
                name: 'Pricefile orphans',
                link: '/report/nosourcepricefile/1',
                roles: 'manager,admin,superadmin',
                show: false
            },{
                name: 'PartsData orphans',
                link: '/report/nosourcepartsdata/1',
                roles: 'manager,admin,superadmin',
                show: false
            },{
                name: 'Holiday Sales',
                link: '/report/holidaysales',
                roles: 'manager,admin,superadmin',
                show: false
            }]
        }, {
            name: 'UPC',
            show: false,
            allow: false,
            subitems: [{
                name: 'Finder',
                link: '/upc/finder',
                roles: 'user,manager,admin,superadmin',
                show: false
            }]
        }];
    }
]);
