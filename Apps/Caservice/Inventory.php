<?php
namespace Apps\Caservice;

/**
 * Admin class for ChannelAdvisor
 */
class Inventory extends BaseSoap
{

    protected $wsdl = 'https://api.channeladvisor.com/ChannelAdvisorAPI/v7/InventoryService.asmx?WSDL';

    public function __construct()
    {
        //set Credentials
        $this->client = new \SoapClient($this->wsdl, [
            'trace' => false,
            'keep_alive' => false,
            'cache_wsdl' => WSDL_CACHE_NONE,
        ]);

        $headers = [
            'DeveloperKey' => $this->dev_key,
            'Password' => $this->password,
        ];
        $header = new \SoapHeader($this->ns, 'APICredentials', $headers);
        $this->client->__setSoapHeaders($header);
    }

    /**
     * SynchInventoryItemList
     * @param array $inventoryItems items pool
     */
    public function SynchInventoryItemList($inventoryItems)
    {
        //create InventoryItemSubmit[]
        $inventory_item_submit_pool = [
            'InventoryItemSubmit' => $inventoryItems,
        ];
        //call
        $response = $this->client->__soapCall('SynchInventoryItemList', [
            'SynchInventoryItemList' => [
                'accountID' => $this->accountId,
                'itemList' => $inventory_item_submit_pool,
            ],
        ]);
        //debug
        //echo ($this->client->__getLastRequest());die;
        return $response;
    }

    /**
     * SynchInventoryItem
     * @param array $inventoryItem
     */
    public function SynchInventoryItem($inventoryItem)
    {
        //call
        $response = $this->client->__soapCall('SynchInventoryItem', [
            'SynchInventoryItem' => [
                'accountID' => $this->accountId,
                'item' => $inventoryItem,
            ],
        ]);
        //debug
        //echo ($this->client->__getLastRequest());die;
        return $response;
    }

    /**
     * DeleteInventoryItem
     * @param string $sku
     */
    public function DeleteInventoryItem($sku)
    {
        //call
        $response = $this->client->__soapCall('DeleteInventoryItem', [
            'DeleteInventoryItem' => [
                'accountID' => $this->accountId,
                'sku' => $sku,
            ],
        ]);
        //debug
        //echo ($this->client->__getLastRequest());die;
        return $response;
    }

    /**
     * GetInventoryItemList
     * @param array $inventoryItems sku array
     */
    public function GetInventoryItemList($inventoryItems)
    {
        //call
        $response = $this->client->__soapCall('GetInventoryItemList', [
            'GetInventoryItemList' => [
                'accountID' => $this->accountId,
                'skuList' => $inventoryItems,
            ],
        ]);
        //debug
        //echo ($this->client->__getLastRequest());die;
        return $response;
    }

    /**
     * GetFilteredInventoryItemList
     * @param array $inventoryItems items pool
     */
    public function GetFilteredInventoryItemList($itemCriteria, $sortDirection = 'Ascending')
    {
        $InventoryItemDetailLevel = [
            'IncludeQuantityInfo' => true,
            'IncludePriceInfo' => true,
            'IncludeClassificationInfo' => true,
        ];
        //call
        $response = $this->client->__soapCall('GetFilteredInventoryItemList', [
            'GetFilteredInventoryItemList' => [
                'accountID' => $this->accountId,
                'itemCriteria' => $itemCriteria,
                'detailLevel' => $InventoryItemDetailLevel,
                'sortField' => 'Sku',
                'sortDirection' => $sortDirection,
            ],
        ]);
        return $response;
    }

    /**
     * GetFilteredSkuList
     * @param array $itemCriteria
     */
    public function GetFilteredSkuList($itemCriteria, $sortDirection = 'Ascending')
    {
        $InventoryItemDetailLevel = [
            'IncludeQuantityInfo' => false,
            'IncludePriceInfo' => false,
            'IncludeClassificationInfo' => false,
        ];
        //call
        try {
            $response = $this->client->__soapCall('GetFilteredSkuList', [
                'GetFilteredSkuList' => [
                    'accountID' => $this->accountId,
                    'itemCriteria' => $itemCriteria,
                    'detailLevel' => $InventoryItemDetailLevel,
                    'sortField' => 'Sku',
                    'sortDirection' => $sortDirection,
                ],
            ]);
        } catch (\Exception $e) {
            return [
                "result" => 'fault',
                'reason' => $e->getMessage(),
            ];
        }

        //debug
        //echo ($this->client->__getLastRequest());die;
        return $response;
    }

    /**
     * GetInventoryItemStoreInfo
     * @param
     */
    public function GetInventoryItemStoreInfo($sku)
    {
        //call
        $response = $this->client->__soapCall('GetInventoryItemStoreInfo', [
            'GetInventoryItemStoreInfo' => [
                'accountID' => $this->accountId,
                'sku' => $sku,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * GetInventoryItemImageList
     * @param
     */
    public function GetInventoryItemImageList($sku)
    {
        //call
        $response = $this->client->__soapCall('GetInventoryItemImageList', [
            'GetInventoryItemImageList' => [
                'accountID' => $this->accountId,
                'sku' => $sku,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * GetInventoryItemShippingInfo
     * @param
     */
    public function GetInventoryItemShippingInfo($sku)
    {
        //call
        $response = $this->client->__soapCall('GetInventoryItemShippingInfo', [
            'GetInventoryItemShippingInfo' => [
                'accountID' => $this->accountId,
                'sku' => $sku,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * GetInventoryItemVariationInfo
     * @param
     */
    public function GetInventoryItemVariationInfo($sku)
    {
        //call
        $response = $this->client->__soapCall('GetInventoryItemVariationInfo', [
            'GetInventoryItemVariationInfo' => [
                'accountID' => $this->accountId,
                'sku' => $sku,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * GetInventoryQuantity
     * @param
     */
    public function GetInventoryQuantity($sku)
    {
        //call
        $response = $this->client->__soapCall('GetInventoryQuantity', [
            'GetInventoryQuantity' => [
                'accountID' => $this->accountId,
                'sku' => $sku,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * GetInventoryItemQuantityInfo
     * @param string $sku
     */
    public function GetInventoryItemQuantityInfo($sku)
    {
        //call
        $response = $this->client->__soapCall('GetInventoryItemQuantityInfo', [
            'GetInventoryItemQuantityInfo' => [
                'accountID' => $this->accountId,
                'sku' => $sku,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * GetInventoryQuantityList
     * @param array $skulist
     */
    public function GetInventoryQuantityList($skulist)
    {
        //call
        $response = $this->client->__soapCall('GetInventoryQuantityList', [
            'GetInventoryQuantityList' => [
                'accountID' => $this->accountId,
                'skuList' => $skulist,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * DoesSkuExist
     * @param string $sku
     */
    public function DoesSkuExist($sku)
    {
        //call
        $response = $this->client->__soapCall('DoesSkuExist', [
            'DoesSkuExist' => [
                'accountID' => $this->accountId,
                'sku' => $sku,
            ],
        ]);
        //debug
        //var_dump($this->client->__getLastRequestHeaders());
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * DoesSkuExistList
     * @param array $skulist
     */
    public function DoesSkuExistList($skulist)
    {
        //call
        $response = $this->client->__soapCall('DoesSkuExistList', [
            'DoesSkuExistList' => [
                'accountID' => $this->accountId,
                'skuList' => $skulist,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * GetClassificationConfigurationInformation
     *
     */
    public function GetClassificationConfigurationInformation()
    {
        //call
        $response = $this->client->__soapCall('GetClassificationConfigurationInformation', [
            'GetClassificationConfigurationInformation' => [
                'accountID' => $this->accountId,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * GetDistributionCenterList
     *
     */
    public function GetDistributionCenterList()
    {
        //call
        $response = $this->client->__soapCall('GetDistributionCenterList', [
            'GetDistributionCenterList' => [
                'accountID' => $this->accountId,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * UpdateInventoryItemQuantityAndPrice
     * @param  array $InventoryItemQuantityAndPrice
     * [
     *     "Sku"                        string required
     *     "DistributionCenterCode"     string required
     *     "Quantity"                   int
     *     "UpdateType"                 case of (Absolute, Relative, Available, InStock, UnShipped /recommended/)
     *     "PriceInfo"                  [
     *                                     "Cost" => (double) value,
     *                                     "StorePrice" => (double) value
     *                                  ]
     *
     * ]
     * EXAMPLE:
     *   $InventoryItemQuantityAndPrice = [
     *       "Sku" => '2530009_POL',
     *       "DistributionCenterCode" => 'SANDUSKY',
     *       "Quantity" => 12,
     *       "UpdateType" => 'Available',
     *       "PriceInfo" => [
     *           "Cost" => 123.45,
     *           "StorePrice" => 321.45,
     *       ],
     *   ];
     */
    public function UpdateInventoryItemQuantityAndPrice($InventoryItemQuantityAndPrice)
    {
        //call
        $response = $this->client->__soapCall('UpdateInventoryItemQuantityAndPrice', [
            'UpdateInventoryItemQuantityAndPrice' => [
                'accountID' => $this->accountId,
                'itemQuantityAndPrice' => $InventoryItemQuantityAndPrice,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * UpdateInventoryItemQuantityAndPriceList
     * see UpdateInventoryItemQuantityAndPrice
     * @param  array of $InventoryItemQuantityAndPrice
     * [
     *     "Sku"                        string required
     *     "DistributionCenterCode"     string required
     *     "Quantity"                   int
     *     "UpdateType"                 case of (Absolute, Relative, Available, InStock, UnShipped /recommended/)
     *     "PriceInfo"                  [
     *                                     "Cost" => (double) value,
     *                                     "StorePrice" => (double) value
     *                                  ]
     *
     * ]
     * EXAMPLE:
     * $InventoryItemQuantityAndPrice1 = [
     *             "Sku" => '2530009_POL',
     *             "DistributionCenterCode" => 'SANDUSKY',
     *             "Quantity" => 12,
     *             "UpdateType" => 'Available',
     *             "PriceInfo" => [
     *                 "Cost" => 123.45,
     *                 "StorePrice" => 321.45,
     *             ],
     *         ];
     *         $InventoryItemQuantityAndPrice2 = [
     *             "Sku" => '2530029_POL',
     *             "DistributionCenterCode" => 'SANDUSKY',
     *             "Quantity" => 123,
     *             "UpdateType" => 'Available',
     *             "PriceInfo" => [
     *                 "Cost" => 12378.45,
     *                 "StorePrice" => 69321.45,
     *             ],
     *         ];
     *         $InventoryItemQuantityAndPriceArray = [
     *             $InventoryItemQuantityAndPrice1,
     *             $InventoryItemQuantityAndPrice2,
     *         ];
     */
    public function UpdateInventoryItemQuantityAndPriceList($InventoryItemQuantityAndPriceArray)
    {

        //call
        $response = $this->client->__soapCall('UpdateInventoryItemQuantityAndPriceList', [
            'UpdateInventoryItemQuantityAndPriceList' => [
                'accountID' => $this->accountId,
                'itemQuantityAndPriceList' => $InventoryItemQuantityAndPriceArray,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * AssignLabelListToInventoryItemList
     *
     * @param  $labelList               array of string
     * @param  $skuList                 array of string
     * @param  $createLabelIfNotExist   boolean
     * @param  $assignReasonDesc        string specify reason
     * EXAMPLE:
     *
     * $labelList = ['Amazon Seller Central - US', 'Special label'];
     * $createLabelIfNotExist = true;
     * $skuList = ['2530009_POL', '2530029_POL'];
     * $assignReasonDesc = 'test descriptiton string';
     */
    public function AssignLabelListToInventoryItemList($labelList, $skuList, $createLabelIfNotExist = true, $assignReasonDesc = '')
    {
        //call
        $response = $this->client->__soapCall('AssignLabelListToInventoryItemList', [
            'AssignLabelListToInventoryItemList' => [
                'accountID' => $this->accountId,
                'labelList' => $labelList,
                'createLabelIfNotExist' => $createLabelIfNotExist,
                'skuList' => $skuList,
                'assignReasonDesc' => $assignReasonDesc,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * RemoveLabelListFromInventoryItemList
     *
     * @param  $labelList               array of string
     * @param  $skuList                 array of string
     * @param  $removeReasonDesc        string specify reason
     * EXAMPLE:
     *
     * $labelList = ['Amazon Seller Central - US', 'Special label'];
     * $skuList = ['2530009_POL', '2530029_POL'];
     * $assignReasonDesc = 'test descriptiton string remove';
     */
    public function RemoveLabelListFromInventoryItemList($labelList, $skuList, $assignReasonDesc = '')
    {
        //call
        $response = $this->client->__soapCall('RemoveLabelListFromInventoryItemList', [
            'RemoveLabelListFromInventoryItemList' => [
                'accountID' => $this->accountId,
                'labelList' => $labelList,
                'skuList' => $skuList,
                'removeReasonDesc' => $assignReasonDesc,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * GetInventoryItemAttributeList
     * @param string $sku
     */
    public function GetInventoryItemAttributeList($sku)
    {
        //call
        try {
            $response = $this->client->__soapCall('GetInventoryItemAttributeList', [
                'GetInventoryItemAttributeList' => [
                    'accountID' => $this->accountId,
                    'sku' => $sku,
                ],
            ]);
        } catch (\Exception $e) {
            return [
                "result" => 'fault',
                'reason' => $e->getMessage(),
            ];
        }

        //debug
        //echo $this->client->__getLastRequest();die;
        //var_dump($this->client->__getLastRequestHeaders());
        //echo ($this->client->__getLastRequest());die;
        return $response;
    }

    /**
     * AddUpsellRelationship
     * @param string $parentSku
     * @param array childList array
     *
     * EXAMPLE :
     * $parentSku = '2530009_POL'
     * $childList = [
     *     ["SKU" => '0450040_POL', "Quantity" => 5, "SalePrice" => 123],
     *     ["SKU" => '0450041_POL', "Quantity" => 6, "SalePrice" => 124],
     * ]
     */
    public function AddUpsellRelationship($parentSku, $childList)
    {
        $upsellInfoList = [
            'InventoryUpsellInfoSubmit' => [
                "ParentSKU" => $parentSku,
                "ChildItemList" => $childList,
            ],

        ];
        //call
        $response = $this->client->__soapCall('AddUpsellRelationship', [
            'AddUpsellRelationship' => [
                'accountID' => $this->accountId,
                'upsellInfoList' => $upsellInfoList,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * GetUpsellRelationship
     * @param array parentSKUList
     *
     */
    public function GetUpsellRelationship($parentSKUList)
    {
        //call
        $response = $this->client->__soapCall('GetUpsellRelationship', [
            'GetUpsellRelationship' => [
                'accountID' => $this->accountId,
                'parentSKUList' => $parentSKUList,
            ],
        ]);
        //debug
        //echo $this->client->__getLastRequest();die;
        return $response;
    }

    /**
     * DeleteUpsellRelationship
     * @param string parentSKU
     * @param array $childSkuList array of string
     */
    public function DeleteUpsellRelationship($parentSku, $childSKUList)
    {
        //call
        $response = $this->client->__soapCall('DeleteUpsellRelationship', [
            'DeleteUpsellRelationship' => [
                'accountID' => $this->accountId,
                'parentSKU' => $parentSku,
                'childSKUList' => $childSKUList,
            ],
        ]);
        return $response;
    }
}
