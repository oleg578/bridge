<?php

namespace Apps\Api\Controllers;

use Apps\Models\Mapping;
/**
 * Description of Mapping.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/mapping")
 */
class MappingController extends ControllerBase
{
    /**
     * @Get("/list")
     */
    public function listAction()
    {
        $maps = Mapping::find();
        if ($maps) {
            $this->content = $maps->toArray();
        } else {
            $this->content = [];
        }
    }

    /**
     * @Post("/save")
     */
    public function saveAction()
    {
        $item = $this->request->getJsonRawBody();
        if ($item) {
            $mfgmap = Mapping::findFirst([
                "conditions" => "mfgcode = '{$item->mfgcode}'"
            ]);
            if ($mfgmap) {
                $mfgmap->map = $item->map;
                if ($mfgmap->update()) {
                    //$this->content = $mfgmap->toArray();
                    $this->dispatcher->forward([
                        "controller" => "Mapping",
                        "action" => "list"
                    ]);
                } else {
                    $this->content = ['result' => 'error'];
                }
            } else {
                $this->content = [];
            }
        }
    }
}
