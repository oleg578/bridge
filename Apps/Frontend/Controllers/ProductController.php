<?php

namespace Apps\Frontend\Controllers;

use Apps\Models\Product;

/**
 * Description of ProductController.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/product")
 */
class ProductController extends ControllerBase
{
    public $data_path;

    public function onConstruct()
    {
        $this->data_path = $this->config->cadata_dir.$this->session->getId().'/';
    }

    /**
     * @Get("/")
     */
    public function singleProductAction()
    {
    }

    /**
     * @Get("/push")
     */
    public function pushProductAction()
    {
        $psfound = false;
        $cafound = false;
        exec("pgrep pushca", $ps_list);
        if ($ps_list) {
            $psfound = true;
        }
        exec("pgrep caparser", $ca_list);
        if ($ca_list) {
            $cafound = true;
        }
        $this->view->setVars([
            "psfound" => $psfound,
            "cafound" => $cafound
        ]);
    }

    /**
     * @Get("/push/prepare")
     */
    public function pushPrepareAction()
    {
    }

    /**
     * @Get("/create")
     */
    public function createProductAction()
    {
    }

    /**
     * @Route("/import", methods={"POST", "GET"})
     */
    public function importAction()
    {
        $psfound = false;
        $pushfound = false;
        $this->assets
             ->collection('footer_js')
             ->addJs('assets/js/ext/ca_import.js');
        exec("pgrep caparser", $ps_list);
        if ($ps_list) {
            $psfound = true;
        }
        exec("pgrep pushca", $push_list);
        if ($push_list) {
            $pushfound = true;
        }
        $this->view->setVars([
            "psfound" => $psfound,
            "pushfound" => $pushfound
        ]);
    }

    /**
     * @Post("/startchunk")
     */
    public function startchunkAction()
    {
        $this->view->disable();
        $ps_list = [];
        $ps_found = false;
        exec("pgrep caparser", $ps_list);
        if ($ps_list) {
            $ps_found = true;
        }
        if ($ps_found == true) {
            $error = [
                'error' => 'Now the CAPARSER is executed',
            ];
            $this->response->setContentType('application/json', 'utf-8');
            $this->response->setJsonContent($error, JSON_NUMERIC_CHECK);
            $this->response->send();

            return;
        }
        //TODO clear cadata_dir
        //$this->_delTree($this->config->cadata_dir.$this->session->getId());
        $this->_delTree($this->config->cadata_dir);

        $data_path = $this->config->cadata_dir;

        if (!@mkdir($this->config->cadata_dir.$this->session->getId())) {
            $error = [
                'error' => "ERROR! Can't create work dir...",
            ];
            $this->response->setContentType('application/json', 'utf-8');
            $this->response->setJsonContent($error, JSON_NUMERIC_CHECK);
            $this->response->send();

            return;
        }
        $this->data_path = $this->config->cadata_dir.$this->session->getId().'/';
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
            $this->_makeZip($chunks_qty);
            $this->response->setJsonContent(['state' => 'finish']);
            $this->response->send();
        }
    }
    protected function _makeZip($parts_qty)
    {
        $data_dir = $this->data_path;
        //$counter = --$parts_qty;
        if (file_exists($data_dir.'data.zip')) {
            unlink($data_dir.'data.zip');
        }
        for ($i = 0; $i < $parts_qty; ++$i) {
            $data = file_get_contents($data_dir.'part_'.$i.'.bin');
            file_put_contents($data_dir.'data.zip', $data, FILE_APPEND);
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
        exec($this->config->util_dir.'caparser '.$this->data_path.'data.zip >/dev/null 2>&1 &');
    }

    protected function _delTree($dir)
    {
        $dir_array = @scandir($dir);
        if ($dir_array) {
            $files = array_diff(@scandir($dir), array('.', '..'));
            foreach ($files as $file) {
                if (is_dir($dir.'/'.$file)) {
                    $this->_delTree($dir.'/'.$file);
                } else {
                    unlink($dir.'/'.$file);
                }
            }

            return rmdir($dir);
        }

        return true;
    }
}
