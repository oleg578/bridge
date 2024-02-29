var Bridge = angular.module('Bridge', [
    'angular-loading-bar',
    'ngMaterial',
    'ngMessages',
    'Bridge.NavModule',
    'Bridge.ProductModule',
    'Bridge.AttributeModule',
    'Bridge.LabelModule',
    'Bridge.BundleModule',
    'Bridge.OrderModule'
]);
Bridge.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);
Bridge.filter('merge', function() {
        return function(input) {
            var out;
            input = input || null;
            if (input) {
                out = input.replace(/\s+/g, "").trim().toLowerCase();
            }
            return out;
        };
    });

var AttributeModule = angular.module('Bridge.AttributeModule', []);

var BundleModule = angular.module('Bridge.BundleModule', []);

var LabelModule = angular.module('Bridge.LabelModule', []);

var OrderModule = angular.module('Bridge.OrderModule', []);

var AdminActivityModule = angular.module('Admin.ActivityModule', []);

var AdminNavModule = angular.module('Admin.NavModule', []);

var Admin = angular.module('Admin', [
    'ngMaterial',
    'ngMessages',
    'Admin.NavModule',
    'Admin.ActivityModule'
]);

var NavModule = angular.module('Bridge.NavModule', []);

var ProductModule = angular.module('Bridge.ProductModule', ['ngMaterial', 'ngMessages']);

Bridge.service('ActionlogSrv', ['$http', function($http) {
    var SkuFilter = function(sku) {
        skuobj = {
            'sku' : sku
        };
        return $http.post("/api/actionlog/skufilter",JSON.stringify(skuobj),{cache:false});
    };
    return {
        SkuFilter: function(sku) {
            return SkuFilter(sku);
        }
    };
}]);

Admin.service('CpmSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/cpm/list",{cache:false});
    };
    var deleteRec = function(m) {
        return $http.post("/api/cpm/delete",JSON.stringify(m),{cache:false});
    };
    var updateRec = function(m) {
        return $http.post("/api/cpm/update",JSON.stringify(m),{cache:false});
    };
    var createMap = function(m) {
        return $http.post("/api/cpm/create",JSON.stringify(m),{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        deleteRec: function(m) {
            return deleteRec(m);
        },
        updateRec: function(m) {
            return updateRec(m);
        },
        createMap: function(m) {
            return createMap(m);
        }
    };
}]);
Admin.service('DcCenterSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/dccenter/list",{cache:false});
    };
    var deleteCenter = function(center) {
        return $http.post("/api/dccenter/delete",JSON.stringify(center),{cache:false});
    };
    var updateCenter = function(center) {
        return $http.post("/api/dccenter/update",JSON.stringify(center),{cache:false});
    };
    var createCenter = function(center) {
        return $http.post("/api/dccenter/create",JSON.stringify(center),{cache:false});
    };
    var getMaxLoc = function(center) {
        return $http.get("/api/dccenter/getmaxloc",{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        deleteCenter: function(center) {
            return deleteCenter(center);
        },
        updateCenter: function(center) {
            return updateCenter(center);
        },
        createCenter: function(center) {
            return createCenter(center);
        },
        getMaxLoc: function() {
            return getMaxLoc();
        }
    };
}]);

Admin.service('DeliverytimeSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/deliverytime/list",{cache:false});
    };
    var createDt = function(dt) {
        return $http.post("/api/deliverytime/create",JSON.stringify(dt),{cache:false});
    };
    var updateDt = function(dt) {
        return $http.post("/api/deliverytime/update",JSON.stringify(dt),{cache:false});
    };
    var deleteDt = function(dt) {
        return $http.post("/api/deliverytime/delete",JSON.stringify(dt),{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        createDt: function(dt) {
            return createDt(dt);
        },
        updateDt: function(dt) {
            return updateDt(dt);
        },
        deleteDt: function(dt) {
            return deleteDt(dt);
        }
    }
}]);

Admin.service('MfgMapSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/mfgmap/list",{cache:false});
    };
    var deleteRec = function(mfgmap) {
        return $http.post("/api/mfgmap/delete",JSON.stringify(mfgmap),{cache:false});
    };
    var updateRec = function(mfgmap) {
        return $http.post("/api/mfgmap/update",JSON.stringify(mfgmap),{cache:false});
    };
    var createMfgMap = function(mfgmap) {
        return $http.post("/api/mfgmap/create",JSON.stringify(mfgmap),{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        deleteRec: function(mfgmap) {
            return deleteRec(mfgmap);
        },
        updateRec: function(mfgmap) {
            return updateRec(mfgmap);
        },
        createMfgMap: function(mfgmap) {
            return createMfgMap(mfgmap);
        }
    };
}]);
Admin.service('NscpMapSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/nscpmap/list",{cache:false});
    };
    var deleteRec = function(m) {
        return $http.post("/api/nscpmap/delete",JSON.stringify(m),{cache:false});
    };
    var updateRec = function(m) {
        return $http.post("/api/nscpmap/update",JSON.stringify(m),{cache:false});
    };
    var createMap = function(m) {
        return $http.post("/api/nscpmap/create",JSON.stringify(m),{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        deleteRec: function(m) {
            return deleteRec(m);
        },
        updateRec: function(m) {
            return updateRec(m);
        },
        createMap: function(m) {
            return createMap(m);
        }
    };
}]);
Admin.service('PushManageSrv', ['$http', function($http) {
    var getProducts = function(page) {
        return $http.get("/api/product/manage/get/page/?page="+page,{cache:false});
    };
    var SetCriteria = function(criteria) {
        return $http.post("/api/product/manage/setcriteria",JSON.stringify(criteria),{cache:false});
    };
    var SetPush = function() {
        return $http.post("/api/product/manage/setpush",{cache:false});
    };
    var UnsetPush = function() {
        return $http.post("/api/product/manage/unsetpush",{cache:false});
    };
    return {
        getProducts: function(page) {
            return getProducts(page);
        },
        SetCriteria: function(criteria) {
            return SetCriteria(criteria);
        },
        SetPush: function() {
            return SetPush();
        },
        UnsetPush: function() {
            return UnsetPush();
        }
    };
}]);

Bridge.service('PushSetSrv', ['$http', function($http) {
    var getProducts = function() {
        return $http.get("/api/pushsrv/get/products",{cache:false});
    };
    var getAttributes = function() {
        return $http.get("/api/pushsrv/get/attributes",{cache:false});
    };
    var Save = function(setobj) {
        return $http.post("/api/pushsrv/save",JSON.stringify(setobj),{cache:false});
    };
    return {
        getProducts: function() {
            return getProducts();
        },
        getAttributes: function() {
            return getAttributes();
        },
        Save: function(setobj) {
            return Save(setobj);
        }
    };
}]);

Bridge.service('UpcFinderSrv', ['$http', function($http) {
    var GetMfgCodes = function() {
        return $http.get("/api/upc/get/mfgcodes",{cache:false});
    };
    var GetUpc = function(page) {
        return $http.get("/api/upc/get/upc/?page="+page,{cache:false});
    };
    var GetFreeUpc = function() {
        return $http.get("/api/upc/get/freeupc",{cache:false});
    };
    var SaveUPC = function(obj) {
        return $http.post("/api/upc/saveupc",JSON.stringify(obj),{cache:false});
    };
    var SetCriteria = function(obj) {
        return $http.post("/api/upc/setcriteria",JSON.stringify(obj),{cache:false});
    };
    var ResetCriteria = function() {
        return $http.post("/api/upc/resetcriteria",{cache:false});
    };
    return {
        GetMfgCodes: function() {
            return GetMfgCodes();
        },
        GetUpc: function(page) {
            return GetUpc(page);
        },
        GetFreeUpc: function() {
            return GetFreeUpc();
        },
        SaveUPC: function(obj) {
            return SaveUPC(obj);
        },
        SetCriteria: function(obj) {
            return SetCriteria(obj);
        },
        ResetCriteria: function() {
            return ResetCriteria();
        }
    };
}]);

AdminActivityModule.service('ActivitySrv', ['$http', function($http) {
    var getActivity = function(pagenum) {
        if (pagenum === null || pagenum === undefined) {
            pagenum = 1;
        }
        return $http.get("/api/admin/activity/get/page/" + pagenum,{cache:false});
    };
    var setCriteria = function(criteria) {
        return $http.post("/api/admin/activity/setcriteria", JSON.stringify(criteria),{cache:false});
    };
    return {
        getActivity: function(par) {
            return getActivity(par);
        },
        setCriteria: function(par) {
            return setCriteria(par);
        }
    };
}]);

Bridge.service('AttributeSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/attribute/list",{cache:false});
    };
    var delAttr = function(name) {
        return $http.post("/api/attribute/delete",JSON.stringify(name),{cache:false});
    };
    var GcAttr = function() {
        return $http.post("/api/attribute/gc",JSON.stringify([]),{cache:false});
    };
    var AddAttr = function(obj) {
        return $http.post("/api/attribute/add",JSON.stringify(obj),{cache:false});
    };
    var setSpecAttr = function() {
        return $http.post("/api/attribute/setattr",null,{cache:false});
    };
    var setBlockAttr = function(attr) {
        return $http.post("/api/attribute/setblockattr",attr,{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        delAttr: function(name) {
            return delAttr(name);
        },
        GcAttr: function() {
            return GcAttr();
        },
        AddAttr: function(obj) {
            return AddAttr(obj);
        },
        setSpecAttr: function() {
            return setSpecAttr();
        },
        setBlockAttr: function(attr) {
            return setBlockAttr(attr);
        }
    };
}]);

Bridge.service('BundleSrv', ['$http', function($http) {
    var getList = function(pagenum) {
        if (pagenum === null || pagenum === undefined) {
            pagenum = 1;
        }
        return $http.get("/api/bundle/list/?page=" + pagenum,{cache:false});
    };
    return {
        getList: function(pn) {
            return getList(pn);
        },
    };
}]);

Admin.service('HookSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/hook/list",{cache:false});
    };
    var getActiveList = function() {
        return $http.get("/api/hook/list/active",{cache:false});
    };
    var CreateHook = function(hook) {
        return $http.post("/api/hook/create",JSON.stringify(hook),{cache:false});
    };
    var StoreHook = function(hook) {
        return $http.post("/api/hook/store",JSON.stringify(hook),{cache:false});
    };
    var ChangeStatus = function(hook) {
        return $http.post("/api/hook/changestatus",JSON.stringify(hook),{cache:false});
    };
    var Delete = function(hook) {
        return $http.post("/api/hook/delete",JSON.stringify(hook),{cache:false});
    };
    var Apply = function() {
        return $http.post("/api/hook/apply",{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        getActiveList: function() {
            return getActiveList();
        },
        CreateHook: function(hook) {
            return CreateHook(hook);
        },
        StoreHook: function(hook) {
            return StoreHook(hook);
        },
        ChangeStatus: function(hook) {
            return ChangeStatus(hook);
        },
        Delete: function(hook) {
            return Delete(hook);
        },
        Apply: function() {
            return Apply();
        }
    };
}]);

Bridge.service('LabelSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/label/list",{cache:false});
    };
    var delLbl = function(lbl) {
        return $http.post("/api/label/delete",JSON.stringify(lbl),{cache:false});
    };
    var AddLbl = function(obj) {
        return $http.post("/api/label/add",JSON.stringify(obj),{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        delLbl: function(lbl) {
            return delLbl(lbl);
        },
        AddLbl: function(obj) {
            return AddLbl(obj);
        }
    };
}]);

Admin.service('MappingSrv', ['$http', function($http) {
    var getList = function() {
        return $http.get("/api/mapping/list",{cache:false});
    };
    var Save = function(item) {
        return $http.post("/api/mapping/save",JSON.stringify(item),{cache:false});
    };
    return {
        getList: function() {
            return getList();
        },
        Save: function(item) {
            return Save(item);
        }
    };
}]);


Bridge.service('OrderSrv', ['$http', function($http) {
    var getList = function(pagenum) {
        if (pagenum === null || pagenum === undefined) {
            pagenum = 1;
        }
        return $http.get("/api/order/list/?page=" + pagenum,{cache:false});
    };
    var setCriteria = function(criteria) {
        return $http.post("/api/order/setcriteria", JSON.stringify(criteria),{cache:false});
    };
    var resetCriteria = function() {
        return $http.post("/api/order/resetcriteria", null,{cache:false});
    };
    var getSingle = function(orderid) {
        return $http.get("/api/order/get/?orderId="+orderid,{cache:false});
    };
    return {
        getList: function(pn) {
            return getList(pn);
        },
        setCriteria: function(criteria) {
            return setCriteria(criteria);
        },
        resetCriteria: function() {
            return resetCriteria();
        },
        getSingle: function(orderId) {
            return getSingle(orderId);
        }
    };
}]);

Bridge.service('ProductSrv', ['$http', function($http) {
    var getProducts = function(pagenum) {
        if (pagenum === null || pagenum === undefined) {
            pagenum = 1;
        }
        return $http.get("/api/product/get/page/?page=" + pagenum,{cache:false});
    };
    var getProductSingle = function(id) {
        if (id === null || id === undefined) {
            id = false;
        }
        if (id !== false) {
            return $http.get("/api/product/get/single/?id=" + id,{cache:false});
        }
        return false;
    };
    var getProductSingleSku = function(sku) {
        if (sku === null || sku === undefined) {
            sku = false;
        }
        if (sku !== false) {
            return $http.get("/api/product/get/single/?sku=" + sku,{cache:false});
        }
        return false;
    };
    var getNewSingle = function(obj) {
        return $http.post("/api/product/create/", JSON.stringify(obj),{cache:false});
    };
    var setCriteria = function(criteria) {
        return $http.post("/api/product/setcriteria",JSON.stringify(criteria),{cache:false});
    };
    var Update = function(productobj) {
        return $http.post("/api/product/update",JSON.stringify(productobj),{cache:false});
    };
    var MarkDelete = function(productId) {
        prdobj = {
            id : productId
        };
        return $http.post("/api/product/markdelete",JSON.stringify(prdobj),{cache:false});
    };
    return {
        getProducts: function(par) {
            return getProducts(par);
        },
        getProductSingle: function(id) {
            return getProductSingle(id);
        },
        getProductSingleSku: function(sku) {
            return getProductSingleSku(sku);
        },
        getNewSingle : function (obj) {
            return getNewSingle(obj);
        },
        setCriteria: function(criteria) {
            return setCriteria(criteria);
        },
        Update: function(productobj) {
            return Update(productobj);
        },
        MarkDelete: function(prdid) {
            return MarkDelete(prdid);
        }
    };
}]);

ProductModule.service('PushSrv', ['$http', function($http) {
    var push = function() {
        return $http.post("/api/push", {},{cache:false});
    };
    return {
        push: function() {
            return push();
        }
    };
}]);

Admin.controller('DcCenterCtrl', [
    '$scope', '$location', '$mdDialog',
    function($scope, $location, $mdDialog) {
    }
]);

AdminActivityModule.controller('AdminActivityCtrl', [
    '$scope', 'ActivitySrv',
    function($scope, ActivitySrv) {
        $scope.users = [];
        $scope.paginator = {};
        $scope.criteria = {
            email : ''
        };
        $scope.SearchCriteria = function(ev) {
            if (ev.keyCode === 13) {
                ActivitySrv.setCriteria($scope.criteria).then(function(promise) {
                    var data = promise.data;
                    $scope.users = data.users;
                    $scope.paginator.lastpage = data.lastpage;
                    $scope.paginator.currentpage = data.currentpage;
                    $scope.paginator.nextpage = data.nextpage;
                    $scope.paginator.previouspage = data.previouspage;
                    $scope.criteria = data.criteria;
                });
            }
        };
        $scope.GetPage = function(page) {
            ActivitySrv.getActivity(page).then(function(promise) {
                var data = promise.data;
                $scope.users = data.users;
                $scope.paginator.lastpage = data.lastpage;
                $scope.paginator.currentpage = data.currentpage;
                $scope.paginator.nextpage = data.nextpage;
                $scope.paginator.previouspage = data.previouspage;
                $scope.criteria = data.criteria;
            });
        };
    }
]);

Admin.controller('CpmCtrl', [
    '$scope', '$location',
    function($scope, $location) {
    }
]);
Admin.controller('DeliveryTimeCtrl', [
    '$scope',
    function($scope) {
    }
]);
Admin.controller('MappingManage', [
    '$scope',
    function($scope) {
    }
]);

Admin.controller('MfgMapCtrl', [
    '$scope', '$location',
    function($scope, $location) {
    }
]);
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

Admin.controller('NscpMapCtrl', [
    '$scope', '$location',
    function($scope, $location) {
    }
]);

Admin.controller('AdminPushManage', [
    '$scope', '$location', 'PushManageSrv', '$mdDialog',
    function($scope, $location, PushManageSrv, $mdDialog) {
    }
]);

AttributeModule.controller('Attribute', [
    '$scope', '$location', 'AttributeSrv', '$mdDialog', '$http',
    function($scope, $location, AttributeSrv, $mdDialog, $http) {
    }
]);

AttributeModule.controller('AttrSpec', [
    '$scope', 'AttributeSrv',
    function($scope, AttributeSrv) {
        $scope.StartProcess = function() {
            AttributeSrv.setSpecAttr().then(function() {
                $scope.JobStarted = true;
            });
        };
    }
]);

BundleModule.controller('Bundle', [
    '$scope', '$location', 'BundleSrv',
    function($scope, $location, BundleSrv) {
    }
]);

Bridge.controller('General', [
    '$scope', 'ProductSrv',
    function($scope, ProductSrv) {
        $scope.criteria = {
            'sku' : null,
            'createdatefrom': null,
            'createdateto': null,
            'updatedatefrom': null,
            'updatedateto': null
        };
        $scope.$watch('criteria.createdatefrom', function(newValue, oldValue) {
            if (newValue !== oldValue && newValue !== null) {
                $scope.criteria.updatedatefrom = null;
                $scope.criteria.updatedateto = null;
            }
        });
        $scope.$watch('criteria.createdateto', function(newValue, oldValue) {
            if (newValue !== oldValue && newValue !== null) {
                $scope.criteria.updatedatefrom = null;
                $scope.criteria.updatedateto = null;
            }
        });
        $scope.$watch('criteria.updatedatefrom', function(newValue, oldValue) {
            if (newValue !== oldValue && newValue !== null) {
                $scope.criteria.createdatefrom = null;
                $scope.criteria.createdateto = null;
            }
        });
        $scope.$watch('criteria.updatedateto', function(newValue, oldValue) {
            if (newValue !== oldValue && newValue !== null) {
                $scope.criteria.createdatefrom = null;
                $scope.criteria.createdateto = null;
            }
        });
        $scope.SetCriteria = function() {
            ProductSrv.setCriteria(JSON.stringify($scope.criteria)).then(function(promise) {
                $scope.products = promise.data.items;
                $scope.paginator.currentpage = promise.data.currentpage;
                $scope.paginator.lastpage = promise.data.lastpage;
                $scope.paginator.previouspage = promise.data.previouspage;
                $scope.paginator.nextpage = promise.data.nextpage;
                $scope.criteria.sku = promise.data.criteria.sku?promise.data.criteria.sku:null;
                $scope.criteria.createdatefrom = promise.data.criteria.createdatefrom?new Date(promise.data.criteria.createdatefrom):null;
                $scope.criteria.createdateto = promise.data.criteria.createdateto?new Date(promise.data.criteria.createdateto):null;
                $scope.criteria.updatedatefrom = promise.data.criteria.updatedatefrom?new Date(promise.data.criteria.updatedatefrom):null;
                $scope.criteria.updatedateto = promise.data.criteria.updatedateto?new Date(promise.data.criteria.updatedateto):null;
            });
        };
        $scope.ClearCriteria = function() {
            $scope.criteria = {
                'sku' : null,
                'createdatefrom': null,
                'createdateto': null,
                'updatedatefrom': null,
                'updatedateto': null
            };
            ProductSrv.setCriteria(JSON.stringify($scope.criteria)).then(function(promise) {
                $scope.products = promise.data.items;
                $scope.paginator.currentpage = promise.data.currentpage;
                $scope.paginator.lastpage = promise.data.lastpage;
                $scope.paginator.previouspage = promise.data.previouspage;
                $scope.paginator.nextpage = promise.data.nextpage;
                $scope.criteria.sku = promise.data.criteria.sku?promise.data.criteria.sku:null;
                $scope.criteria.createdatefrom = promise.data.criteria.createdatefrom?new Date(promise.data.criteria.createdatefrom):null;
                $scope.criteria.createdateto = promise.data.criteria.createdateto?new Date(promise.data.criteria.createdateto):null;
                $scope.criteria.updatedatefrom = promise.data.criteria.updatedatefrom?new Date(promise.data.criteria.updatedatefrom):null;
                $scope.criteria.updatedateto = promise.data.criteria.updatedateto?new Date(promise.data.criteria.updatedateto):null;
            });
        };
    }
]);

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

Admin.controller('HookManage', [
    '$scope', '$location', 'HookSrv', '$mdDialog',
    function($scope, $location, HookSrv, $mdDialog) {
    }
]);

LabelModule.controller('Label', [
    '$scope', '$location', 'LabelSrv', '$mdDialog', '$http',
    function($scope, $location, LabelSrv, $mdDialog, $http) {
    }
]);

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

OrderModule.controller('Order', [
    '$scope', '$location', 'OrderSrv',
    function($scope, $location, OrderSrv) {
    }
]);

OrderModule.controller('OrderSingle', [
    '$scope', '$location', 'OrderSrv',
    function($scope, $location, OrderSrv) {
    }
]);

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

Bridge.controller('UpcFinder', [
    '$scope',
    function($scope) {
    }
]);

NavModule.directive('actionMenu', ['$compile',
    function($compile) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/action-menu.html',
            link: function(scope, element, attrs) {
            }
        };
    }
]);

AdminNavModule.directive('actionMenu', ['$compile',
    function($compile) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/action-menu.html',
            link: function(scope, element, attrs) {
            }
        };
    }
]);

AdminActivityModule.directive('activityPanel', ['$compile','ActivitySrv',
    function($compile, ActivitySrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/activity-panel.html',
            link: function(scope, element, attrs) {
                ActivitySrv.getActivity(1).then(function(promise) {
                    var data = promise.data;
                    scope.users = data.users;
                    scope.paginator.lastpage = data.lastpage;
                    scope.paginator.currentpage = data.currentpage;
                    scope.paginator.nextpage = data.nextpage;
                    scope.paginator.previouspage = data.previouspage;
                    scope.criteria = data.criteria;
                });
            }
        };
    }
]);

Admin.directive('deliverytimeBoard', ['$compile', 'DeliverytimeSrv', '$mdDialog',
    function ($compile, DeliverytimeSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/deliverytime_board.html',
            link: function (scope) {
                scope.dts = [];
                scope.newdt = {
                    mfgcode: "",
                    stockinstock: 0,
                    stockoutofstock: 0,
                    otherinstock: 0,
                    otheroutofstock: 0,
                    MinQty: 0
                };
                scope.AddMfgCodeShow = false;
                scope.GetList = function () {
                    DeliverytimeSrv.getList().then(function (promise) {
                        scope.dts = JSON.parse(promise.data);
                    });
                };
                scope.AddMfgCode = function () {
                    scope.AddMfgCodeShow = !scope.AddMfgCodeShow
                };
                scope.GetList();
                scope.Discard = function () {
                    scope.AddMfgCodeShow = !scope.AddMfgCodeShow;
                    scope.newdt = {
                        mfgcode: "",
                        stockinstock: 0,
                        stockoutofstock: 0,
                        otherinstock: 0,
                        otheroutofstock: 0,
                        MinQty: 0
                    };
                };
                scope.CreateDt = function (dtobj) {
                    DeliverytimeSrv.createDt(dtobj).then(function () {
                        scope.GetList();
                        scope.Discard();
                    });
                };
                scope.updateDt = function (dt) {
                    DeliverytimeSrv.updateDt(dt).then(function () {
                        scope.GetList();
                    });
                };
                scope.deleteDt = function (dt) {
                    DeliverytimeSrv.deleteDt(dt).then(function () {
                        scope.GetList();
                    });
                };
            }
        };
    }
]);
Admin.directive('pushManageBoard', ['$compile', 'PushManageSrv', '$mdDialog',
    function($compile, PushManageSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/push-manage-board.html',
            link: function(scope, element, attrs) {
                scope.paginator = {};
                scope.products = [];
                scope.criteria = {
                    sku: ''
                };
                PushManageSrv.getProducts(1).then(function(promise) {
                    scope.products = promise.data.items;
                    scope.paginator.currentpage = promise.data.currentpage;
                    scope.paginator.lastpage = promise.data.lastpage;
                    scope.paginator.previouspage = promise.data.previouspage;
                    scope.paginator.nextpage = promise.data.nextpage;
                    if (promise.data.criteria !== null && promise.data.criteria !== undefined) {
                        scope.criteria.sku = promise.data.criteria.sku ? promise.data.criteria.sku : null;
                    }
                    scope.paginator.GetPage = function(pagenum) {
                        PushManageSrv.getProducts(pagenum).then(function(promise) {
                            scope.products = promise.data.items;
                            scope.paginator.currentpage = promise.data.currentpage;
                            scope.paginator.lastpage = promise.data.lastpage;
                            scope.paginator.previouspage = promise.data.previouspage;
                            scope.paginator.nextpage = promise.data.nextpage;
                            if (promise.data.criteria !== null && promise.data.criteria !== undefined) {
                                scope.criteria.sku = promise.data.criteria.sku ? promise.data.criteria.sku : null;
                            }
                        });
                    };
                    scope.$watch("criteria.sku", function(NewVal, OldVal) {
                        if (scope.criteria.sku !== null && scope.criteria.sku !== undefined) {
                            scope.criteria.sku = NewVal.toUpperCase();
                        }
                    });
                    scope.ClearCriteria = function() {
                        scope.criteria.sku = '';
                        PushManageSrv.SetCriteria(scope.criteria).then(function() {
                            scope.paginator.GetPage(1);
                        });
                    };
                    scope.SetCriteria = function() {
                        PushManageSrv.SetCriteria(scope.criteria).then(function() {
                            scope.paginator.GetPage(1);
                        });
                    };
                    scope.SetPush = function() {
                        PushManageSrv.SetPush().then(function() {
                            scope.paginator.GetPage(1);
                        });
                    };
                    scope.UnsetPush = function() {
                        PushManageSrv.UnsetPush().then(function() {
                            scope.paginator.GetPage(1);
                        });
                    };
                });
            }
        };
    }
]);

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

Bridge.directive('attributesFields', ['$compile', 'PushSetSrv',
    function($compile, PushSetSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/attributes-fields.html',
            link: function(scope, element, attrs) {
                scope.attributes = [];
                scope.FullAttr = false;
                PushSetSrv.getAttributes().then(function(promise) {
                    scope.attributes = promise.data;
                });
                scope.fullAttrChange = function(fullflag) {
                    if (fullflag) {
                        for (var i = 0; i < scope.attributes.length; i++) {
                            scope.attributes[i].Push=1;
                        }
                    } else {
                        for (var ii = 0; ii < scope.attributes.length; ii++) {
                                scope.attributes[ii].Push=0;
                        }
                    }
                };
            }
        };
    }
]);

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

Bridge.directive('bundleReviewPanel', ['$compile', '$location', 'BundleSrv',
    function($compile, $location, BundleSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/bundle-panel.html',
            link: function(scope, element, attrs) {
                scope.bundles = [];
                scope.paginator = {};
                BundleSrv.getList().then(function(promise) {
                    data = JSON.parse(promise.data);
                    if (data.items !== undefined && data.items !== null) {
                        scope.bundles = data.items.items;
                        scope.paginator.currentpage = data.items.currentpage;
                        scope.paginator.lastpage = data.items.lastpage;
                        scope.paginator.previouspage = data.items.previouspage;
                        scope.paginator.nextpage = data.items.nextpage;
                    }
                    scope.paginator.GetPage =  function(pagenum) {
                        console.log(pagenum);
                        BundleSrv.getList(pagenum).then(function(promise) {
                            data = JSON.parse(promise.data);
                            if (data.items !== undefined && data.items !== null) {
                                scope.bundles = data.items.items;
                                scope.paginator.currentpage = data.items.currentpage;
                                scope.paginator.lastpage = data.items.lastpage;
                                scope.paginator.previouspage = data.items.previouspage;
                                scope.paginator.nextpage = data.items.nextpage;
                            }
                        });
                    };
                });
            }
        };
    }
]);

Admin.directive('cpmBoard', ['$compile', 'CpmSrv',
    function($compile, CpmSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/cpm-board.html',
            link: function(scope) {
                scope.cpms = [];
                scope.newmap = {
                    Brand: "",
                    maprule: 0.00
                };
                scope.NewMapShow = false;
                scope.HideAddMap = false;
                scope.AddCpmMap = function() {
                    scope.newmap = {
                        Brand: "",
                        maprule: 0.00
                    };
                    scope.NewMapShow = true;
                    scope.HideAddMap = true;
                };
                scope.Discard = function() {
                    scope.NewMapShow = false;
                    scope.HideAddMap = false;
                    scope.newmap = {
                        Brand: "",
                        maprule: 0.00
                    };
                };
                scope.GetList = function() {
                    CpmSrv.getList().then(function(promise) {
                        scope.cpms = JSON.parse(promise.data);
                        console.log(scope.cpms)
                    });
                };
                scope.GetList();
                scope.deleteRec = function(a) {
                    CpmSrv.deleteRec(a).then(function () {
                        scope.GetList();
                    });
                };
                scope.updateRec = function(r) {
                    CpmSrv.updateRec(r).then(function () {
                        scope.GetList();
                    });
                };
                scope.createMap = function(m) {
                    CpmSrv.createMap(m).then(function () {
                        scope.GetList();
                        scope.Discard();
                    });
                };
            }
        };
    }
]);

Admin.directive('dccenterBoard', ['$compile', 'DcCenterSrv', '$mdDialog',
    function($compile, DcCenterSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/dccenter-board.html',
            link: function(scope, element, attrs) {
                scope.centers = [];
                scope.newcenter = {
                    DCCenter: "",
                    LocationId: 0
                };
                scope.fault= false;
                scope.dctype = [
                    {dctype:"ghost"},
                    {dctype:"real"},
                    {dctype:"virtual"},
                    {dctype:"default"},
                ];
                scope.NewCenterShow = false;
                scope.HideAddCenter = false;
                scope.AddCenter = function() {
                    scope.newcenter = {
                        DCCenter: "",
                        LocationId: 0
                    };
                    DcCenterSrv.getMaxLoc().then(function(promise) {
                        data = JSON.parse(promise.data);
                        if (data!==null && data!==undefined) {
                            if (data.maxloc!==null && data.maxloc!==undefined) {
                                scope.newcenter.LocationId = data.maxloc+1;
                            }
                        }
                    });
                    scope.NewCenterShow = true;
                    scope.HideAddCenter = true;
                };
                scope.Discard = function() {
                    scope.NewCenterShow = false;
                    scope.HideAddCenter = false;
                    scope.newcenter = {
                        DCCenter: "",
                        LocationId: 0
                    };
                };
                scope.GetList = function() {
                    DcCenterSrv.getList().then(function(promise) {
                        data = JSON.parse(promise.data, function(k, v) {
                            if (k === 'LocationId') {
                                return parseInt(v, 10); /*parse LocationId to integer*/
                            }
                            return v;
                        });
                        scope.centers = data;
                    });
                };
                scope.GetList();
                scope.deleteCenter = function(center) {
                    DcCenterSrv.deleteCenter(center).then(function (promise) {
                        scope.GetList();
                    });
                };
                scope.updateCenter = function(center) {
                    DcCenterSrv.updateCenter(center).then(function (promise) {
                        if (promise.data.result == "fault") {
                            scope.fault= true;
                        }
                        scope.GetList();
                    });
                };
                scope.createCenter = function(center) {
                    DcCenterSrv.createCenter(center).then(function (promise) {
                        scope.GetList();
                        scope.Discard();
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
            }
        };
    }
]);

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

Admin.directive('hookApplyBoard', ['$compile', 'HookSrv', '$mdDialog',
    function($compile, HookSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/hook-apply-board.html',
            link: function(scope, element, attrs) {
                scope.hooks = [];
                scope.GetList = function() {
                    HookSrv.getActiveList().then(function(promise) {
                        data = JSON.parse(promise.data);
                        if (data.items !== undefined && data.items !== null) {
                            scope.hooks = data.items;
                        }
                    });
                };
                scope.GetList();
            }
        };
    }
]);

Admin.directive('hookBoard', ['$compile', 'HookSrv', '$mdDialog',
    function($compile, HookSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/hook-board.html',
            link: function(scope, element, attrs) {
                scope.hooks = [];
                scope.HideAddHook = false;
                scope.StatusChanged = false;
                scope.newhook = {
                    Name: "",
                    ProcName: "",
                    Type: "procedure",
                    Active: false,
                    Description: "",
                    Nice: 0
                };
                scope.hookTypes = [
                    'procedure',
                    'script',
                ];
                scope.AddHook = function() {
                    scope.NewHookShow = true;
                    scope.HideAddHook = true;
                };
                scope.Discard = function() {
                    scope.NewHookShow = false;
                    scope.HideAddHook = false;
                    scope.newhook = {
                        Name: "",
                        ProcName: "",
                        Type: "procedure",
                        Active: false,
                        Description: ""
                    };
                };
                scope.GetList = function() {
                    HookSrv.getList().then(function(promise) {
                        data = JSON.parse(promise.data, function(k, v) {
                            if (k === 'Nice') {
                                return parseInt(v,10);/*parse Nice to integer*/
                            }
                            return v;
                        });
                        if (data.items !== undefined && data.items !== null) {
                            scope.hooks = data.items;
                        }
                    });
                };
                scope.GetList();
                scope.SaveHook = function(newhook) {
                    HookSrv.CreateHook(newhook).then(function(promise) {
                        var res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            scope.GetList();
                            scope.Discard();
                        } else {
                            scope.alertError({
                                message: res.message
                            });
                        }
                    });
                };
                scope.StoreHook = function(newhook) {
                    HookSrv.StoreHook(newhook).then(function(promise) {
                        var res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            scope.GetList();
                            scope.Discard();
                        } else {
                            scope.alertError({
                                message: res.message
                            });
                        }
                    });
                };
                scope.Delete = function(hook) {
                    HookSrv.Delete(hook).then(function(promise) {
                        var res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            scope.GetList();
                        } else {
                            scope.alertError({
                                message: res.message
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
                scope.ChangeStatus = function(hook) {
                    //scope.StatusChanged = false;
                    HookSrv.ChangeStatus(hook).then(function(promise) {
                        var res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            hook.StatusChanged = true;
                        } else {
                            console.log(hook);
                            if (hook.Active === '0') {
                                hook.Active = '1';
                            } else {
                                hook.Active = '0';
                            }
                            console.log(hook);
                        }
                    });
                };
            }
        };
    }
]);

Bridge.directive('labelBoard', ['$compile', 'LabelSrv', '$mdDialog',
    function($compile, LabelSrv, $mdDialog) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/label-board.html',
            link: function(scope, element, attrs) {
                scope.labels = [];
                scope.newlabel = {
                    name : ""
                };
                scope.NewLblShow = false;
                scope.addProcess = false;
                scope.AddLbl = function () {
                    scope.NewLblShow = true;
                };
                scope.Discard = function () {
                    scope.NewLblShow = false;
                    scope.newlabel = {
                        name : ""
                    };
                };
                scope.SaveLbl = function (newlabel) {
                    scope.addProcess = true;
                    LabelSrv.AddLbl(newlabel).then(function(promise) {
                        res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            scope.addProcess = false;
                            scope.NewLblShow = false;
                            scope.newlabel = {
                                name : ""
                            };
                            LabelSrv.getList().then(function(promise) {
                                data = JSON.parse(promise.data);
                                if (data.items !== undefined && data.items !== null) {
                                    scope.labels = data.items;
                                }
                            });
                            scope.alertSuccess({
                                message: 'New Label created'
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
                LabelSrv.getList().then(function(promise) {
                    data = JSON.parse(promise.data);
                    if (data.items !== undefined && data.items !== null) {
                        scope.labels = data.items;
                    }
                });
                scope.DelLbl = function(lbl) {
                    var data = {
                        id: lbl.id
                    };
                    LabelSrv.delLbl(data).then(function(promise) {
                        res = JSON.parse(promise.data);
                        if (res.result !== null && res.result !== undefined && res.result === 'success') {
                            for (var i = 0; i < scope.labels.length; i++) {
                                if (scope.labels[i].id === lbl.id ) {
                                    scope.labels.splice(i,1);
                                }
                            }
                            scope.alertSuccess({
                                message: 'Label deleted'
                            });
                        } else {
                            scope.alertError({
                                message: 'Got error...'
                            });
                        }
                    });
                };
            }
        };
    }
]);

Admin.directive('mappingTable', ['$compile', 'MappingSrv',
    function($compile, MappingSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/mapping_table.html',
            link: function(scope, element, attrs) {
                scope.items = [];
                MappingSrv.getList().then(function(promise){
                    scope.items = promise.data;
                });
                scope.ChangeTrigger = function(item) {
                    if (item.dirty === null && item.dirty === undefined) {
                        item.dirty = false;
                    }
                    item.dirty = true;
                };
                scope.Save = function(item) {
                    MappingSrv.Save(item).then(function(promise){
                        scope.items = promise.data;
                    });
                };
            }
        }
    }
]);

Admin.directive('mfgmapBoard', ['$compile', 'MfgMapSrv',
    function($compile, MfgMapSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/mfgmap-board.html',
            link: function(scope, element, attrs) {
                scope.mfgmaps = [];
                scope.newmfgmap = {
                    oldmfg: "",
                    newmfg: ""
                };
                scope.NewMfgMapShow = false;
                scope.HideAddMfgMap = false;
                scope.AddMfgMap = function() {
                    scope.newcenter = {
                        oldmfg: "",
                        newmfg: ""
                    };
                    scope.NewMfgMapShow = true;
                    scope.HideAddMfgMap = true;
                };
                scope.Discard = function() {
                    scope.NewMfgMapShow = false;
                    scope.HideAddMfgMap = false;
                    scope.newmfgmap = {
                        oldmfg: "",
                        newmfg: ""
                    };
                };
                scope.GetList = function() {
                    MfgMapSrv.getList().then(function(promise) {
                        scope.mfgmaps = JSON.parse(promise.data);
                    });
                };
                scope.GetList();
                scope.deleteRec = function(a) {
                    MfgMapSrv.deleteRec(a).then(function () {
                        scope.GetList();
                    });
                };
                scope.updateRec = function(r) {
                    MfgMapSrv.updateRec(r).then(function () {
                        scope.GetList();
                    });
                };
                scope.createMfgMap = function(m) {
                    MfgMapSrv.createMfgMap(m).then(function () {
                        scope.GetList();
                        scope.Discard();
                    });
                };
            }
        };
    }
]);

Admin.directive('nscpmapBoard', ['$compile', 'NscpMapSrv',
    function($compile, NscpMapSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/nscpmap-board.html',
            link: function(scope, element, attrs) {
                scope.nscpmaps = [];
                scope.newmap = {
                    Sku: "",
                    Price: 0.00
                };
                scope.NewMapShow = false;
                scope.HideAddMap = false;
                scope.AddNscpMap = function() {
                    scope.nemap = {
                        Sku: "",
                        Price: 0.00
                    };
                    scope.NewMapShow = true;
                    scope.HideAddMap = true;
                };
                scope.Discard = function() {
                    scope.NewMapShow = false;
                    scope.HideAddMap = false;
                    scope.newmap = {
                        Sku: "",
                        Price: 0.00
                    };
                };
                scope.GetList = function() {
                    NscpMapSrv.getList().then(function(promise) {
                        scope.nscpmaps = JSON.parse(promise.data);
                    });
                };
                scope.GetList();
                scope.deleteRec = function(a) {
                    NscpMapSrv.deleteRec(a).then(function () {
                        scope.GetList();
                    });
                };
                scope.updateRec = function(r) {
                    NscpMapSrv.updateRec(r).then(function () {
                        scope.GetList();
                    });
                };
                scope.createMap = function(m) {
                    NscpMapSrv.createMap(m).then(function () {
                        scope.GetList();
                        scope.Discard();
                    });
                };
            }
        };
    }
]);

Bridge.directive('orderPanel', ['$compile', '$location', 'OrderSrv',
    function($compile, $location, OrderSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/order-single-panel.html',
            link: function(scope, element, attrs) {
                scope.order = {};
                var url = $location.absUrl().split("/");
                var action = url.pop();
                var prefix = url.pop();
                var target = prefix + action;
                var parms_ar = $location.absUrl().split("?");
                var orderId = '';
                if (parms_ar.length === 2 && parms_ar[1].length !== 0) {
                    var parms = parms_ar.pop();
                    var id_proto = parms.split("=");
                    if (id_proto.length === 2 && id_proto[0] === 'orderId') {
                        orderId = id_proto.pop();
                    }
                }
                OrderSrv.getSingle(orderId).then(function(promise) {
                    scope.order = promise.data;
                });
            }
        };
    }
]);

Bridge.directive('ordersReviewPanel', ['$compile', '$location', 'OrderSrv',
    function($compile, $location, OrderSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/orders-panel.html',
            link: function(scope, element, attrs) {
                scope.orders = [];
                scope.paginator = {};
                scope.criteria = {
                    SiteOrderID : "",
                    OrderDateFrom : null,
                    OrderDateTo : null
                };
                scope.DateFromChange = function(dateFrom) {
                    console.log(dateFrom.toISOString().split("T").shift());
                };
                scope.DateToChange = function(dateTo) {
                    console.log(dateTo.toISOString().split("T").shift());
                };
                scope.OrderIDChange = function(orderID) {
                    console.log(orderID);
                };
                scope.setData = function(data) {
                    if (data.items !== undefined && data.items !== null) {
                        scope.orders = data.items.items;
                        scope.criteria.SiteOrderID = data.items.criteria.SiteOrderID;
                        if (data.items.criteria.OrderDateFrom !== null && data.items.criteria.OrderDateFrom !== undefined) {
                            scope.criteria.OrderDateFrom = new Date(data.items.criteria.OrderDateFrom);
                        } else {
                            scope.criteria.OrderDateFrom = null;
                        }
                        if (data.items.criteria.OrderDateTo !== null && data.items.criteria.OrderDateTo !== undefined) {
                            scope.criteria.OrderDateTo = new Date(data.items.criteria.OrderDateTo);
                        } else {
                            scope.criteria.OrderDateTo = null;
                        }
                        scope.paginator.currentpage = data.items.currentpage;
                        scope.paginator.lastpage = data.items.lastpage;
                        scope.paginator.previouspage = data.items.previouspage;
                        scope.paginator.nextpage = data.items.nextpage;
                    }
                };
                scope.SetCriteria = function(criteria) {
                    var newcriteria = {
                        SiteOrderID : '',
                        OrderDateFrom : null,
                        OrderDateTo : null
                    };
                    if (scope.criteria.SiteOrderID !== null && scope.criteria.SiteOrderID !== undefined) {
                        newcriteria.SiteOrderID = scope.criteria.SiteOrderID;
                    }
                    if (scope.criteria.OrderDateFrom !== null && scope.criteria.OrderDateFrom !== undefined) {
                        newcriteria.OrderDateFrom = scope.criteria.OrderDateFrom.toISOString().split("T").shift();
                    }
                    if (scope.criteria.OrderDateTo !== null && scope.criteria.OrderDateTo !== undefined) {
                        newcriteria.OrderDateTo = scope.criteria.OrderDateTo.toISOString().split("T").shift();
                    }
                    OrderSrv.setCriteria(newcriteria).then(function(promise) {
                        OrderSrv.getList().then(function(promise) {
                            scope.setData(promise.data);
                        });
                    });
                };
                scope.ResetCriteria = function() {
                    OrderSrv.resetCriteria().then(function(promise) {
                        OrderSrv.getList().then(function(promise) {
                            scope.setData(promise.data);
                        });
                    });
                };
                OrderSrv.getList().then(function(promise) {
                    scope.setData(promise.data);
                    scope.paginator.GetPage =  function(pagenum) {
                        OrderSrv.getList(pagenum).then(function(promise) {
                            scope.setData(promise.data);
                        });
                    };
                });
            }
        };
    }
]);

Bridge.directive('productFields', ['$compile', 'PushSetSrv',
    function($compile, PushSetSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/product-fields.html',
            link: function(scope, element, attrs) {
                scope.products = [];
                scope.FullProduct = false;
                PushSetSrv.getProducts().then(function(promise) {
                    scope.products = promise.data;
                });
                scope.fChange = function(product) {
                    if (product.Name === 'Sku') {
                        product.Push = 1;
                    }
                };
                scope.fullProductChange = function(fullflag) {
                    if (fullflag) {
                        for (var i = 0; i < scope.products.length; i++) {
                            scope.products[i].Push=1;
                        }
                    } else {
                        for (var ii = 0; ii < scope.products.length; ii++) {
                            if (scope.products[ii].Name === 'Sku') {
                                scope.products[ii].Push=1;
                            } else {
                                scope.products[ii].Push=0;
                            }
                        }
                    }
                };
            }
        };
    }
]);

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

Bridge.directive('productReviewPanel', ['$compile',
    function($compile) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/product-review-panel.html',
            link: function(scope, element, attrs) {
            }
        };
    }
]);

Bridge.directive('productSearchPanel', ['$compile',
    function($compile) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/product-search-panel.html',
            link: function(scope, element, attrs) {
            }
        };
    }
]);

Bridge.directive('productTable', ['$compile', 'ProductSrv',
    function($compile, ProductSrv) {
        return {
            restrict: "E",
            scope: '=',
            transclude: true,
            templateUrl: '/partials/product-table.html',
            link: function(scope, element, attrs) {
                scope.paginator = {};
                scope.products = [];
                ProductSrv.getProducts(1).then(function(promise) {
                    scope.products = promise.data.items;
                    scope.paginator.currentpage = promise.data.currentpage;
                    scope.paginator.lastpage = promise.data.lastpage;
                    scope.paginator.previouspage = promise.data.previouspage;
                    scope.paginator.nextpage = promise.data.nextpage;
                    if (promise.data.criteria !== null && promise.data.criteria !== undefined) {
                        scope.criteria.sku = promise.data.criteria.sku?promise.data.criteria.sku:null;
                        scope.criteria.createdatefrom = promise.data.criteria.createdatefrom?new Date(promise.data.criteria.createdatefrom):null;
                        scope.criteria.createdateto = promise.data.criteria.createdateto?new Date(promise.data.criteria.createdateto):null;
                        scope.criteria.updatedatefrom = promise.data.criteria.updatedatefrom?new Date(promise.data.criteria.updatedatefrom):null;
                        scope.criteria.updatedateto = promise.data.criteria.updatedateto?new Date(promise.data.criteria.updatedateto):null;
                    }
                    scope.paginator.GetPage =  function(pagenum) {
                        ProductSrv.getProducts(pagenum).then(function(promise) {
                            scope.products = promise.data.items;
                            scope.paginator.currentpage = promise.data.currentpage;
                            scope.paginator.lastpage = promise.data.lastpage;
                            scope.paginator.previouspage = promise.data.previouspage;
                            scope.paginator.nextpage = promise.data.nextpage;
                            if (promise.data.criteria !== null && promise.data.criteria !== undefined) {
                                scope.criteria.sku = promise.data.criteria.sku?promise.data.criteria.sku:null;
                                scope.criteria.createdatefrom = promise.data.criteria.createdatefrom?new Date(promise.data.criteria.createdatefrom):null;
                                scope.criteria.createdateto = promise.data.criteria.createdateto?new Date(promise.data.criteria.createdateto):null;
                                scope.criteria.updatedatefrom = promise.data.criteria.updatedatefrom?new Date(promise.data.criteria.updatedatefrom):null;
                                scope.criteria.updatedateto = promise.data.criteria.updatedateto?new Date(promise.data.criteria.updatedateto):null;
                            }
                        });
                    };
                });
            }
        };
    }
]);