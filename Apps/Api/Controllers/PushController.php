<?php

namespace Apps\Api\Controllers;

/**
 * Description of Push.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/push")
 */
class PushController extends ControllerBase
{
    /**
     * @Post("/")
     */
    public function pushAction()
    {
        //TODO check another caparser processes
        $usersp = 'fxmt106luk,www-data';
        //$usersp = 'olegn,http';
        $ps_list = [];
        $ps_found = false;
        exec("ps -U $usersp -u $usersp -o command", $ps_list);
        if ($ps_list) {
            foreach ($ps_list as $ps) {
                if (stristr($ps, 'pushca')) {
                    $ps_found = true;
                }
            }
        }
        if ($ps_found == true) {
            $error = [
                'error' => 'Push is in progress now',
            ];
            //$this->response->setContentType('application/json', 'utf-8');
            //$this->response->setJsonContent($error, JSON_NUMERIC_CHECK);
            $this->content = $error;

            return;
        }
        exec($this->config->util_dir.'pusherweb >/dev/null 2>&1 &');
    }
}
