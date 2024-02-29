<?php

namespace Apps\Api\Controllers;

use Apps\Models\User;
use Apps\Models\HistoryLog;
use Apps\Models\Useractivity;
/**
 * Description of ControllerBase
 *
 * @author Oleh Nahornyi
 */
class ControllerBase extends \Phalcon\Mvc\Controller
{
    protected $user;
    protected $content;
    protected $criteria;

    public function onConstruct()
    {
        $this->view->disable();
        $this->response->setContentType('application/json', 'utf-8');
    }

    /**
     * beforeExecuteRoute
     * @param Phalcon\Mvc\Dispatcher $dispatcher
     * @return
     */
    public function beforeExecuteRoute($dispatcher)
    {
        $user_from_session = $this->session->get("auth");
        $user_serialized = $this->session->get('user');
        if ($user_serialized) {
            $this->user = new User();
            $this->user->assign(unserialize($user_serialized));
            $user_email = is_a($this->user, 'Apps\Models\User') ? $this->user->email : '';
            $user_nick = is_a($this->user, 'Apps\Models\User') ? $this->user->nick : '';
            $user_role = is_a($this->user, 'Apps\Models\User') ? $this->user->role : '';
        } else {
            $this->user = new User();
            $user_email = '';
            $user_nick = '';
            $user_role = 'guest';
        }
    }

    public function afterExecuteRoute()
    {
        $this->response->setJsonContent($this->content, JSON_NUMERIC_CHECK);
        $this->response->send();
    }

    /**
     * obj2array
     * @param        $obj StdClass
     * @return array
     */
    protected function obj2array($obj)
    {
        $out_array = [];
        foreach ($obj as $key => $value) {
            if (is_object($value)) {
                $out_array[$key] = $this->obj2array($value);
            } else {
                $out_array[$key] = $value;
            }
        }

        return $out_array;
    }
}//end ControllerBase
