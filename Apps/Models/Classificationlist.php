<?php

namespace Apps\Models;

/**
 * Classificationlist model.
 */
class Classificationlist extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $id;
    /**
     * @Column(type="string", nullable=false)
     */
    public $name;
}
