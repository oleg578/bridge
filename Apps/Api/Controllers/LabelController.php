<?php

namespace Apps\Api\Controllers;

use Apps\Models\Labellist;

/**
 * Description of Label.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/label")
 */
class LabelController extends ControllerBase
{
    /**
     * @Get("/list")
     */
    public function listAction()
    {
        $labels = Labellist::find();
        if ($labels) {
            $this->content = json_encode(['items' => $labels->toArray()]);
        } else {
            $this->content = json_encode(['items' => []]);
        }
    }

    /**
     * @Post("/delete")
     */
    public function deleteAction()
    {
        $data = file_get_contents("php://input");
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $lbl = json_decode($data);

        $res = $this->db->execute("DELETE FROM `labellist` WHERE id='{$lbl->id}'");
        if ($res) {
            return $this->content = json_encode(['result' => 'success']);
        } else {
            return $this->content = json_encode(['result' => 'error']);
        }
    }

    /**
     * @Post("/add")
     */
    public function addAction()
    {
        $data = file_get_contents("php://input");
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $lbl = json_decode($data);
        $newlbl = new Labellist();
        $newlbl->name = $lbl->name;
        if ($newlbl->save()) {
            return $this->content = json_encode(['result' => 'success']);
        } else {
            return $this->content = json_encode(['result' => 'error']);
        }
    }
}
