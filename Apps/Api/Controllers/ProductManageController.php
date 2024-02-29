<?php

namespace Apps\Api\Controllers;

use Apps\Models\Product;

/**
 * Description of ProductManage.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/product/manage")
 */
class ProductManageController extends ControllerBase
{
    /**
     * getProducts.
     *
     * @param int $pagenum the page number
     *
     * @return [array] paginator array
     * @Get("/get/page")
     */
    public function getProductsAction()
    {
        $criteria_str = null;
        $criteria = $this->session->get('product_push_criteria');
        if ($criteria) {
            if (property_exists($criteria, 'sku')) {
                $criteria_str = "Sku LIKE '{$criteria->sku}%'";
            }
        }
        $pagenum = $this->request->get('page') ? $this->request->get('page') : 1;
        $this->content = Product::paginator($pagenum, null, $criteria_str, 'Sku, SKUType, AuctionTitle, DCQuantity,Push', null, null);
        $this->content['criteria'] = $criteria;
    }
    /**
     * @Post("/setcriteria")
     */
    public function setCriteriaAction()
    {
        $criteria = $this->request->getJsonRawBody();
        $this->session->set('product_push_criteria', $criteria);
    }
    /**
     * @Post("/setpush")
     */
    public function setpushAction()
    {
        $sql = 'UPDATE product SET Push=1 WHERE Sku LIKE ?';
        $criteria_str = '%';
        $criteria = $this->session->get('product_push_criteria');
        if ($criteria) {
            if (property_exists($criteria, 'sku')) {
                $criteria_str = "{$criteria->sku}%";
            }
        }
        $this->db->execute($sql, [
            $criteria_str,
        ]);
    }
    /**
     * @Post("/unsetpush")
     */
    public function unsetpushAction()
    {
        $sql = 'UPDATE product SET Push=0 WHERE Sku LIKE ?';
        $criteria_str = '%';
        $criteria = $this->session->get('product_push_criteria');
        if ($criteria) {
            if (property_exists($criteria, 'sku')) {
                $criteria_str = "{$criteria->sku}%";
            }
        }
        $this->db->execute($sql, [
            $criteria_str,
        ]);
    }
}
