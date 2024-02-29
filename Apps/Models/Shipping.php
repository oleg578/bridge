<?php

namespace Apps\Models;

/**
 * Shipping model.
 */
class Shipping extends ModelBase
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
     * @Column(type="string", nullable=true)
     */
    public $DCCode;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShipZoneName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShipCarrierCode;
    /**
     * @Column(type="string", nullable=true)
     */
    public $ShipClassCode;
    /**
     * @Column(type="float", nullable=true)
     */
    public $ShipRateFirstItem;
    /**
     * @Column(type="float", nullable=true)
     */
    public $ShipHandlingFirstItem;
    /**
     * @Column(type="float", nullable=true)
     */
    public $ShipRateAdditionalItem;
    /**
     * @Column(type="float", nullable=true)
     */
    public $ShipHandlingAdditionalItem;
}
