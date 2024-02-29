<?php

namespace Apps\Frontend;

use Phalcon\Mvc\ModuleDefinitionInterface;
use Phalcon\Mvc\View;

class FrontendModule implements ModuleDefinitionInterface
{
    public function registerAutoloaders()
    {
    }

    public function registerServices($di)
    {
        /*
         * Dispatcher
         */
        $di->getShared('dispatcher')->setDefaultNamespace('\\Apps\\Frontend\\Controllers\\');
        /*
         * Views
         */
        $di->set('view', function () {
            $eventsManager = new \Phalcon\Events\Manager();
            $eventsManager->attach('view:afterRenderView', function ($event, $view) {
                $content = $view->getContent();
                $search = array(
                    '/\>[^\S ]+/s', //strip whitespaces after tags, except space
                    '/[^\S ]+\</s', //strip whitespaces before tags, except space
                    '/(\s)+/s', // shorten multiple whitespace sequences
                    '/>(\s)+</',
                    '/\n/',
                    '/\r/',
                    '/\t/',
                );
                $replace = array(
                    '>',
                    '<',
                    '\\1',
                    '><',
                    '',
                    '',
                    '',
                );
                $content = preg_replace($search, $replace, $content);
                $view->setContent($content);
            });
            $view = new View();
            $view->setViewsDir(__DIR__.DS.'Views'.DS);
            $view->registerEngines(['.volt' => function ($view, $di) {
                $volt = new \Phalcon\Mvc\View\Engine\Volt($view, $di);
                $volt->setOptions([
                    'compiledPath' => dirname(__DIR__).DS.'Var'.DS.'Compiledviews'.DS.'Frontend'.DS,
                    'compileAlways' => $di->getConfig()->phalcon->developMode,
                ]);

                return $volt;
            },
            ]);
            $view->setEventsManager($eventsManager);

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
                'Session' => ['login', 'logout'],
                'Index' => ['page404'],
                'Warehouse' => ['warehouse'],
            ];
            $closedrsc = [
                'Index' => ['index'],
                'Product' => ['singleProduct', 'import', 'startchunk', 'upload', 'createProduct', 'pushProduct', 'pushPrepare'],
                'Image' => ['Verifyurl'],
                'Attribute' => ['manage'],
                'Label' => ['manage'],
                'Bundle' => ['import', 'startchunk', 'upload', 'browse'],
                'Order' => ['import', 'startchunk', 'upload', 'browse', 'single'],
                'Report' => [
                    'sales',
                    'salescsv',
                    'nosource',
                    'nosourcecsv',
                    'nosourcepricefile',
                    'nosourcepricefilecsv',
                    'nosourcepartsdata',
                    'nosourcepartsdatacsv',
                    'holidaysales'
                ],
                'Upc' => ['finder']
            ];
            // add resources
            foreach ($publicrsc as $resource => $actions) {
                $acl->addResource(new \Phalcon\Acl\Resource($resource), $actions);
            }
            foreach ($closedrsc as $resource => $actions) {
                $acl->addResource(new \Phalcon\Acl\Resource($resource), $actions);
            }

            //Grant access to public areas to guests
            foreach ($roles as $role) {
                foreach ($publicrsc as $resource => $actions) {
                    $acl->allow($role->getName(), $resource, $actions);
                }
            }
            //Grant access to superadmin area
            foreach ($closedrsc as $resource => $actions) {
                foreach ($actions as $action) {
                    $acl->allow('superadmin', $resource, '*');
                    $acl->allow('admin', $resource, '*');
                    $acl->allow('manager', $resource, '*');
                }
            }

            return $acl;
        });
        //end ACL
    }
}
