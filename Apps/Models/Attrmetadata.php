<?php

namespace Apps\Models;

/**
 * Attrmetadata model.
 * attributes names blocked.
 */
class Attrmetadata extends ModelBase
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
     * @Column(type="string", nullable=false)
     */
    public $Type;

    /**
     * @Column(type="string", nullable=true)
     */
    public $List;
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
