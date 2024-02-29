<?php

namespace Apps\Api\Controllers;

use Apps\Models\Useractivity;
/**
 * Description of Admin
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/admin")
 */
class AdminController extends ControllerBase
{
    /**
     * @Post("/activity/setcriteria")
     */
    public function setactivitycriteriaAction()
    {
        $criteria = $this->request->getJsonRawBody();
        $this->content = ['criteria' => json_encode($criteria)];
        if (!$criteria) {
            $criteria = new \stdClass();
            $criteria->email = '';
        }
        $this->criteria = $criteria;
        $this->session->set("search_activity_criteria", serialize($this->criteria));
        $this->dispatcher->forward([
            "controller" => "Admin",
            "action" => "getactivity",
        ]);
    }

    /**
     * @Get("/activity/get{pagenum:(/page/[0-9]+)?}")
     * @param null $pagenum
     */
    public function getactivityAction($pagenum = null)
    {
        $criteria = $this->session->get("search_activity_criteria");
        if ($criteria) {
            $this->criteria = unserialize($criteria);
        } else {
            $criteria = new \stdClass();
            $criteria->email = '';
            $this->criteria = $criteria;
        }
        /**
         * set conditions
         */
        if (isset($this->criteria->email) && $this->criteria->email) {
            $email_condition = "email='".$this->criteria->email."'";
        } else {
            $email_condition = "";
        }
        $conditions = $email_condition;
        $page_length = 30;
        is_string($pagenum) ?: $pagenum = "/page/1";
        $current_page = (int) substr($pagenum, 6);
        $offset = ($current_page - 1) * $page_length;
        $users = Useractivity::find([
            'conditions' => $conditions,
            'limit' => [
                'number' => $page_length,
                'offset' => $offset,
            ],
            'columns' => "email, updated_at",
            'order' => "updated_at DESC",
        ]);

        $users_count = Useractivity::count([
            'conditions' => $conditions,
            ]);

        $previous_page = ($current_page > 1) ? $current_page - 1 : $current_page;
        $last_page = (int) ceil($users_count / $page_length);
        $next_page = min([$current_page + 1, $last_page]);
        $out = [];
        $out['users'] = $users->toArray();
        $out['currentpage'] = $current_page;
        $out['previouspage'] = $previous_page;
        $out['nextpage'] = $next_page;
        $out['lastpage'] = $last_page;
        $out['criteria'] = $this->obj2array($this->criteria);
        $this->content = $out;
    }

    /**
     * @Get("/block")
     */
    public function blockAction()
    {
        return $this->content = ['result' => 'fault'];
    }

    /**
     * obj2array
     * @param        $obj \stdClass
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
}
