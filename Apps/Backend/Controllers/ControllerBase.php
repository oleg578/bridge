<?php

namespace Apps\Backend\Controllers;

use Apps\Models\User;

/**
 * Description of ControllerBase.
 *
 * @author Oleh Nahornyi
 */
class ControllerBase extends \Phalcon\Mvc\Controller
{
    protected $user;

    public function initialize()
    {
        $this->assets
             ->collection('styles')
             ->setTargetPath('assets/css/final.css')
             ->setTargetUri('assets/css/final.css')
             ->addCss('assets/css/ext/bootstrap.min.css')
             ->addCss('assets/css/ext/angular-material.min.css')
             ->addCss('assets/css/ext/loading-bar.min.css')
             ->addCss('assets/css/styles.css');
        //->join(true)
        //->addFilter(new \Phalcon\Assets\Filters\Cssmin());
        $this->assets
             ->collection('external')
             ->addCss('https://fonts.googleapis.com/css?family=Roboto:400,700,900,400italic', false, false);

        $this->assets
             ->collection('footer_js')
             ->setTargetPath('assets/js/scripts.js')
             ->setTargetUri('assets/js/scripts.js')
             ->addJs('assets/js/ext/angular.min.js')
             ->addJs('assets/js/ext/angular-aria.min.js')
             ->addJs('assets/js/ext/angular-animate.min.js')
             ->addJs('assets/js/ext/angular-messages.min.js')
             ->addJs('assets/js/ext/angular-material.min.js')
             ->addJs('assets/js/ext/loading-bar.min.js')
             ->addJs('assets/js/application.js');
        //->join(true)
        //->addFilter(new \Phalcon\Assets\Filters\Jsmin());
    }

    /**
     * beforeExecuteRoute.
     *
     * @param Phalcon\Mvc\Dispatcher $dispatcher
     *
     * @return
     */
    public function beforeExecuteRoute($dispatcher)
    {
        $user_from_session = $this->session->get('auth');
        $user_serialized = $this->session->get('user');
        if ($user_serialized) {
            $this->user = new User();
            $this->user->assign(unserialize($user_serialized));
            $user_email = is_a($this->user, 'Apps\Models\User') ? $this->user->email : '';
            $user_nick = is_a($this->user, 'Apps\Models\User') ? $this->user->nick : '';
            $user_role = is_a($this->user, 'Apps\Models\User') ? $this->user->role : '';
            $this->view->setVars([
                'user_email' => $user_email,
                'user_nick' => $user_nick,
                'user_role' => $user_role,
            ]);
        } else {
            $this->view->setVars([
                'user_email' => '',
                'user_nick' => '',
                'user_role' => 'guest',
            ]);
        }
    } // beforeExecuteRoute
} //end ControllerBase
