<?php

namespace Apps\Plugins;

use Apps\Models\User;
use Phalcon\Events\Event;
use Phalcon\Mvc\Dispatcher;
use Phalcon\Mvc\User\Plugin;

/**
 * Security plugin.
 */
class Security extends Plugin
{
    protected $role = 'guest';

    public function beforeExecuteRoute(Event $event, Dispatcher $dispatcher)
    {
        $user_from_session = $this->session->get('auth');

        if ($user_from_session) {
            if ($user_from_session) {
                $user_email = $user_from_session;
            }
            $user = User::findFirst([
                'conditions' => 'email = :email:',
                'bind' => ['email' => $user_email],
            ]);

            if ($user && !$user->isblocked) {
                if ($user_from_session == $user->email) {
                    $this->role = $user->role;
                    $this->session->set('user', $user->serialize());
                } elseif ($user_from_cookie == $user->email && !$user->isblocked) {
                    $this->session->set('auth', $user->email);
                    $this->session->set('user', $user->serialize());
                    $this->role = $user->role;
                }
            }
        }
        $rsc = $dispatcher->getControllerName();
        $action = $dispatcher->getActionName();
        /*
         * simulate success auth
         */
        //$access = true;
        /*
         * really determine access
         */
        $access = $this->acl->isAllowed($this->role, $rsc, $action);
        if (!$access) {
            if ($dispatcher->getActionName() != 'page404') {
                /*
                echo "Module<br>";
                var_dump($dispatcher->getModuleName());
                echo "Controller<br>";
                var_dump($dispatcher->getControllerName());
                echo "Action<br>";
                var_dump($dispatcher->getActionName());
                echo "ACL<br>";
                var_dump($this->role, $rsc, $action, $access);
                die;
                */
                //$this->response->redirect("session/login");
                if ($dispatcher->getModuleName() == 'api' && $dispatcher->getActionName() != 'block') {
                    $this->dispatcher->forward([
                        'controller' => 'Admin',
                        'action' => 'block',
                    ]);

                    return false;
                }
                if ($dispatcher->getModuleName() == 'backend' && $dispatcher->getActionName() != 'login') {
                    $this->dispatcher->forward([
                        'controller' => 'Session',
                        'action' => 'login',
                    ]);

                    return false;
                }
                if ($rsc !== 'Session') {
                    $this->dispatcher->forward(array(
                        'controller' => 'Session',
                        'action' => 'login',
                    ));

                    return false;
                }
            } else {
                return true;
            }

            return false;
        }
    } //beforeExecuteRoute
}
