<?php
namespace Apps\Caservice;

/**
 * Admin class for ChannelAdvisor
 */
class Admin extends BaseSoap
{

    protected $wsdl = 'https://api.channeladvisor.com/ChannelAdvisorAPI/v7/AdminService.asmx?WSDL';

    public function GetAuthorizationList()
    {
        $this->client = new \SoapClient($this->wsdl, ['trace' => true]);

        $headers = [
            'DeveloperKey' => $this->dev_key,
            'Password' => $this->password,
        ];
        $header = new \SoapHeader($this->ns, 'APICredentials', $headers);
        $this->client->__setSoapHeaders($header);

        $response = $this->client->__soapCall('GetAuthorizationList', [
            'GetAuthorizationList' => ['localID' => $this->localId],
        ]);
        return $response;
    }

    public function RequestAccess($localid = null)
    {
        if ($localid) {
            $this->localId = $localid;
        }
        $this->client = new \SoapClient($this->wsdl, ['trace' => true]);

        $headers = [
            'DeveloperKey' => $this->dev_key,
            'Password' => $this->password,
        ];
        $header = new \SoapHeader($this->ns, 'APICredentials', $headers);
        $this->client->__setSoapHeaders($header);

        $response = $this->client->__soapCall('RequestAccess', [
            'RequestAccess' => ['localID' => $this->localId],
        ]);
        return $response;
    }
}
