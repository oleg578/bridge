<?php

namespace Apps\Backend;

use Phalcon\Mvc\ModuleDefinitionInterface;
use Phalcon\Mvc\View;

class BackendModule implements ModuleDefinitionInterface
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
                    'compiledPath' => dirname(__DIR__).DS.'Var'.DS.'Compiledviews'.DS.'Backend'.DS,
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
                'Session' => ['login'],
                'Index' => ['page404'],
            ];
            $closedrsc = [
                'Index' => ['index', 'activity', 'history'],
                'Session' => ['logout'],
                'Hooks' => ['manage', 'apply'],
                'Push' => ['manage'],
                'DcCenter' => ['manage'],
                'Mfgmap' => ['manage'],
                'Nscpmap' => ['manage'],
                'Cpm' => ['manage'],
                'Mapping' => ['manage'],
                'DeliveryTime' => ['manage'],
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
                }
            }

            return $acl;
        });
//end ACL
    }
}
