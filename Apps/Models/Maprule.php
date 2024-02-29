<?php

namespace Apps\Models;

/**
 * Maprule model
 */
class Maprule extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $Brand;

    /**
     * @Column(type="float", nullable=false)
     */
    public $maprule;
}
