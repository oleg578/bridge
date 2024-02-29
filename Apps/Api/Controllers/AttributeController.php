<?php

namespace Apps\Api\Controllers;

use Apps\Models\Attribute;
use Apps\Models\Attrblocked;
use Apps\Models\Attrmetadata;

/**
 * Description of Attribute.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/attribute")
 */
class AttributeController extends ControllerBase
{
    /**
     * @Get("/list")
     */
    public function listAction()
    {
        $attr_b_ar = [];
        $attrs = Attribute::find([
            'group' => 'Name',
            'columns' => 'Name,Classification',
            'conditions' => "Value <> '_Delete_'",
        ]);
        if ($attrs) {
            $attr_b = Attrblocked::find([
                'columns' => 'Name',
            ]);
            if ($attr_b) {
                foreach ($attr_b as $a_blocked) {
                    $attr_b_ar[] = $a_blocked->Name;
                }
            }
            $attributes_ar = $attrs->toArray();
            foreach ($attributes_ar as &$attr) {
                if (array_search($attr['Name'], $attr_b_ar) !== false) {
                    $attr['Blocked'] = true;
                } else {
                    $attr['Blocked'] = false;
                }
                $name_filtered = str_replace("'", "\\'", $attr['Name']);
                $md = Attrmetadata::findFirst([
                    'conditions' => "Name='{$name_filtered}'",
                ]);
                if ($md) {
                    $attr['Type'] = $md->Type;
                    if ($md->Type == 'list') {
                        $attr['List'] = explode(',', $md->List);
                    } else {
                        $attr['List'] = [];
                    }
                } else {
                    $attr['Type'] = 'text';
                    $attr['List'] = [];
                }
            }
            $this->content = json_encode(['items' => $attributes_ar]);
        } else {
            $this->content = json_encode(['items' => []]);
        }
    }

    /**
     * @Post("/delete")
     */
    public function deleteAction()
    {
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $attr = json_decode($data);

        $res = $this->db->execute("UPDATE `attribute` SET `Value`='_Delete_' WHERE `Name`='{$attr->name}'");
        $res_b = $this->db->execute("UPDATE `attrblocked` SET `Deleted`='_Delete_' WHERE `Name`='{$attr->name}'");
        $res_m = $this->db->execute("UPDATE `attrmetadata` SET `Deleted`='_Delete_' WHERE `Name`='{$attr->name}'");
        $this->UpdateAttrPush();
        if ($res && $res_b && $res_m) {
            return $this->content = json_encode(['result' => 'success']);
        } else {
            return $this->content = json_encode(['result' => 'error']);
        }
    }

    /**
     * @Post("/gc")
     */
    public function gcAction()
    {
        $res = $this->db->execute("DELETE FROM `attribute` WHERE `Value`='_Delete_'");
        $res_b = $this->db->execute("DELETE FROM `attrblocked` WHERE `Deleted`='_Delete_'");
        $res_m = $this->db->execute("DELETE FROM `attrmetadata` WHERE `Deleted`='_Delete_'");
        $this->UpdateAttrPush();
        if ($res && $res_b && $res_m) {
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
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $attr = json_decode($data);
        $res = $this->db->execute("CALL attr_add('{$attr->Name}', '{$attr->Value}')");
        $attr_meta = new Attrmetadata();
        $attr_meta->Name = $attr->Name;
        $attr_meta->Type = $attr->Type;
        $attr_meta->List = $attr->List;
        $res_m = $attr_meta->create();
        $this->UpdateAttrPush();
        if ($res && $res_m) {
            return $this->content = json_encode(['result' => 'success']);
        } else {
            return $this->content = json_encode(['result' => 'error']);
        }
    }

    /**
     * @Post("/setattr")
     */
    public function setattrAction()
    {
        exec($this->config->util_dir.'bridge_attr  >/dev/null 2>&1 &');
    }

    /**
     * @Post("/setblockattr")
     */
    public function setblockattrAction()
    {
        $attr = $this->request->getJsonRawBody();
        if ($attr) {
            if ($attr->Blocked) {
                //unblock : delete from Attrblocked
                $candidate = Attrblocked::findFirst([
                    'conditions' => "Name='{$attr->Name}'",
                ]);
                if ($candidate) {
                    if ($candidate->delete()) {
                        return $this->content = json_encode(['result' => 'success']);
                    }
                }
            } else {
                //block : add to Attrblocked
                $candidate = new Attrblocked();
                $candidate->Name = $attr->Name;
                if ($candidate->create()) {
                    return $this->content = json_encode(['result' => 'success']);
                }
            }
        }

        return $this->content = json_encode(['result' => 'fault']);
    }

    protected function UpdateAttrPush()
    {
        $gc_sql = 'delete from attrpush where Name not in (select Name from attribute group by Name)';
        $repare_sql = 'insert ignore into attrpush (`id`, `Name`) select md5(Name),Name from attribute group by Name';
        $this->db->execute($gc_sql);
        $this->db->execute($repare_sql);
    }
}
