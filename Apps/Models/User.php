<?php

namespace Apps\Models;

use Phalcon\Mvc\Model\Validator\Uniqueness;

/**
 * User model
 */
class User extends ModelBase
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
    public $nick;

    /**
     * @Column(type="string", nullable=false)
     */
    public $role;

    /**
     * @Column(type="string", nullable=false)
     */
    public $password;

    /**
     * @Column(type="integer", nullable=true)
     */
    public $isblocked;

    public function validation()
    {
        $this->validate(new Uniqueness([
            'field' => 'email',
            'message' => 'email duplicate',
        ]));

        $this->validate(new Uniqueness([
            'field' => 'nick',
            'message' => 'nick duplicate',
        ]));

        return $this->validationHasFailed() != true;
    }

    public function initialize()
    {
        // INVENT database
        $this->setConnectionService('db_user');
    }
}
