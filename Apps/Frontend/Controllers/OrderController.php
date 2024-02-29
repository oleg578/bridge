<?php

namespace Apps\Frontend\Controllers;

use Apps\Models\Order;

/**
 * Description of OrderController.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/order")
 */
class OrderController extends ControllerBase
{
    public $data_path;

    public function onConstruct()
    {
        $this->data_path = $this->config->orderdata_dir. $this->session->getId(). "/";
    }

    /**
     * @Get("/browse")
     */
    public function browseAction()
    {
    }
    /**
     * @Get("/single")
     */
    public function singleAction()
    {
    }

    /**
     * @Route("/import", methods={"POST", "GET"})
     */
    public function importAction()
    {
        $this->assets
             ->collection('footer_js')
             ->addJs('assets/js/ext/ca_orders_import.js');
    }

    /**
     * @Post("/startchunk")
     */
    public function startchunkAction()
    {
        $this->view->disable();
        if ( !@mkdir($this->config->orderdata_dir. $this->session->getId()) ) {
            $error = [
                'error' => "ERROR! Can't create work dir..."
            ];
            $this->response->setContentType('application/json', 'utf-8');
            $this->response->setJsonContent($error, JSON_NUMERIC_CHECK);
            $this->response->send();
            return;
        }
        $this->data_path = $this->config->orderdata_dir. $this->session->getId() ."/";
        // clear data/
        $data_dir = opendir($this->data_path);
        while (false !== ($fname = readdir($data_dir))) {
            if (is_dir($fname) !== true) {
                unlink($this->data_path.$fname);
            }
        }
        closedir($data_dir);
        $this->session->set('chunks', 0);
    }

    /**
     * @Post("/upload")
     */
    public function uploadAction()
    {
        $this->view->disable();
        $data = file_get_contents('php://input');
        $in_ar = explode('&d&', $data, 3);
        $chunks_qty = $in_ar[0];
        $chunks_part = $in_ar[1];
        $chunk_body = $in_ar[2];
        $data_dir = $this->data_path;
        file_put_contents($data_dir.$in_ar[1].'.bin', $in_ar[2], LOCK_EX);
        $old_chunk = $this->session->get('chunks');
        $this->session->set('chunks', ++$old_chunk);
        if ($this->session->get('chunks') == $chunks_qty) {
            $this->_makeCSV($chunks_qty);
            $this->response->setJsonContent(['state' => 'finish']);
            $this->response->send();
        }
    }
    protected function _makeCSV($parts_qty)
    {
        $data_dir = $this->data_path;
        //$counter = --$parts_qty;
        if (file_exists($data_dir.'data.csv')) {
            unlink($data_dir.'data.csv');
        }
        for ($i = 0; $i < $parts_qty; ++$i) {
            $data = file_get_contents($data_dir.'part_'.$i.'.bin');
            file_put_contents($data_dir.'data.csv', $data, FILE_APPEND);
        }
        // unlink bin files in data/
        $data_dir_op = opendir($data_dir);
        while (false !== ($fname = readdir($data_dir_op))) {
            if (is_dir($fname) !== true) {
                if (substr($fname, -3, 3) == 'bin') {
                    unlink($data_dir.$fname);
                }
            }
        }
        closedir($data_dir_op);
        $this->_process();
    }

    protected function _process()
    {
        exec($this->config->util_dir.'caorder -if '.$this->data_path.'data.csv >/dev/null 2>&1 &');
    }
}
