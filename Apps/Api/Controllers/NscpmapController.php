<?php

namespace Apps\Api\Controllers;

use Apps\Models\Nscpmap;

/**
 * Description of NscpmapController.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/nscpmap")
 */
class NscpmapController extends ControllerBase
{
    /**
     * @Get("/list")
     */
    public function listAction()
    {
        $data = Nscpmap::find();
        $this->content = json_encode($data->toArray());
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
        $newmap = json_decode($data);
        $nscpmap = new Nscpmap();
        $nscpmap->Sku = $newmap->Sku;
        $nscpmap->Price = $newmap->Price;
        $success = $nscpmap->create();

        return $this->content = ['success' => $success];
    }
    /**
     * @Post("/update")
     */
    public function updateAction()
    {
        $update_sql = 'UPDATE `nscpmap` SET `Price`=? WHERE `Sku`=?';
        $success = false;
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = ['result' => $success];
        }
        $nscpmap = json_decode($data);
        if ($nscpmap) {
            $success = $this->db->execute($update_sql, [
                $nscpmap->Price,
                $nscpmap->Sku,
            ]);
        }
        return $this->content = ['success' => $success];
    }
    /**
     * @Post("/delete")
     */
    public function deleteAction()
    {
        $del_sql = 'DELETE FROM nscpmap WHERE `Sku`=?';
        $success = false;
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = ['success' => $success];
        }
        $nscpmap = json_decode($data);
        if ($nscpmap) {
            $success = $this->db->execute($del_sql, [$nscpmap->Sku]);
        }

        return $this->content = ['success' => $success];
    }
}
