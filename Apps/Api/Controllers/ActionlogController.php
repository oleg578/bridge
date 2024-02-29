<?php

namespace Apps\Api\Controllers;

use Apps\Models\Actionlog;

/**
 * Description of Actionlog
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/actionlog")
 */
class ActionlogController extends ControllerBase
{
    /**
     * @Post("/skufilter")
     */
    public function skufilterAction()
    {
        $actions =  false;
        $data = file_get_contents("php://input");
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $product = json_decode($data);
        if ($product && isset($product->sku)) {
            if (strlen($product->sku) > 0) {
                $actions = Actionlog::find([
                    'conditions' => "action like '%{$product->sku}%'"
                ]);
            }
        }
        if ($actions) {
            return $this->content = json_encode([
                'result' => 'success',
                'actions' => $actions->toArray()
            ]);
        } else {
            return $this->content = json_encode([
                'result' => 'error',
                'actions' => []
            ]);
        }
    }
}
