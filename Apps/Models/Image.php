<?php

namespace Apps\Models;

/**
 * Image model.
 */
class Image extends ModelBase
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
    public $PlacementName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $FolderName;
    /**
     * @Column(type="string", nullable=true)
     */
    public $URL;
    /**
     * @Column(type="integer", nullable=true)
     */
    public $IsValid;
}
