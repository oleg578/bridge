<?php

namespace Apps\Frontend\Controllers;

/**
 * Description of IndexController.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/")
 */
class IndexController extends ControllerBase
{
    public function onConstruct()
    {
    }

    /**
     * @Get("/")
     */
    public function indexAction()
    {
    }

    /**
     * @Get("page404")
     */
    public function page404Action()
    {
        $this->response->setStatusCode(404, 'Not Found');
        $this->view->setMainView('Index/page404');
    }
}
