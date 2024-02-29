<?php

namespace Apps\Models;

/**
 * Mfgmap model
 */
class Mfgmap extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $oldmfg;

    /**
     * @Column(type="string", nullable=true)
     */
    public $newmfg;
}
