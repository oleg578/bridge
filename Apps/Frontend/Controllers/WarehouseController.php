<?php

namespace Apps\Frontend\Controllers;

use Apps\Models\Bundle;
use Apps\Models\Product;

/**
 * Description of WarehouseController.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/warehouse")
 */
class WarehouseController extends ControllerBase
{
    protected $fontpath = "/usr/share/fonts/truetype/droid/DroidSansMono.ttf";
    //protected $fontpath = "/usr/share/fonts/TTF/DroidSansMono.ttf";

    /**
     * @Get("/{sku}")
     */
    public function warehouseAction($sku)
    {
        $this->view->disable();
        /*$p_ar = \explode(".", $sku);
        if ($p_ar[1] == "png") {
            $sku = $p_ar[0];
        }*/
        
        $bundle_sql = "select
        bundle.parentSku,
        bundle.Quantity,
        bundle.childSku,
        IF(LENGTH(product.WarehouseLocation)=0,'',product.WarehouseLocation) as WarehouseLocation
        from
        bundle
        inner join product on (bundle.childSku = product.Sku)
        where
        parentSku=?";
        if ($this->_isbundle($sku)) {
            $res = $this->db->query($bundle_sql, [$sku]);
            $res->setFetchMode(\Phalcon\Db::FETCH_OBJ);
            $rows = $res->fetchAll();
            
            $this->_buildBundleImage($rows);
            
            return;
        }
        $product = Product::findFirst("Sku='{$sku}'");
        if ($product) {
            $this->_buildSingleImage($product);
        }
        return;
    }

    protected function _buildBundleImage($rows)
    {
        $fontNum = 2;
        //found max len of sku and warehouselocation
        $maxSku = 0;
        $maxWh = 0;
        $skus =[];
        $whs = [];
        foreach ($rows as $row) {
            $skus[] = strlen((string)$row->childSku);
            $whs[] = strlen((string)$row->WarehouseLocation);
        }
        

        $maxSku = max($skus);
        $maxWh = max($whs);
        if ($maxWh < 4) {
            $maxWh =4;
        }
        
        $lines = [];
        foreach ($rows as $row) {
            $lines[] = $this->_buildStr($row, $maxSku, $maxWh);
        }
        $maxLine = $this->_maxline($lines);
        $r = imageftbbox(10, 0, $this->fontpath, $maxLine);
        
        $imgWidth = $r[2]-$r[0]+10;
        $imgHeight = ($r[1]-$r[7]+8)*count($rows);
        
        $Ypos = ($imgHeight - $imgHeight) /2;
        
        $im = imagecreatetruecolor($imgWidth, $imgHeight);
        $back_color=imagecolorallocate($im, 255, 255, 255);
        imagefill($im, 0, 0, $back_color);
        $text_color = imagecolorallocate($im, 0, 0, 0);
        $y= \imagefontheight($fontNum)+2;
        
        foreach ($lines as $line) {
            imagettftext($im, 10, 0, 0, $y, $text_color, $this->fontpath, $line);
            $y += 21;
        }

        $this->response->setHeader('Content-Type', 'image/png');

        // Output the image
        imagepng($im);

        // Free up memory
        imagedestroy($im);
    }

    protected function _maxline($lines)
    {
        $maxl = 0;
        $l = "";
        foreach ($lines as $k => $line) {
            if (strlen($line)>$maxl) {
                $maxl = strlen($line);
                $l = $line;
            }
        }
        return $l;
    }

    protected function _buildStr($row, $maxSku, $maxWh)
    {
        $out = $this->_complement($row->Quantity, 4);
        $out = $out . "    ";
        $out = $out . $this->_complementRight($row->childSku, $maxSku);
        $out = $out . "    ";
        if (strlen($row->WarehouseLocation) === 0) {
            $row->WarehouseLocation = "NULL";
        }
        $out = $out . $this->_complement($row->WarehouseLocation, $maxWh);
        
        return $out;
    }

    protected function _complement($val, $count)
    {
        $valstr = (string)$val;
        while (\strlen($valstr) < $count) {
            $valstr = " " . $valstr;
        }
        return $valstr;
    }

    protected function _complementRight($val, $count)
    {
        $valstr = (string)$val;
        while (\strlen($valstr) < $count) {
            $valstr = $valstr ." ";
        }
        return $valstr;
    }

    protected function _buildSingleImage($product)
    {
        $fontNum = 2;
        //$line = $product->Sku;
        //$line = $line . "  ";
        //$line = $line . $product->Quantity;
        //$line = $line . "  ";
        $line="";
        if (strlen($product->WarehouseLocation) === 0) {
            $product->WarehouseLocation = "NULL";
        }
        $line = $line . $product->WarehouseLocation;
       
        $r = imageftbbox(10, 0, $this->fontpath, $line);
        
        $imgWidth = $r[2]-$r[0]+10;
        $imgHeight = $r[1]-$r[7]+10;

        $im = imagecreatetruecolor($imgWidth, $imgHeight);
        $back_color=imagecolorallocate($im, 255, 255, 255);
        imagefill($im, 0, 0, $back_color);
        $text_color = imagecolorallocate($im, 0, 0, 0);
        
        imagettftext($im, 10, 0, imagefontwidth($fontNum), 16, $text_color, $this->fontpath, $line);

        $this->response->setHeader('Content-Type', 'image/png');

        // Output the image
        imagepng($im);

        // Free up memory
        imagedestroy($im);
    }

    protected function _isbundle($sku)
    {
        $product = Bundle::findFirst("parentSku='{$sku}'");
        if (!$product) {
            return false;
        }
        return true;
    }
}
