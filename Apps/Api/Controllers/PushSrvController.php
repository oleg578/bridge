<?php

namespace Apps\Api\Controllers;

use Apps\Models\Productpush;
use Apps\Models\Attrpush;

/**
 * Description of PushSrv.
 *
 * @author  Oleh Nahornyi <oleg.nagornij@gmail.com>
 * @RoutePrefix("/api/pushsrv")
 */
class PushSrvController extends ControllerBase
{
    /**
     * @Get("/get/products")
     */
    public function getproductsAction()
    {
        $products = Productpush::find([
            'conditions' => "Name not in ('id','CreatedAt','UpdatedAt','Edited', 'Deleted', 'Created')",
            'order' => 'Ordinal',
        ]);
        if ($products) {
            return $this->content = $products->toArray();
        }

        return $this->content = [];
    }
    /**
     * @Get("/get/attributes")
     */
    public function getattrsAction()
    {
        //update Attrpush before
        $this->_attrpushUpdate();
        $attrs = Attrpush::find();
        if ($attrs) {
            return $this->content = $attrs->toArray();
        }

        return $this->content = [];
    }

    /**
     * @Post("/save")
     */
    public function saveAction()
    {
        $data = $this->request->getJsonRawBody();
        if ($data) {
            $products = $data->products;
            $attributes = $data->attributes;
        }
        foreach ($products as $product) {
            $errormessage = '';
            $pr_set = new Productpush();
            $pr_set->id = $product->id;
            $pr_set->Name = $product->Name;
            $pr_set->Ordinal = $product->Ordinal;
            $pr_set->Push = $product->Push;
            if (!$pr_set->update()) {
                foreach ($pr_set->getMessages() as $message) {
                    $errormessage .= $message.'<br>';
                }

                return $this->content = [
                    'result' => 'fault',
                    'message' => $errormessage,
                ];
            }
        }
        foreach ($attributes as $attribute) {
            $errormessage = '';
            $attr_set = new Attrpush();
            $attr_set->id = $attribute->id;
            $attr_set->Name = $attribute->Name;
            $attr_set->Push = $attribute->Push;
            if (!$attr_set->update()) {
                foreach ($attr_set->getMessages() as $message) {
                    $errormessage .= $message.'<br>';
                }

                return $this->content = [
                    'result' => 'fault',
                    'message' => $errormessage,
                ];
            }
        }

        return $this->content = [
            'result' => 'success',
            'message' => '',
        ];
    }

    private function _attrpushUpdate()
    {
        //insert ignore into attrpush (id,Name) select md5(attribute.Name),attribute.Name from attribute group by attribute.Name
        $attrpush_update_SQL = "insert ignore into attrpush (id,Name) select md5(attribute.Name),attribute.Name from attribute group by attribute.Name";
        $this->db->execute($attrpush_update_SQL);
    }
}
