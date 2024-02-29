<?php

namespace Apps\Api\Controllers;

/**
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/session")
 */
class SessionController extends ControllerBase
{
    protected $content;

    public function afterExecuteRoute()
    {
        $this->response->setJsonContent($this->content, JSON_NUMERIC_CHECK);
        $this->response->send();
    }

    /**
     * @Get("/login")
     */
    public function loginAction()
    {
        $this->content = [];
    }
}
