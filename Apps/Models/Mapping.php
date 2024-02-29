<?php

namespace Apps\Models;

/**
 * Mapping model
 */
class Mapping extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $mfgcode;

    /**
     * @Column(type="integer", nullable=true)
     */
    public $map;
}
