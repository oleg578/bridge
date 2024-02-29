<?php

namespace Apps\Models;

/**
 * Attrblocked model.
 * attributes names blocked.
 */
class Attrblocked extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $id;
    /**
     * @Column(type="string", nullable=false)
     */
    public $Name;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Deleted;

    public function initialize()
    {
    }

    public function beforeValidationOnCreate()
    {
        $this->id = md5($this->Name);
    }
}
