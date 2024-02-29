<?php

namespace Apps\Models;

/**
 * Internalupc model.
 */
class Internalupc extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $UPC;
    /**
     * @Column(type="string", nullable=false)
     */
    public $MFGCODE;
    /**
     * @Column(type="string", nullable=false)
     */
    public $Sku;

    protected $table = 'internal_upc';

    public function getSource()
    {
        return $this->table;
    }
}
