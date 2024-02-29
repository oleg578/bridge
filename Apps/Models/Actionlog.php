<?php

namespace Apps\Models;

/**
 * Actionlog model
 */
class Actionlog extends ModelBase
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
    public $usermail;
    /**
     * @Column(type="string", nullable=false)
     */
    public $action;

    public function initialize()
    {
        $this->skipAttributesOnCreate(['id']);
    }
}
