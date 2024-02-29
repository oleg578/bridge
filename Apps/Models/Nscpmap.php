<?php

namespace Apps\Models;

/**
 * Nscpmap model
 */
class Nscpmap extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $Sku;

    /**
     * @Column(type="double", nullable=false)
     */
    public $Price;
}