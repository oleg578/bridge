<?php

namespace Apps\Models;

/**
 * Product model.
 */
class Product extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $id;
    /**
     * @Column(type="string", nullable=false)
     */
    public $Sku;
    /**
     * @Column(type="string", nullable=false)
     */
    public $AuctionTitle;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SKUType;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $Quantity;
    /**
     * @Column(type="string", nullable=true)
     */
    public $QuantityUpdateType;
    /**
     * @Column(type="string", nullable=true)
     */
    public $DCQuantity;
    /**
     * @Column(type="string", nullable=true)
     */
    public $DCQuantityUpdateType;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $TotalQuantity;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityOpen;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityPendingCheckout;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityPendingPayment;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityPendingShipment;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityPooledOpen;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityPooledPendingCheckout;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityPooledPendingPayment;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityPooledPendingShipment;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityoneBay;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityoneBayPooled;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityonAmazon;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityonAmazonPooled;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityonRakutencomShopping;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $QuantityonRakutencomShoppingPooled;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ItemCreateDate;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ItemLastModifiedDate;
    /**
     * @Column(type="float", nullable=true)
     */
    public $StartingBid;
    /**
     * @Column(type="float", nullable=true)
     */
    public $Reserve;
    /**
     * @Column(type="float", nullable=true)
     */
    public $Weight;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ISBN;
    /**
     * @Column(type="string", nullable=true)
     */
    public $UPC;
    /**
     * @Column(type="string", nullable=true)
     */
    public $EAN;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ASIN;
    /**
     * @Column(type="string", nullable=true)
     */
    public $MPN;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShortDescription;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Description;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Flag;
    /**
     * @Column(type="string", nullable=true)
     */
    public $FlagDescription;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Blocked;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BlockedComment;
    /**
     * @Column(type="string", nullable=true)
     */
    public $BlockExternalQuantity;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Manufacturer;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Brand;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Condition;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Warranty;
    /**
     * @Column(type="float", nullable=true)
     */
    public $SellerCost;
    /**
     * @Column(type="float", nullable=true)
     */
    public $ProductMargin;
    /**
     * @Column(type="float", nullable=true)
     */
    public $BuyItNowPrice;
    /**
     * @Column(type="float", nullable=true)
     */
    public $RetailPrice;
    /**
     * @Column(type="float", nullable=true)
     */
    public $SecondChanceOfferPrice;
    /**
     * @Column(type="string", nullable=true)
     */
    public $PictureURLs;
    /**
     * @Column(type="string", nullable=true)
     */
    public $TaxProductCode;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SupplierCode;
    /**
     * @Column(type="string", nullable=true)
     */
    public $SupplierPO;
    /**
     * @Column(type="string", nullable=true)
     */
    public $WarehouseLocation;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ReceivedInInventory;
    /**
     * @Column(type="string", nullable=true)
     */
    public $InventorySubtitle;
    /**
     * @Column(type="string", nullable=true)
     */
    public $RelationshipName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $VariationParentSKU;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Labels;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ChannelAdvisorStoreTitle;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ChannelAdvisorStoreDescription;
    /**
     * @Column(type="string", nullable=true)
     */
    public $StoreMetaDescription;
    /**
     * @Column(type="float", nullable=true)
     */
    public $ChannelAdvisorStorePrice;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $ChannelAdvisorStoreCategoryID;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ChannelAdvisorStoreCategoryHierarchy;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ChannelAdvisorStoreCategoryName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ChannelAdvisorStoreURL;
    /**
     * @Column(type="string", nullable=true)
     */
    public $HarmonizedCode;
    /**
     * @Column(type="float", nullable=true)
     */
    public $Height;
    /**
     * @Column(type="float", nullable=true)
     */
    public $Length;
    /**
     * @Column(type="float", nullable=true)
     */
    public $Width;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $AdCount;
    /**
     * @Column(type="boolean", nullable=true)
     */
    public $Deleted;
    /**
     * @Column(type="boolean", nullable=true)
     */
    public $Edited;
    /**
     * @Column(type="boolean", nullable=true)
     */
    public $Created;
    /**
     * @Column(type="boolean", nullable=true)
     */
    public $Push;
    /**
     * @Column(type="string", nullable=true)
     */
    public $CreatedAt;
    /**
     * @Column(type="string", nullable=true)
     */
    public $UpdatedAt;

    public function initialize()
    {
        $this->addBehavior(new \Phalcon\Mvc\Model\Behavior\Timestampable([
            'beforeValidationOnUpdate' => [
                'field' => 'UpdatedAt',
                'format' => $this->_currentDate(),
            ],
            'beforeValidationOnCreate' => [
                'field' => 'UpdatedAt',
                'format' => $this->_currentDate(),
            ],
        ]));
        $this->addBehavior(new \Phalcon\Mvc\Model\Behavior\Timestampable([
            'beforeValidationOnCreate' => [
                'field' => 'CreatedAt',
                'format' => $this->_currentDate(),
            ],
        ]));
        $this->hasMany('Sku', "\Apps\Models\Attribute", 'Sku', [
            'alias' => 'attributes',
            'reusable' => \TRUE,
        ]);
        $this->hasMany('Sku', "\Apps\Models\Image", 'Sku', [
            'alias' => 'images',
            'reusable' => \TRUE,
        ]);
        $this->hasMany('Sku', "\Apps\Models\Shipping", 'Sku', [
            'alias' => 'shipping',
            'reusable' => \TRUE,
        ]);
        $this->hasMany('Sku', "\Apps\Models\Bundle", 'parentSku', [
            'alias' => 'bundle',
            'reusable' => \TRUE,
        ]);
    }

    protected function _currentDate()
    {
        $curdate = new \Datetime('now', new \DateTimeZone('America/Detroit'));

        return $curdate->format('Y-m-d H:i:s');
    }
}
