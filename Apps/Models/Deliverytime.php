<?php

namespace Apps\Models;

/**
 * Deliverytime model
 */
class Deliverytime extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $mfgcode;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $stockinstock;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $stockoutofstock;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $otherinstock;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $otheroutofstock;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $MinQty;
}
