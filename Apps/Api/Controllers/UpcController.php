<?php

namespace Apps\Api\Controllers;

use Apps\Models\Internalupc;

/**
 * Description of UpcController.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/upc")
 */
class UpcController extends ControllerBase
{
    public function afterExecuteRoute()
    {
        $this->response->setJsonContent($this->content);
        $this->response->send();
    }
    /**
     * getmfgcodesAction.
     *
     * @Get("/get/mfgcodes")
     */
    public function getmfgcodesAction()
    {
        $out = [];
        $q_res = Internalupc::find([
            'group' => 'MFGCODE',
            'columns' => 'MFGCODE',
        ]);
        if ($q_res) {
            foreach ($q_res as $mfgcode) {
                if (strlen($mfgcode->MFGCODE) > 0) {
                    $out[] = (string) $mfgcode->MFGCODE;
                }
            }
        }

        return $this->content = $out;
    }

    /**
     * getupc.
     *
     * @Get("/get/upc")
     */
    public function getupcAction()
    {
        $data = $this->session->get('upc_search_criteria');
        $cond_str = '';
        if ($data) {
            if (!isset($data->mfgcode)) {
                $data->mfgcode = '';
            }
            if (!isset($data->sku)) {
                $data->sku = '';
            }
            if (isset($data->sku)) {
                $data->sku = str_replace('\\', '', $data->sku);
                $data->sku = str_replace('_', '\_', $data->sku);
            }
            if (strlen($data->sku) && strlen($data->mfgcode)) {
                $cond_str = "MFGCODE='{$data->mfgcode}' and Sku LIKE '{$data->sku}%'";
            }
            if (strlen($data->sku) && !strlen($data->mfgcode)) {
                $cond_str = "Sku LIKE '{$data->sku}%'";
            }
            if (!strlen($data->sku) && strlen($data->mfgcode)) {
                $cond_str = "MFGCODE='{$data->mfgcode}'";
            }
            if (!strlen($data->sku) && !strlen($data->mfgcode)) {
                return $this->content = [];
            }
            $pagenum = $this->request->get('page') ? $this->request->get('page') : 1;

            return $this->content = Internalupc::paginator($pagenum, null, $cond_str, 'UPC, MFGCODE, Sku', null, null);
        }

        return $this->content = [];
    }

    /**
     * @Get("/get/freeupc")
     */
    public function freeupcAction()
    {
        $q_res = Internalupc::findFirst([
            'conditions' => "(MFGCODE='' or MFGCODE is null) and (Sku='' or Sku is null)",
        ]);
        if ($q_res) {
            return $this->content = $q_res->toArray();
        }

        return $this->content = [];
    }

    /**
     * @Post("/saveupc")
     */
    public function saveupcAction()
    {
        $new_upc = $this->request->getJsonRawBody();
        $checkupc = Internalupc::findFirst([
            'conditions' => "UPC='{$new_upc->UPC}' and MFGCODE='{$new_upc->MFGCODE}' and Sku='{$new_upc->SKU}'",
        ]);
        if ($checkupc) {
            return $this->content = ['result' => 'exists'];
        }
        $upc = Internalupc::findFirst([
            'conditions' => "UPC={$new_upc->UPC}",
        ]);
        //$upc->UPC= htmlentities(trim($new_upc->UPC),ENT_QUOTES|ENT_HTML401|ENT_HTML5);
        $upc->MFGCODE = trim($new_upc->MFGCODE);
        $upc->Sku = trim($new_upc->SKU);
        if ($upc->update()) {
            return $this->content = ['result' => 'success'];
        }

        return $this->content = ['result' => 'fault'];
    }

    /**
     * @Post("/setcriteria")
     */
    public function setcriteriaAction()
    {
        $criteria = $this->request->getJsonRawBody();
        if (!$criteria) {
            return $this->content = ['result' => 'error'];
        }
        $cond_str = '';
        if ($criteria) {
            if (!isset($criteria->mfgcode)) {
                $criteria->mfgcode = '';
            }
            if (!isset($criteria->sku)) {
                $criteria->sku = '';
            }
            if (strlen($criteria->sku) && strlen($criteria->mfgcode)) {
                $cond_str = "MFGCODE='{$criteria->mfgcode}' and Sku LIKE '{$criteria->sku}%'";
            }
            if (strlen($criteria->sku) && !strlen($criteria->mfgcode)) {
                $cond_str = "Sku LIKE '{$criteria->sku}%'";
            }
            if (!strlen($criteria->sku) && strlen($criteria->mfgcode)) {
                $cond_str = "MFGCODE='{$criteria->mfgcode}'";
            }
            $this->session->set('upc_search_criteria', $criteria);
        }

        return $this->content = ['result' => 'success'];
    }
    /**
     * @Post("/resetcriteria")
     */
    public function resetcriteriaAction()
    {
        $criteria = new \StdClass();
        $criteria->sku = '';
        $criteria->mfgcode = '';
        $this->session->set('upc_search_criteria', $criteria);

        return $this->content = ['result' => 'success'];
    }
}
