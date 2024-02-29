<?php
/**
 * Class and Function List:
 * Function list:
 * - _registerServices().
 */
trait Services
{
    protected function _registerServices()
    {
        $di = new \Phalcon\DI\FactoryDefault();

        /*
         * Register config
         */
        $di->set('config', function () {
            $config = new \Phalcon\Config\Adapter\Json(dirname(__DIR__).DS.'Config'.DS.'config.json');

            return $config;
        });

        /*
         * Register hooks
         */
        $di->set('hook', function () {
            $hook = new \Phalcon\Config\Adapter\Json(dirname(__DIR__).DS.'Config'.DS.'hooks.json');

            return $hook;
        });

        $di->setShared('filter', function () {
            $filter = new \Phalcon\Filter();

            $filter->add('num', function ($value) {
                return preg_replace('/[^0-9]/', '', $value);
            });

            return $filter;
        });

        /*
         * Register annotations
         */
        $di->set('annotations', function () {
            return new \Phalcon\Annotations\Adapter\Memory();
        });

        $di->setShared('response', function () {
            return new Phalcon\Http\Response();
        });

        /*
         * Register routes
         */
        $di->set('router', function () {
            $router = new \Phalcon\Mvc\Router\Annotations(\FALSE);
            $router->removeExtraSlashes(\TRUE);
            $router->setUriSource(\Phalcon\Mvc\Router\Annotations::URI_SOURCE_SERVER_REQUEST_URI);
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Admin',
                '/api/admin'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Product',
                '/api/product'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\ProductManage',
                '/api/product/manage'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Image',
                '/api/image'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Attribute',
                '/api/attribute'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Label',
                '/api/label'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Actionlog',
                '/api/actionlog'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Push',
                '/api/push'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Bundle',
                '/api/bundle'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Order',
                '/api/order'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Hook',
                '/api/hook'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\PushSrv',
                '/api/pushsrv'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\DcCenter',
                '/api/dccenter'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Deliverytime',
                '/api/deliverytime'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Mfgmap',
                '/api/mfgmap'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Nscpmap',
                '/api/nscpmap'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Cpm',
                '/api/cpm'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Upc',
                '/api/upc'
            );
            $router->addModuleResource(
                'api',
                '\\Apps\\Api\\Controllers\\Mapping',
                '/api/mapping'
            );
            $router->addModuleResource(
                'frontend',
                '\\Apps\\Frontend\\Controllers\\Index',
                '/'
            );
            $router->addModuleResource(
                'frontend',
                '\\Apps\\Frontend\\Controllers\\Product',
                '/product'
            );
            $router->addModuleResource(
                'frontend',
                '\\Apps\\Frontend\\Controllers\\Bundle',
                '/bundle'
            );
            $router->addModuleResource(
                'frontend',
                '\\Apps\\Frontend\\Controllers\\Order',
                '/order'
            );
            $router->addModuleResource(
                'frontend',
                '\\Apps\\Frontend\\Controllers\\Image',
                '/image'
            );
            $router->addModuleResource(
                'frontend',
                '\\Apps\\Frontend\\Controllers\\Attribute',
                '/attribute'
            );
            $router->addModuleResource(
                'frontend',
                '\\Apps\\Frontend\\Controllers\\Label',
                '/label'
            );
            $router->addModuleResource(
                'frontend',
                '\\Apps\\Frontend\\Controllers\\Report',
                '/report'
            );
            $router->addModuleResource(
                'frontend',
                '\\Apps\\Frontend\\Controllers\\Session',
                '/session'
            );
            $router->addModuleResource(
                'frontend',
                '\\Apps\\Frontend\\Controllers\\Upc',
                '/upc'
            );
            $router->addModuleResource(
                    'frontend',
                    '\\Apps\\Frontend\\Controllers\\Warehouse',
                    '/warehouse'
                );
            $router->addModuleResource(
                'backend',
                '\\Apps\\Backend\\Controllers\\Index',
                '/admin'
            );
            $router->addModuleResource(
                'backend',
                '\\Apps\\Backend\\Controllers\\Hooks',
                '/admin/hooks'
            );
            $router->addModuleResource(
                'backend',
                '\\Apps\\Backend\\Controllers\\Push',
                '/admin/push'
            );
            $router->addModuleResource(
                'backend',
                '\\Apps\\Backend\\Controllers\\DcCenter',
                '/admin/dccenter'
            );
            $router->addModuleResource(
                'backend',
                '\\Apps\\Backend\\Controllers\\Nscpmap',
                '/admin/nscpmap'
            );
            $router->addModuleResource(
                'backend',
                '\\Apps\\Backend\\Controllers\\Cpm',
                '/admin/cpm'
            );
            $router->addModuleResource(
                'backend',
                '\\Apps\\Backend\\Controllers\\Mfgmap',
                '/admin/mfgmap'
            );
            $router->addModuleResource(
                'backend',
                '\\Apps\\Backend\\Controllers\\Session',
                '/admin/session'
            );
            $router->addModuleResource(
                'backend',
                '\\Apps\\Backend\\Controllers\\Mapping',
                '/admin/mapping'
            );
            $router->addModuleResource(
                'backend',
                '\\Apps\\Backend\\Controllers\\DeliveryTime',
                '/admin/deliverytime'
            );
            $router->setDefaultModule('frontend');
            $router->notFound(['controller' => 'index', 'action' => 'page404']);

            return $router;
        });

        /*
         * set URL
         */
        $di->setShared('url', function () use ($di) {
            $url = new \Phalcon\Mvc\Url();
            $url->setBaseUri($di->getConfig()->phalcon->baseuri);

            return $url;
        });

        /*
         * flash service
         */
        $di->setShared('flash', function () {
            $flash = new \Phalcon\Flash\Direct([
                'error' => 'alert alert-error',
                'success' => 'alert alert-success',
                'notice' => 'alert alert-notice',
                'warning' => 'alert alert-warning',
            ]);

            return $flash;
        });

        /*
         * flash service session
         */
        $di->setShared('flashsession', function () {
            $flashsession = new \Phalcon\Flash\Session([
                'error' => 'alert alert-danger',
                'success' => 'alert alert-success',
                'notice' => 'alert alert-info',
                'warning' => 'alert alert-warning',
            ]);

            return $flashsession;
        });

        /*
         * Register Coockie Service
         */
        $di->set('cookies', function () {
            $cookies = new \Phalcon\Http\Response\Cookies();
            $cookies->useEncryption(true);

            return $cookies;
        });

        /*
         * Register session
         */
        $di->setShared('session', function () {
            $session = new \Phalcon\Session\Adapter\Files();
            $session->setoptions(['uniqueId' => 'bridge_']);
            $session->start();

            return $session;
        });

        /*
         * Crypt Service
         */
        $di->set('crypt', function () use ($di) {
            $crypt = new \Phalcon\Crypt();
            $crypt->setMode(MCRYPT_MODE_CFB);
            $crypt->setKey($di->getConfig()->phalcon->secretkey);

            return $crypt;
        });

        $di->setShared('security', function () {
            $security = new Phalcon\Security();
            $security->setWorkFactor(12);

            return $security;
        });

        /*
         * set database connection bridge
         */
        $di->setShared('db', function () use ($di) {
            $connection = new \Phalcon\Db\Adapter\Pdo\Mysql(
                $di->getConfig()->maindb->toArray()
            );

            return $connection;
        });

        /*
         * set database invent (user)  connection
         */
        $di->setShared('db_user', function () use ($di) {
            $connection = new \Phalcon\Db\Adapter\Pdo\Mysql(
                $di->getConfig()->dbuser->toArray()
            );

            return $connection;
        });

        /*
         * Model metadata
         */
        $di->setShared('modelsMetadata', function () {
            $metaData = new \Phalcon\Mvc\Model\MetaData\Memory(['prefix' => 'bridge']);
            $metaData->setStrategy(new \Phalcon\Mvc\Model\MetaData\Strategy\Annotations());

            return $metaData;
        });

        $di->setShared('dispatcher', function () use ($di) {

            //Obtain the standard eventsManager from the DI
            $eventsManager = $di->getShared('eventsManager');

            //Instantiate the Security plugin
            $security = new \Apps\Plugins\Security($di);

            //Listen for events produced in the dispatcher using the Security plugin
            $eventsManager->attach('dispatch', $security);

            $dispatcher = new \Phalcon\Mvc\Dispatcher();

            //Bind the EventsManager to the Dispatcher
            $dispatcher->setEventsManager($eventsManager);
            $dispatcher->setDefaultNamespace('\\Apps\\Frontend\\Controllers\\');

            return $dispatcher;
        });

        /*
         * end DI
         */

        $this->setDI($di);
    }
}
