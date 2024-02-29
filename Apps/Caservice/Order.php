<?php
namespace Apps\Caservice;

/**
 * Order service
 */
class Order extends BaseSoap
{

    protected $wsdl = 'https://api.channeladvisor.com/ChannelAdvisorAPI/v7/OrderService.asmx?WSDL';

    public function __construct()
    {
        //set Credentials
        $this->client = new \SoapClient($this->wsdl, [
            'trace' => true,
            'keep_alive' => true,
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
     * GetOrderList
     * @param array OrderCriteria
     */
    public function GetOrderList($orderCriteria = [])
    {
        $orderCriteria = [
            'OrderCreationFilterBeginTimeGMT' => '2015-06-06T00:00:00',
            'OrderCreationFilterEndTimeGMT' => '2015-06-07T00:00:00',
            //'ShippingStatusFilter' => 'Unshipped',
            //'PaymentStatusFilter' => 'Failed',
            'OrderStateFilter' => 'Active',
            'DetailLevel' => 'Complete',
            'PageNumberFilter' => 1,
            'PageSize' => 20,
        ];
        //call
        $response = $this->client->__soapCall('GetOrderList', [
            'GetOrderList' => [
                'accountID' => $this->accountId,
                'orderCriteria' => $orderCriteria,
            ],
        ]);
        //debug
        //echo ($this->client->__getLastRequest());die;
        return $response;
    }

}
