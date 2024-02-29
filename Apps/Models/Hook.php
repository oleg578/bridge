<?php

namespace Apps\Models;

/**
 * Hook model.
 */
class Hook extends ModelBase
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
    public $ProcName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Type;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $Active;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Description;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $Nice;

    public function initialize()
    {
        //$this->skipAttributesOnCreate(['id']);
    }

    public function beforeValidationOnCreate()
    {
        $this->id = md5($this->ProcName.$this->Type);
    }
    public function beforeValidationOnUpdate()
    {
        $this->id = md5($this->ProcName.$this->Type);
    }
}
