<?php

namespace Apps\Api\Controllers;

use Apps\Models\Bundle;
use Apps\Models\Product;

/**
 * Description of Bundle.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/bundle")
 */
class BundleController extends ControllerBase
{
    /**
     * @Get("/list")
     */
    public function listAction()
    {
        $pagenum = $this->request->get('page') ? $this->request->get('page') : 1;
        $bundles = Bundle::paginator($pagenum, 10, null, "parentSku", "parentSku", "parentSku");

        if ($bundles) {
            foreach ($bundles['items'] as &$bundle) {
                $title = Product::findFirst([
                    "columns" => "AuctionTitle",
                    "conditions" => "Sku='{$bundle['parentSku']}'"
                ]);
                if ($title) {
                    $bundle['AuctionTitle'] = $title->AuctionTitle;
                } else {
                    $bundle['AuctionTitle'] = "";
                }
                $childs = Bundle::find([
                    "conditions" => "parentSku='{$bundle['parentSku']}'",
                    "columns" => "id, childSku, Quantity"
                ]);
                if ($childs) {
                    $childsArray = $childs->toArray();
                    foreach ($childsArray as &$child) {
                        $child_title = Product::findFirst([
                            "columns" => "AuctionTitle",
                            "conditions" => "Sku='{$child['childSku']}'"
                        ]);
                        if ($child_title) {
                            $child['AuctionTitle'] = $child_title->AuctionTitle;
                        } else {
                            $child['AuctionTitle'] = "";
                        }
                    }
                    $bundle['childs'] = $childsArray;
                } else {
                    $bundle['childs'] = [];
                }
            }
            $this->content = json_encode(['items' => $bundles]);
        } else {
            $this->content = json_encode(['items' => []]);
        }
    }
}
