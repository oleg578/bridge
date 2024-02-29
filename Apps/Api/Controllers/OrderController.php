<?php

namespace Apps\Api\Controllers;

use Apps\Models\Order;
use Apps\Models\Product;

/**
 * Description of Order.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/order")
 */
class OrderController extends ControllerBase
{
    public $criteria;

    public function onConstruct()
    {
        $this->criteria = unserialize($this->session->get('search_order_criteria'));
        if (!$this->criteria) {
            $this->criteria = new \stdClass();
            $this->criteria->SiteOrderID = '';
            $this->criteria->OrderDateFrom = null;
            $this->criteria->OrderDateTo = null;
        }
    }

    public function afterExecuteRoute()
    {
        $this->response->setJsonContent($this->content)->send();
    }
    /**
     * @Get("/list")
     */
    public function listAction()
    {
        $pagenum = $this->request->get('page') ? $this->request->get('page') : 1;
        //build conditions
        $conditions = '';
        $cond_order = null;
        $cond_date = null;
        if ($this->criteria) {
            if ($this->criteria->SiteOrderID) {
                $cond_order = "SiteOrderID LIKE '{$this->criteria->SiteOrderID}%'";
            }
            if ($this->criteria->OrderDateFrom && $this->criteria->OrderDateTo) {
                $cond_date = "OrderDate BETWEEN '{$this->criteria->OrderDateFrom}' AND '{$this->criteria->OrderDateTo}'";
            }
            if ($cond_order && $cond_date) {
                $conditions = $cond_order.' AND '.$cond_date;
            } elseif ($cond_order && !$cond_date) {
                $conditions = $cond_order;
            } elseif (!$cond_order && $cond_date) {
                $conditions = $cond_date;
            }
        } else {
            $conditions = '';
        }
        $orders = Order::orderpaginator($pagenum, 50, $conditions);

        if ($orders) {
            $orders['criteria'] = $this->criteria;
            $this->content = ['items' => $orders];
        } else {
            $this->content = ['items' => []];
        }
    }
    /**
     * @Post("/setcriteria")
     */
    public function setcriteriaAction()
    {
        $data = $this->request->getJsonRawBody();
        if (!$data) {
            $this->criteria = new \stdClass();
            $this->criteria->SiteOrderID = '';
            $this->criteria->OrderDateFrom = null;
            $this->criteria->OrderDateTo = null;
        } else {
            $this->criteria = $data;
        }
        $this->session->set('search_order_criteria', serialize($this->criteria));
    }

    /**
     * @Post("/resetcriteria")
     */
    public function resetcriteriaAction()
    {
        $this->criteria = new \stdClass();
        $this->criteria->SiteOrderID = '';
        $this->criteria->OrderDateFrom = null;
        $this->criteria->OrderDateTo = null;
        $this->session->set('search_order_criteria', serialize($this->criteria));
    }

    /**
     * @Get("/get")
     */
    public function getAction()
    {
        $order_id = $this->request->get('orderId');
        if (!$order_id) {
            return $this->content = ['order' => []];
        }
        $orders = Order::find([
            'conditions' => "SiteOrderID='{$order_id}'",
        ]);
        if ($orders) {
            if ($orders_ar = $orders->toArray()) {
                return $this->content = $this->_buildOrder($orders);
            } else {
                return $this->content = ['order' => []];
            }
        } else {
            return $this->content = ['order' => []];
        }
    }

    protected function _buildOrder($orders)
    {
        $orders_ar = $orders->toArray();

        $order = $orders->getFirst();
        $order_ar = $order->toArray();

        $order_ar['items'] = [];
        $order_ar['TotalQty'] = 0;
        foreach ($orders_ar as $suborder) {
            $item = [];
            $item['SKU'] = $suborder['SKU'];
            $item['Title'] = $suborder['Title'];
            $item['SiteListingID'] = $suborder['SiteListingID'];
            $item['UnitPrice'] = $suborder['UnitPrice'];
            $item['ItemWeight'] = $suborder['ItemWeight'];
            $item['Quantity'] = $suborder['Quantity'];
            $order_ar['TotalQty'] += $item['Quantity'];
            $order_ar['items'][] = $item;
            $order_ar['shipments'] = $order->shipments->toArray();
            if ($order->shipments->toArray()) {
                $order_ar['ShippingCost'] = $order_ar['shipments'][0]['shippingcost'];
                $order_ar['ShippingWeight'] = $order_ar['shipments'][0]['weight'];
                $order_ar['ShippingDate'] = $order_ar['shipments'][0]['shippingdate'];
                $order_ar['Trackingnumber'] = (string) $order_ar['shipments'][0]['trackingnumber'];
            } else {
                $order_ar['ShippingCost'] = 0;
                $order_ar['ShippingWeight'] = 0;
                $order_ar['ShippingDate'] = '';
                $order_ar['Trackingnumber'] = '';
            }
            foreach ($order_ar['shipments'] as &$shipment) {
                $sku_title = Product::findFirst([
                    'conditions' => "Sku='{$shipment['sku']}'",
                    'columns' => "AuctionTitle"
                ]);
                if ($sku_title) {
                    $shipment['title'] = $sku_title->AuctionTitle;
                } else {
                    $shipment['title'] = "";
                }
            }
         }
         return $order_ar;
    }
}
