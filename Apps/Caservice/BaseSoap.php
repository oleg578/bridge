<?php
namespace Apps\Caservice;

/**
 * BaseSoap class for ChannelAdvisor
 */
class BaseSoap
{
    protected $dev_key = '*************************';
    protected $password = '*************************';
    protected $client;
    protected $wsdl;
    protected $ns = 'http://api.channeladvisor.com/webservices/';
    /**
     * test account
     */
    /*
     * real account
     */
    protected $localId = 12345678; //real account
    protected $accountId = '************************'; //real account
    protected $accountName = 'TMC MARKETING, INC. - US';
    /* real account end*/
    protected $accountType = 'merchant';
    protected $resourceName = '/channeladvisorapi';

    /**
     * obj2array
     * @param   $obj StdClass
     * @return array
     */
    protected function obj2array($obj)
    {
        $out_array = [];
        foreach ($obj as $key => $value) {
            if (is_object($value)) {
                $out_array[$key] = $this->obj2array($value);
            } else {
                $out_array[$key] = $value;
            }
        }
        return $out_array;
    }
}
