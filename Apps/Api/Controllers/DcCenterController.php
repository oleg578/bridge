<?php

namespace Apps\Api\Controllers;

use Apps\Models\Dccenter;

/**
 * Description of DcCenterController.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/dccenter")
 */
class DcCenterController extends ControllerBase
{
    /**
     * @Get("/list")
     */
    public function listAction()
    {
        $data = Dccenter::find([
            'order' => 'LocationId ASC',
        ]);
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
        $newcenter = json_decode($data);
        $center = new Dccenter();
        $center->DCCenter = $newcenter->DCCenter;
        $center->LocationId = $newcenter->LocationId;
        $center->DCType = $newcenter->DCType;
        $success = $center->create();

        return $this->content = ['success' => $success];
    }
    /**
     * @Post("/update")
     */
    public function updateAction()
    {
        $update_sql = 'UPDATE dccenter SET `DCCenter`=?, `LocationId`=?,`DCType`=? WHERE id=?';
        $test_sql = "SELECT * from  dccenter WHERE `dctype`='default'";
        $success = false;
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = ['result' => $success];
        }
        $center = json_decode($data);
        if ($center->DCType == "default") {
            $test_res = $this->db->query($test_sql, [
                $center->DCType,
            ]);
            $test_res->setFetchMode(\Phalcon\Db::FETCH_OBJ);
            $dc = $test_res->fetch();
            if ($dc) {
                if ($center->DCCenter !== $dc->DCCenter) {
                    return $this->content = [
                        'result' => "fault",
                        'message' => "Default DCCenter is specified twice",
                    ];
                }
            }
        }
        if ($center) {
            $success = $this->db->execute($update_sql, [
                $center->DCCenter,
                $center->LocationId,
                $center->DCType,
                $center->id,
            ]);
        }

        return $this->content = ['success' => $success];
    }
    /**
     * @Post("/delete")
     */
    public function deleteAction()
    {
        $del_sql = 'DELETE FROM dccenter WHERE id=?';
        $success = false;
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = ['success' => $success];
        }
        $center = json_decode($data);
        if ($center) {
            $success = $this->db->execute($del_sql, [$center->id]);
        }

        return $this->content = ['success' => $success];
    }
    /**
     * @Get("/getmaxloc")
     */
    public function getmaxlocAction()
    {
        $maxloc = Dccenter::maximum([
            'column' => 'LocationId',
        ]);
        $this->content = json_encode(['maxloc' => $maxloc], JSON_NUMERIC_CHECK);
    }
}
