<?php

namespace Apps\Models;

/**
 * Bundle model.
 */
class Bundle extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $id;
    /**
     * @Column(type="string", nullable=false)
     */
    public $parentSku;
    /**
     * @Column(type="string", nullable=false)
     */
    public $childSku;
    /**
     * @Column(type="integer", nullable=false)
     */
    public $Quantity;
}
