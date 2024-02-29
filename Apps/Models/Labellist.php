<?php

namespace Apps\Models;

/**
 * Labellist model
 */
class Labellist extends ModelBase
{
    /**
     * @Primary
     * @Column(type="integer", nullable=false)
     */
    public $id;
    /**
     * @Column(type="string", nullable=false)
     */
    public $name;

    public function initialize()
    {
        $this->skipAttributesOnCreate(['id']);
    }
}
