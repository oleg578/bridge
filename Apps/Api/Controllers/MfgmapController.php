<?php

namespace Apps\Api\Controllers;

use Apps\Models\Mfgmap;

/**
 * Description of DcCenterController.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/mfgmap")
 */
class MfgmapController extends ControllerBase
{
    /**
     * @Get("/list")
     */
    public function listAction()
    {
        $data = Mfgmap::find();
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
        $newmfgmap = json_decode($data);
        $mfgmap = new Mfgmap();
        $mfgmap->oldmfg = $newmfgmap->oldmfg;
        $mfgmap->newmfg = $newmfgmap->newmfg;
        $success = $mfgmap->create();

        return $this->content = ['success' => $success];
    }
    /**
     * @Post("/update")
     */
    public function updateAction()
    {
        $update_sql = 'UPDATE `mfgmap` SET `newmfg`=? WHERE `oldmfg`=?';
        $success = false;
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = ['result' => $success];
        }
        $mfgmap = json_decode($data);
        if ($mfgmap) {
            $success = $this->db->execute($update_sql, [
                $mfgmap->newmfg,
                $mfgmap->oldmfg,
            ]);
        }
        return $this->content = ['success' => $success];
    }
    /**
     * @Post("/delete")
     */
    public function deleteAction()
    {
        $del_sql = 'DELETE FROM mfgmap WHERE `oldmfg`=?';
        $success = false;
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = ['success' => $success];
        }
        $mfgmap = json_decode($data);
        if ($mfgmap) {
            $success = $this->db->execute($del_sql, [$mfgmap->oldmfg]);
        }

        return $this->content = ['success' => $success];
    }
}
