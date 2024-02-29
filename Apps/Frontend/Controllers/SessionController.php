<?php

namespace Apps\Frontend\Controllers;

use Apps\Models\User;
use Apps\Models\Useractivity;

/**
 * SessionController
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/session")
 */
class SessionController extends ControllerBase
{
    /**
     * [loginASction description]
     *
     * @Route("/login", methods={"POST", "GET"})
     */
    public function loginAction()
    {
        $this->view->setRenderLevel(\Phalcon\Mvc\View::LEVEL_LAYOUT);
        if ($this->request->isPost() && $this->security->checkToken()) {
            $this->view->disable();
            $user_email = $this->request->getPost("email", ["email", "striptags", "trim"]);
            $user_password = $this->request->getPost("password", ["striptags", "trim"]);
            $user = User::findFirst([
                "conditions" => "email = :email:",
                "bind" => ["email" => $user_email],
            ]);
            if ($user && !$user->isblocked) {
                if ($this->security->checkHash($user_password, $user->password)) {
                    $this->session->set('auth', $user->email);
                    $this->session->set('user', $user->serialize());
                    //store to log
                    $auth_log = new Useractivity();
                    $auth_log->email = $user->email;
                    $auth_log->create();

                    $this->response->redirect();
                } else {
                    $this->flashSession->error("Access denied");
                    $this->response->redirect('session/login');
                }
            } else {
                $this->flashSession->error("Access denied");
                $this->response->redirect('session/login');
            }
        }
    }

    /**
     * [logoutAction description]
     * @return [type] [description]
     *
     * @Get("/logout")
     */
    public function logoutAction()
    {
        $this->view->disable();
        $this->session->remove('auth');
        $this->session->remove('user');
        $this->session->destroy();
        $this->cookies->set('__urs', '',
            time() - 100000,
            '/',
            \FALSE,
            $this->config->phalcon->domain,
            \FALSE);
        $this->cookies->delete('__urs');
        $this->response->redirect();
    }
}
