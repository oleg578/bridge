<?php

namespace Apps\Models;

/**
 * Useractivity model
 */
class Useractivity extends \Phalcon\Mvc\Model
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
    public $email;
    /**
     * @Column(type="string", nullable=false)
     */
    public $updated_at;

    protected $table = 'user_activity';

    public function getSource()
    {
        return $this->table;
    }

    public function initialize()
    {
        // Bridge database
        $this->setConnectionService('db');
        $this->skipAttributesOnCreate(['id']);
    }

    public function beforeValidationOnCreate()
    {
        $this->updated_at = date('Y-m-d H:i:s');
    }

    public function beforeValidationOnUpdate()
    {
        $this->updated_at = date('Y-m-d H:i:s');
    }
}
