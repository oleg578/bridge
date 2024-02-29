<?php

namespace Apps\Api;

use Phalcon\Mvc\ModuleDefinitionInterface;
use Phalcon\Mvc\View;

class ApiModule implements ModuleDefinitionInterface
{
    public function registerAutoloaders()
    {
    }

    public function registerServices($di)
    {
        /*
         * Views
         */
        $di->set('view', function () {
            $view = new View();
            $view->setViewsDir(__DIR__.DS.'Views'.DS);
            $view->registerEngines(['.volt' => function ($view, $di) {
                $volt = new \Phalcon\Mvc\View\Engine\Volt($view, $di);
                $volt->setOptions([
                    'compiledPath' => dirname(__DIR__).DS.'Var'.DS.'Compiledviews'.DS.'Api'.DS,
                    'compileAlways' => $di->getConfig()->phalcon->developMode,
                ]);

                return $volt;
            },
            ]);

            return $view;
        });

//ACL
        $di->setShared('acl', function () {
            $acl = new \Phalcon\Acl\Adapter\Memory();
            $acl->setDefaultAction(\Phalcon\Acl::DENY);
            //set role
        $roles = array(
            'guest' => new \Phalcon\Acl\Role('guest'),
            'user' => new \Phalcon\Acl\Role('user'),
            'manager' => new \Phalcon\Acl\Role('manager'),
            'admin' => new \Phalcon\Acl\Role('admin'),
            'superadmin' => new \Phalcon\Acl\Role('superadmin'),
        );

        foreach ($roles as $role) {
            $acl->addRole($role);
        }
        $publicrsc = [
            'Admin' => ['block'],
        ];
        $closedrsc = [
            'Image' => ['Verifyurl'],
            'Upc' => ['getmfgcodes', 'getupc', 'setcriteria', 'resetcriteria', 'freeupc', 'saveupc'],
        ];

        $adminrsc = [
            'Admin' => ['setactivitycriteria', 'getactivity'],
            'Product' => ['getProducts', 'getSingle', 'setCriteria', 'update', 'markdelete'],
            'ProductManage' => ['getProducts', 'setCriteria', 'setpush', 'unsetpush'],
            'Attribute' => ['list', 'gc', 'delete', 'add', 'setattr', 'setblockattr'],
            'Label' => ['list', 'delete', 'add'],
            'Bundle' => ['list'],
            'Order' => ['list', 'setcriteria', 'resetcriteria', 'get'],
            'Actionlog' => ['skufilter'],
            'Push' => ['push'],
            'Hook' => ['list', 'create', 'changestatus', 'delete', 'apply'],
            'PushSrv' => ['getproducts', 'getattrs', 'save'],
            'DcCenter' => ['list', 'create', 'update', 'delete', 'getmaxloc'],
            'Mfgmap' => ['list', 'create', 'update', 'delete'],
            'Nscpmap' => ['list', 'create', 'update', 'delete'],
            'Cpm' => ['list', 'create', 'update', 'delete'],
            'Deliverytime' => ['list', 'create', 'update', 'delete'],
            'Mapping' => ['list', 'save'],
        ];

        foreach ($publicrsc as $resource => $actions) {
            $acl->addResource(new \Phalcon\Acl\Resource($resource), $actions);
        }

        foreach ($closedrsc as $resource => $actions) {
            $acl->addResource(new \Phalcon\Acl\Resource($resource), $actions);
        }

        foreach ($adminrsc as $resource => $actions) {
            $acl->addResource(new \Phalcon\Acl\Resource($resource), $actions);
        }
        foreach ($roles as $role) {
            foreach ($publicrsc as $resource => $actions) {
                $acl->allow($role->getName(), $resource, $actions);
            }
        }
        //Grant access to closedrsc
        foreach ($closedrsc as $resource => $actions) {
            foreach ($actions as $action) {
                $acl->allow('superadmin', $resource, '*');
                $acl->allow('admin', $resource, '*');
                $acl->allow('manager', $resource, '*');
            }
        }
        //Grant access to admin
        foreach ($adminrsc as $resource => $actions) {
            foreach ($actions as $action) {
                $acl->allow('superadmin', $resource, '*');
                $acl->allow('admin', $resource, '*');
            }
        }

            return $acl;
        });
//end ACL
    }
}
