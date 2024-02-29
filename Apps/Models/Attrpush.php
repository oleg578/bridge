<?php

namespace Apps\Models;

/**
 * Attrpush model.
 */
class Attrpush extends ModelBase
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
     * @Column(type="integer", nullable=true)
     */
    public $Push;

    public function initialize()
    {
        //$this->skipAttributesOnCreate(['id']);
    }

    public function beforeValidationOnCreate()
    {
        $this->id = md5($this->Name);
    }
    public function beforeValidationOnUpdate()
    {
        $this->id = md5($this->Name);
    }
}
