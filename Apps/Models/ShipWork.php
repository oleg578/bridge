<?php

namespace Apps\Models;

/**
 * ShipWork model.
 */
/**
 * +--------------------+---------------+------+-----+---------+-------+
 * | Field              | Type          | Null | Key | Default | Extra |
 * +--------------------+---------------+------+-----+---------+-------+
 * | orderid            | varchar(50)   | YES  | MUL | NULL    |       |
 * | qty                | decimal(19,4) | YES  |     | NULL    |       |
 * | sku                | varchar(50)   | YES  |     | NULL    |       |
 * | shippingcost       | decimal(19,4) | YES  |     | NULL    |       |
 * | weight             | double        | YES  |     | NULL    |       |
 * | shippingpostalcode | varchar(20)   | YES  |     | NULL    |       |
 * | shippingdate       | timestamp     | YES  |     | NULL    |       |
 * | trackingnumber     | varchar(50)   | YES  |     | NULL    |       |
 * | processed          | int(11)       | YES  |     | NULL    |       |
 * | voided             | int(11)       | YES  |     | NULL    |       |
 * +--------------------+---------------+------+-----+---------+-------+
 */
class ShipWork extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $orderid;
    /**
     * @Column(type="float", nullable=true)
     */
    public $qty;
    /**
     * @Column(type="string", nullable=true)
     */
    public $sku;
    /**
     * @Column(type="float", nullable=true)
     */
    public $shippingcost;
    /**
     * @Column(type="float", nullable=true)
     */
    public $weight;
    /**
     * @Column(type="string", nullable=true)
     */
    public $shippingpostalcode;
    /**
     * @Column(type="string", nullable=true)
     */
    public $shippingdate;
    /**
     * @Column(type="ctring", nullable=true)
     */
    public $trackingnumber;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $processed;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $voided;

    protected $table = 'ShipWorks';

    public function getSource()
    {
        return $this->table;
    }
}
