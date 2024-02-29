<?php

namespace Apps\Api\Controllers;

use Apps\Models\Maprule;

/**
 * Description of CpmController.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/cpm")
 */
class CpmController extends ControllerBase
{
    /**
     * @Get("/list")
     */
    public function listAction()
    {
        $data = Maprule::find();
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
        $nscpmap = new Maprule();
        $nscpmap->Brand = $newmap->Brand;
        $nscpmap->maprule = $newmap->maprule;
        $success = $nscpmap->create();

        return $this->content = ['success' => $success];
    }
    /**
     * @Post("/update")
     */
    public function updateAction()
    {
        $update_sql = 'UPDATE `maprule` SET `maprule`.`maprule`=? WHERE `Brand`=?';
        $success = false;
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = ['result' => $success];
        }
        $cpm = json_decode($data);
        if ($cpm) {
            $success = $this->db->execute($update_sql, [
                $cpm->maprule,
                $cpm->Brand,
            ]);
        }
        return $this->content = ['success' => $success];
    }
    /**
     * @Post("/delete")
     */
    public function deleteAction()
    {
        $del_sql = 'DELETE FROM `maprule` WHERE `Brand`=?';
        $success = false;
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = ['success' => $success];
        }
        $cpm = json_decode($data);
        if ($cpm) {
            $success = $this->db->execute($del_sql, [$cpm->Brand]);
        }

        return $this->content = ['success' => $success];
    }
}
