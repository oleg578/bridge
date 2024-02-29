<?php

namespace Apps\Models;

/**
 * Dccenter model.
 */
class Dccenter extends ModelBase
{
    /**
     * @Primary
     * @Identity
     * @Column(type="integer", nullable=false)
     */
    public $id;
    /**
     * @Column(type="string", nullable=false)
     */
    public $DCCenter;
    /**
     * @Column(type="integer", nullable=false)
     */
    public $LocationId;
    /**
     * @Column(type="string", nullable=true)
     */
    public $DCType;

    public function initialize()
    {
        $this->skipAttributesOnCreate(['id']);
    }
}
