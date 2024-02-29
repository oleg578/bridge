<?php

namespace Apps\Backend\Controllers;

/**
 * Description of IndexController
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/admin")
 */
class IndexController extends ControllerBase
{
    /**
     * @Get("")
     */
    public function indexAction()
    {
        $this->view->disable();
        $this->response->redirect('admin/users/activity');
    }

    /**
     * @Get("/users/activity")
     */
    public function activityAction()
    {
    }

    /**
     * @Get("/page404")
     */
    public function page404Action()
    {
        $this->view->disable();
        echo '404 - page not found';
    }
}
