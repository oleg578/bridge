<?php

namespace Apps\Api\Controllers;

/**
 * Description of Image.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/image")
 */
class ImageController extends ControllerBase
{
    /**
     * @Get("/verifyurl")
     */
    public function VerifyurlAction()
    {
        $url = trim($this->request->get('imgurl'), "'");
        if ($url) {
            if (strlen($url) > 7) {
                stream_context_set_default([
                    'http' => [
                        'method' => 'HEAD',
                    ],
                ]);
                $headers = @get_headers($url, 1);

                if ($headers) {
                    if (isset($headers[0]) && $headers[0] == 'HTTP/1.1 200 OK') {
                        if (isset($headers["Content-Type"]) && substr($headers["Content-Type"], 0, 5) == 'image') {
                            $this->content = json_encode(['result' => true]);
                            return;
                        }
                    }
                }
            }
        }
        $this->content = json_encode(['result' => false]);
        return;
    }
}
