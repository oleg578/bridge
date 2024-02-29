<?php

namespace Apps\Models;

/**
 * Attribute model.
 */
class Attribute extends ModelBase
{
    /**
     * @Primary
     * @Column(type="string", nullable=false)
     */
    public $id;
    /**
     * @Column(type="string", nullable=false)
     */
    public $Sku;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Classification;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Name;
    /**
     * @Column(type="string", nullable=true)
     */
    public $Value;

    public function initialize()
    {
        $this->hasOne('Name', "\Apps\Models\Attrblocked", 'Name', [
            'alias' => 'blocked',
            'reusable' => \TRUE,
            'foreignKey' => [
                'allowNulls' => true,
                'action' => \Phalcon\Mvc\Model\Relation::ACTION_CASCADE,
            ],
        ]);
        $this->hasOne('Name', "\Apps\Models\Attrmetadata", 'Name', [
            'alias' => 'attrmetadata',
            'reusable' => \TRUE,
            'foreignKey' => [
                'allowNulls' => true,
                'action' => \Phalcon\Mvc\Model\Relation::ACTION_CASCADE,
            ],
        ]);
    }
    /**
     * @return \Apps\Models\Attrblocked
     */
    public function getBlocked($parameters = null)
    {
        return $this->getRelated('blocked', $parameters);
    }
}
