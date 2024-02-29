<?php

namespace Apps\Frontend\Controllers;

/**
 * Description of Image.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/image")
 */
class ImageController extends ControllerBase
{
    /**
     * @Get("/verifyurl")
     */
    public function VerifyurlAction()
    {
        $this->view->disable();
        $url = $this->request->get('imgurl');
        $url = trim($url, "'");
        if ($url) {
            if (strlen($url) > 7) {
                stream_context_set_default([
                    'http' => [
                        'method' => 'HEAD',
                    ],
                ]);
                $headers = @get_headers($url, 1);
                //var_dump($headers);die;
                if ($headers) {
                    if (isset($headers[0]) && strtoupper(substr(trim($headers[0]), -6)) == '200 OK') {
                        if (isset($headers["Content-Type"]) && substr($headers["Content-Type"], 0, 5) == 'image') {
                            stream_context_set_default([
                                'http' => [
                                    'method' => 'GET',
                                ],
                            ]);
                            $img = @file_get_contents($url);
                            $this->response->setHeader("Content-Type", $headers["Content-Type"]);
                            $this->response->setHeader("Content-Length", strlen($img));
                            $this->response->setContent($img);
                            $this->response->send();
                        } else {
                            $img = @file_get_contents($this->config->noimage_path . 'noimage.png', true, null);
                            $this->response->setHeader("Content-Type", "image/png");
                            $this->response->setHeader("Content-Length", strlen($img));
                            $this->response->setContent($img);
                            $this->response->send();
                        }
                    } else {
                        $img = @file_get_contents($this->config->noimage_path . 'noimage.png', true, null);
                        $this->response->setHeader("Content-Type", "image/png");
                        $this->response->setHeader("Content-Length", strlen($img));
                        $this->response->setContent($img);
                        $this->response->send();
                    }
                } else {
                    $img = @file_get_contents($this->config->noimage_path . 'noimage.png', true, null);
                    $this->response->setHeader("Content-Type", "image/png");
                    $this->response->setHeader("Content-Length", strlen($img));
                    $this->response->setContent($img);
                    $this->response->send();
                }
            } else {
                $img = @file_get_contents($this->config->noimage_path . 'noimage.png', true, null);
                $this->response->setHeader("Content-Type", "image/png");
                $this->response->setHeader("Content-Length", strlen($img));
                $this->response->setContent($img);
                $this->response->send();
            }

        } else {
            $img = @file_get_contents($this->config->noimage_path . 'noimage.png', true, null);
            $this->response->setHeader("Content-Type", "image/png");
            $this->response->setHeader("Content-Length", strlen($img));
            $this->response->setContent($img);
            $this->response->send();
        }
    }
}
