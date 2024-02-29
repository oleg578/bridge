<?php

namespace Apps\Api\Controllers;

use Apps\Models\Deliverytime;

/**
 * Description of DeliverytimeController.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/deliverytime")
 */
class DeliverytimeController extends ControllerBase
{
    /**
     * @Get("/list")
     */
    public function listAction()
    {
        $data = Deliverytime::find([
            'order' => 'mfgcode ASC',
        ]);
        $this->content = json_encode($data->toArray(), JSON_NUMERIC_CHECK);
    }
    /**
     * @Post("/create")
     */
    public function createAction()
    {
        $success = false;
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = ['success' => $success];
        }
        $newdt = json_decode($data);
        $dt = new Deliverytime();
        $dt->mfgcode = $newdt->mfgcode;
        $dt->stockinstock = $newdt->stockinstock;
        $dt->stockoutofstock = $newdt->stockoutofstock;
        $dt->otherinstock = $newdt->otherinstock;
        $dt->otheroutofstock = $newdt->otheroutofstock;
        $dt->MinQty = $newdt->MinQty;
        $success = $dt->create();

        return $this->content = ['success' => $success];
    }
    /**
     * @Post("/update")
     */
    public function updateAction()
    {
        $success = false;
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = ['success' => $success];
        }
        $newdt = json_decode($data);
        $dt = new Deliverytime();
        $dt->mfgcode = $newdt->mfgcode;
        $dt->stockinstock = $newdt->stockinstock;
        $dt->stockoutofstock = $newdt->stockoutofstock;
        $dt->otherinstock = $newdt->otherinstock;
        $dt->otheroutofstock = $newdt->otheroutofstock;
        $dt->MinQty = $newdt->MinQty;
        $success = $dt->update();

        return $this->content = ['success' => $success];
    }
    /**
     * @Post("/delete")
     */
    public function deleteAction()
    {
        $success = false;
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = ['success' => $success];
        }
        $newdt = json_decode($data);
        $dt = new Deliverytime();
        $dt->mfgcode = $newdt->mfgcode;
        $dt->stockinstock = $newdt->stockinstock;
        $dt->stockoutofstock = $newdt->stockoutofstock;
        $dt->otherinstock = $newdt->otherinstock;
        $dt->otheroutofstock = $newdt->otheroutofstock;
        $dt->MinQty = $newdt->MinQty;
        $success = $dt->delete();

        return $this->content = ['success' => $success];
    }
}
