<?php

namespace Apps\Models;

/**
 * Order model.
 */
class Order extends ModelBase
{
    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false)
     */
    public $id;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SiteName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SiteOrderID;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Buyer;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SKU;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Title;
    /**
     * @Column(type="string", nullable=true)
     */
    public $OrderDate;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShipmentStatusDate;
    /**
     * @Column(type="string", nullable=true)
     */
    public $PaymentType;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $Quantity;
    /**
     * @Column(type="float", nullable=true)
     */
    public $OrderTotal;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Account;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BuyerCreditCard;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BuyerFeedbackMessage;
    /**
     * @Column(type="string", nullable=true)
     */
    public $CheckoutStatus;
    /**
     * @Column(type="string", nullable=true)
     */
    public $DisputeStatus;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Fulfillment;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ItemHarmonizedCode;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ItemMPN;
    /**
     * @Column(type="float", nullable=true)
     */
    public $ItemWeight;
    /**
     * @Column(type="string", nullable=true)
     */
    public $MerchantReferenceNumber;
    /**
     * @Column(type="string", nullable=true)
     */
    public $OrderImportDate;
    /**
     * @Column(type="string", nullable=true)
     */
    public $OrderTags;
    /**
     * @Column(type="string", nullable=true)
     */
    public $PaymentStatus;
    /**
     * @Column(type="string", nullable=true)
     */
    public $PaymentStatusDate;
    /**
     * @Column(type="string", nullable=true)
     */
    public $PrivateNotes;
    /**
     * @Column(type="string", nullable=true)
     */
    public $PublicNotes;
    /**
     * @Column(type="string", nullable=true)
     */
    public $RefundStatus;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SellerLeftFeedback;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShippingStatus;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SpecialInstructions;
    /**
     * @Column(type="float", nullable=true)
     */
    public $TotalShippingPrice;
    /**
     * @Column(type="float", nullable=true)
     */
    public $TotalShippingTaxPrice;
    /**
     * @Column(type="float", nullable=true)
     */
    public $TotalTaxPrice;
    /**
     * @Column(type="float", nullable=true)
     */
    public $UnitPrice;
    /**
     * @Column(type="string", nullable=true)
     */
    public $WarehouseLocation;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BuyerUserID;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ChannelAdvisorOrderID;
    /**
     * @Column(type="string", nullable=true)
     */
    public $PaymentPaypalAccountID;
    /**
     * @Column(type="string", nullable=true)
     */
    public $PaymentTransactionID;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SecondarySiteOrderID;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SellerOrderID;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SiteListingID;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SiteOrderItemID;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShippingAddressLine1;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShippingAddressLine2;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShippingCity;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShippingCountry;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShippingDayPhone;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShippingEveningPhone;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShippingFirstName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShippingLastName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShippingPostalCode;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShippingStateorProvince;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BillingAddressLine1;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BillingAddressLine2;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BillingCity;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BillingCompanyName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BillingCountry;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BillingDayPhone;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BillingEveningPhone;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BillingFirstName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BillingLastName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BillingPostalCode;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BillingStateorProvince;

    protected $table = 'orders';

    public function initialize()
    {
        $this->hasMany("SiteOrderID", "\Apps\Models\ShipWork", "orderid", [
            'alias' => 'shipments',
            "reusable" => \TRUE,
        ]);
    }

    public function getSource()
    {
        return $this->table;
    }

    public static function orderpaginator($pagenumber, $pagelength = 30, $conditions="")
    {
        $group = 'SiteOrderID';
        $pagelength = $pagelength ? $pagelength : 30;
        $current_page = ($pagenumber > 0) ? $pagenumber : 1;
        $offset = ($current_page - 1) * $pagelength;
        $items = self::find([
            'columns' => 'id, SiteName, SiteOrderID, Buyer, OrderDate, OrderTotal, PaymentType, ShipmentStatusDate, CheckoutStatus, ShippingStatus, PaymentStatus, DisputeStatus, RefundStatus',
            'conditions' => $conditions ? $conditions : null,
            'order' => 'OrderDate DESC',
            'group' => $group,
            'limit' => [
                'number' => $pagelength,
                'offset' => $offset,
            ],
        ]);
        $n_ar = explode('\\', get_called_class());
        $model_vars = get_class_vars(get_called_class());
        if (array_key_exists('table', $model_vars)) {
            $source_table = $model_vars['table'];
        } else {
            $source_table = strtolower(array_pop($n_ar));
        }
        if ($group) {
            $bb = new self();
            //TODO
            $c_query_head = "select count(*) as `rowcount` from (SELECT COUNT(*) AS `rowcount` FROM `{$source_table}`";
            $c_query_footer =  "GROUP BY `{$group}`) as a";
            if ($conditions) {
                $c_query = $c_query_head . " WHERE " . $conditions . " " . $c_query_footer;
            } else {
                $c_query = $c_query_head . " " . $c_query_footer;
            }
            //$c_query = "select count(*) as `rowcount` from (SELECT COUNT(*) AS `rowcount` FROM `{$source_table}` GROUP BY `{$group}`) as a";
            $res = $bb->getDi()->get('db')->query($c_query);
            $res_fetch = $res->fetch();
            $items_count = $res_fetch ? $res_fetch['rowcount'] : 0;
        } else {
            $items_count = self::count([
                'conditions' => $conditions,
            ]);
        }
        if ($items) {
            $items_ar = $items->toArray();
            foreach ($items_ar as &$order_head) {
                $suborders = self::find([
                    'conditions' => "SiteOrderID='{$order_head['SiteOrderID']}'"
                ]);
                if ($suborders) {
                    $order_head['suborders'] = $suborders->toArray();
                    $order_head['totalqty'] = 0;
                    $order_head['showgroup'] = false;
                    foreach ($suborders as $suborder) {
                        $order_head['totalqty'] += $suborder->Quantity;
                    }
                } else {
                    $order_head['suborders'] = [];
                    $order_head['quantity'] = 0;
                }
            }
        } else {
            $items_ar = [];
        }
        $previous_page = ($current_page > 1) ? $current_page - 1 : $current_page;
        $last_page = (int) ceil($items_count / $pagelength);
        $next_page = min([$current_page + 1, $last_page]);
        $out = [];
        $out['items'] = $items_ar;
        $out['currentpage'] = $current_page;
        $out['previouspage'] = $previous_page;
        $out['nextpage'] = $next_page;
        $out['lastpage'] = $last_page;

        return $out;
    }
}
