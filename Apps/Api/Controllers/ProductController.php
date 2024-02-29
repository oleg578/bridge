<?php

namespace Apps\Api\Controllers;

use Apps\Models\Product;
use Apps\Models\Labellist;
use Apps\Models\Classificationlist;
use Apps\Models\Shipping;
use Apps\Models\Attribute;
use Apps\Models\Attrblocked;
use Apps\Models\Attrmetadata;
use Apps\Models\Image;
use Apps\Models\Actionlog;
use Phalcon\Mvc\Model\Transaction\Manager as TxManager;

/**
 * Description of Product.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/api/product")
 */
class ProductController extends ControllerBase
{
    /**
     * getProducts.
     *
     * @param int $pagenum the page number
     *
     * @return [array] paginator array
     * @Get("/get/page")
     */
    public function getProductsAction()
    {
        $criteria_str = null;
        $create_date_range_str = '';
        $update_date_range_str = '';
        $daterange_str = '';
        $createdatefrom = '';
        $createdateto = '';
        $updatedatefrom = '';
        $updatedateto = '';
        $date_now = new \DateTime();
        $date_now_str = $date_now->format(\DateTime::ISO8601);
        $order = 'UpdatedAt DESC';
        // if empty $criteria is null
        $criteria = json_decode($this->session->get('product_search_criteria'));
        // trim dates
        if (isset($criteria->createdatefrom) && $criteria->createdatefrom !== null) {
            $createdatefrom = $this->_trimDate($criteria->createdatefrom);
        }
        if (isset($criteria->createdateto) && $criteria->createdateto !== null) {
            $createdateto = $this->_trimDate($criteria->createdateto);
        }
        if (isset($criteria->updatedatefrom) && $criteria->updatedatefrom !== null) {
            $updatedatefrom = $this->_trimDate($criteria->updatedatefrom);
        }
        if (isset($criteria->updatedateto) && $criteria->updatedateto !== null) {
            $updatedateto = $this->_trimDate($criteria->updatedateto);
        }
        if ($criteria) {
            if (isset($criteria->sku) && $criteria->sku !== null) {
                $criteria_str = "Sku like '%{$criteria->sku}%'";
            }
        }
        if ($createdatefrom) {
            if (!$createdateto) {
                $createdateto = $date_now_str;
            }
            $create_date_range_str = " CreatedAt between '{$createdatefrom}' and '{$createdateto}'";
        }
        if ($createdateto && !$createdatefrom) {
            $startdate = new \DateTime('1970-01-01');
            $createdatefrom = $startdate->format(\DateTime::ISO8601);
            $create_date_range_str = " CreatedAt between '{$createdatefrom}' and '{$createdateto}'";
        }

        if ($updatedatefrom) {
            if (!$updatedateto) {
                $updatedateto = $date_now_str;
            }
            $update_date_range_str = " UpdatedAt between '{$updatedatefrom}' and '{$updatedateto}'";
        }

        if ($updatedateto && !$updatedatefrom) {
            $startdate = new \DateTime('1970-01-01');
            $updatedatefrom = $startdate->format(\DateTime::ISO8601);
            $update_date_range_str = " UpdatedAt between '{$updatedatefrom}' and '{$updatedateto}'";
        }

        $daterange_str = $create_date_range_str ? $create_date_range_str : '';
        $daterange_str = $update_date_range_str ? $update_date_range_str : $create_date_range_str;

        $order = $create_date_range_str ? 'CreatedAt DESC' : $order;

        if ($daterange_str) {
            if ($criteria_str) {
                $criteria_str .= ' and '.$daterange_str;
            } else {
                $criteria_str = $daterange_str;
            }
        }
        // set Deleted exclude
        if ($criteria_str) {
            $criteria_str .= ' and (Deleted<>1 or Deleted is null)';
        } else {
            $criteria_str .= ' (Deleted<>1 or Deleted is null)';
        }
        $pagenum = $this->request->get('page') ? $this->request->get('page') : 1;
        $this->content = Product::paginator($pagenum, null, $criteria_str, 'id, Sku, SKUType, AuctionTitle, Blocked, Quantity, Manufacturer, Brand, Deleted, CreatedAt, UpdatedAt', null, $order);
        $this->content['criteria'] = $criteria;
    }

    /**
     * getSingleProduct.
     *
     * @return array product data
     * @Get("/get/single")
     */
    public function getSingleProductAction()
    {
        $product=false;
        $id = $this->request->get('id') ? $this->request->get('id') : false;
        $sku = $this->request->get('sku') ? $this->request->get('sku') : false;
        if ($id) {
            $product = Product::findFirst([
                'conditions' => "id='{$id}'",
            ]);
        }
        if ($sku) {
            $product = Product::findFirst([
                'conditions' => "Sku='{$sku}'",
            ]);
        }

        if ($product) {
            $this->content = $product->toArray();
            $attributes = $product->getAttributes();
            $attributes_ar = [];
            $attr_b_ar = [];
            if ($attributes) {
                $attr_b = Attrblocked::find([
                    'columns' => 'Name',
                ]);
                if ($attr_b) {
                    foreach ($attr_b as $a_blocked) {
                        $attr_b_ar[] = $a_blocked->Name;
                    }
                }
                $attributes_ar = $attributes->toArray();
                foreach ($attributes_ar as &$attr) {
                    if (array_search($attr['Name'], $attr_b_ar) !== false) {
                        $attr['Blocked'] = true;
                    } else {
                        $attr['Blocked'] = false;
                    }
                    $attr_name = str_replace("'", "\\'", $attr['Name']);
                    $md = Attrmetadata::findFirst([
                        'conditions' => "Name='{$attr_name}'",
                    ]);
                    if ($md) {
                        $attr['Type'] = $md->Type;
                        if ($md->Type == 'list') {
                            $attr['List'] = explode(',', $md->List);
                        } else {
                            $attr['List'] = [];
                        }
                    } else {
                        $attr['Type'] = 'text';
                        $attr['List'] = [];
                    }
                }
            }
            $this->content['attributes'] = $attributes_ar;

            $images = $product->images;
            $this->content['images'] = $images ? $images->toArray() : [];
            $shipping = $product->shipping;
            $this->content['shipping'] = $shipping ? $shipping->toArray() : [];
            $bundle = $product->bundle;
            $this->content['bundle'] = $bundle ? $bundle->toArray() : [];
            $labels = Labellist::find();
            $this->content['labelslist'] = $labels ? $labels->toArray() : [];

            $classificationlist = Classificationlist::find();
            $this->content['classificationlist'] = $classificationlist ? $classificationlist->toArray() : [];

            return $this->content;
        }

        return $this->content = [];
    }

    /**
     * @Post("/create")
     */
    public function createAction()
    {
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $newProduct = json_decode($data);
        if (!$newProduct) {
            return $this->content = json_encode(['result' => 'error']);
        }
        if (!isset($newProduct->Sku) || !isset($newProduct->AuctionTitle)) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $product = new Product();
        $product->id = md5($newProduct->Sku);
        $product->Sku = $newProduct->Sku;
        $product->AuctionTitle = $newProduct->AuctionTitle;

        if ($product->create() == false) {
            $msqs = '';
            foreach ($product->getMessages() as $message) {
                $msgs .= $message."\n";
            }

            return $this->content = json_encode([
                'result' => 'error',
                'msg' => $msqs,
            ]);
        }

        $attributes = Attribute::find([
            'group' => 'Name',
        ]);
        $fresh_attrs = [];
        if ($attributes) {
            foreach ($attributes as $attr) {
                array_push($fresh_attrs, [
                    'id' => '',
                    'Name' => $attr->Name,
                    'Value' => '',
                ]);
            }
        }

        $manager = new TxManager();
        $transaction = $manager->get();

        foreach ($fresh_attrs as $attr) {
            $attribute = new Attribute();
            $attribute->setTransaction($transaction);
            $attribute->id = md5($newProduct->Sku.$attr['Name']);
            $attribute->Sku = $newProduct->Sku;
            $attribute->Classification = '';
            $attribute->Name = $attr['Name'];
            $attribute->Value = $attr['Value'];
            if ($attribute->create() == false) {
                $transaction->rollback();

                return false;
            }
        }
        $transaction->commit();

        $this->_logOperation($this->_currentDate()." {$product->Sku} created by {$this->user->email}");
        $this->content = $product->toArray();
        $attributes = $product->getAttributes();
        $this->content['attributes'] = $attributes ? $attributes->toArray() : [];

        $this->content['images'] = [];
        $this->content['shipping'] = [];
        $labels = Labellist::find();
        $this->content['labelslist'] = $labels ? $labels->toArray() : [];
        $classificationlist = Classificationlist::find();
        $this->content['classificationlist'] = $classificationlist ? $classificationlist->toArray() : [];

        return $this->content;
    }
    /**
     * @Post("/setcriteria")
     */
    public function setCriteriaAction()
    {
        $criteria = $this->request->getJsonRawBody();
        //var_dump($criteria);
        $this->session->set('product_search_criteria', $criteria);
        //$this->content = json_decode($this->session->get('product_search_criteria'));
        $this->dispatcher->forward([
                'controller' => 'Product',
                'action' => 'getProducts',
            ]
        );
    }

    /**
     * @Post("/update")
     */
    public function updateAction()
    {
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $product = json_decode($data);
        if ($product) {
            $newProduct = new Product();
            foreach ($product as $key => $value) {
                if (!is_array($value)) {
                    $newProduct->$key = $value;
                }
            }
            $newProduct->PictureURLs = $this->_buildPictureURLs($product->images);
        }
        //save attributes
        $this->_saveAttributes($product->attributes);
        //save Images
        $this->_saveImages($product->images);
        //save shipping
        $this->_saveShipping($product->shipping);
        if ($this->hook->dshipmenttype) {
            $newProduct = $this->_dshipmenttype($newProduct, $product->attributes);
        }
        if ($newProduct->update() == false) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $this->_logOperation($this->_currentDate()." {$product->Sku} updated by {$this->user->email}");

        return $this->content = json_encode([
            'result' => 'success',
            'product' => $newProduct->toArray(),
        ]);
    }

    protected function _dshipmenttype($product, $attrs)
    {
        $dshipment = '';
        if ($product->SupplierCode) {
            foreach ($attrs as $attr) {
                if ($attr->Name == 'D_SHIPPMENT_TYPE') {
                    $dshipment = $attr->Value;
                    break;
                }
            }
            switch ($dshipment) {
                case 'STOCKED ITEM':
                $product->DCQuantity = $product->SupplierCode.'_STOCK=100';
                break;
                case 'STOCKED ITEM OTHER LOCATION':
                break;
                case 'NON STOCK - SPECIAL ORDER':
                $product->DCQuantity = $product->SupplierCode.'_STOCK=100';
                break;
                case 'NON STOCK - DROP SHIP':
                $product->DCQuantity = $product->SupplierCode.'_DS=100';
                break;
                case 'BACK ORDERED':
                $product->DCQuantity = $product->SupplierCode.'_STOCK=0';
                break;
                case 'NLA':
                $product->DCQuantity = $product->SupplierCode.'_STOCK=0';
                break;

            }
        }

        return $product;
    }

    /**
     * @Post("/markdelete")
     */
    public function markdeleteAction()
    {
        $data = file_get_contents('php://input');
        if (!$data) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $product = json_decode($data);
        if (!$product) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $item = Product::findFirst([
            'conditions' => "id='{$product->id}'",
        ]);
        if (!$item) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $item->Deleted = 1;
        if (!$item->update()) {
            return $this->content = json_encode(['result' => 'error']);
        }
        $this->_logOperation($this->_currentDate()." {$item->Sku} deleted by {$this->user->email}");

        return $this->content = json_encode(['result' => 'success']);
    }

    protected function _currentDate()
    {
        $curdate = new \Datetime('now', new \DateTimeZone('America/Detroit'));

        return $curdate->format('Y-m-d H:i:s');
    }

    protected function _logOperation($msg = '')
    {
        $log = new Actionlog();
        $log->usermail = $this->user->email;
        $log->action = $msg;
        if ($log->create() == false) {
            return false;
        }

        return true;
    }

    protected function _buildPictureURLs($images)
    {
        $PictureURLs = '';
        foreach ($images as $img) {
            $PictureURLs .= $img->PlacementName.'='.$img->URL.',';
        }
        $PictureURLs = rtrim($PictureURLs, ',');

        return $PictureURLs;
    }

    protected function _saveAttributes($attrs)
    {
        $manager = new TxManager();
        $transaction = $manager->get();

        foreach ($attrs as $attr) {
            $attribute = new Attribute();
            $attribute->setTransaction($transaction);
            $attribute->id = $attr->id;
            $attribute->Sku = $attr->Sku;
            $attribute->Classification = $attr->Classification;
            $attribute->Name = $attr->Name;
            $attribute->Value = $attr->Value;
            if ($attribute->update() == false) {
                $transaction->rollback();

                return false;
            }
        }
        $transaction->commit();

        return true;
    }

    protected function _saveImages($images)
    {
        $manager = new TxManager();
        $transaction = $manager->get();

        foreach ($images as $img) {
            $image = new Image();
            $image->setTransaction($transaction);
            if (isset($img->id)) {
                $image->id = $img->id;
            } else {
                $image->id = md5($img->Sku.$img->PlacementName);
            }
            $image->Sku = $img->Sku;
            $image->PlacementName = $img->PlacementName;
            $image->URL = $img->URL;
            if ($image->save() == false) {
                $transaction->rollback();

                return false;
            }
        }
        $transaction->commit();

        return true;
    }

    protected function _saveShipping($ships)
    {
        $manager = new TxManager();

        $transaction = $manager->get();
        foreach ($ships as $ship) {
            $shipping = new Shipping();
            $shipping->setTransaction($transaction);
            $shipping->id = $ship->id;
            $shipping->Sku = $ship->Sku;
            $shipping->DCCode = $ship->DCCode;
            $shipping->ShipZoneName = $ship->ShipZoneName;
            $shipping->ShipCarrierCode = $ship->ShipCarrierCode;
            $shipping->ShipClassCode = $ship->ShipClassCode;
            $shipping->ShipRateFirstItem = $ship->ShipRateFirstItem;
            $shipping->ShipHandlingFirstItem = $ship->ShipHandlingFirstItem;
            $shipping->ShipRateAdditionalItem = $ship->ShipRateAdditionalItem;
            $shipping->ShipHandlingAdditionalItem = $ship->ShipHandlingAdditionalItem;
            if ($shipping->update() == false) {
                $transaction->rollback();

                return false;
            }
        }
        $transaction->commit();

        return true;
    }

    protected function _trimDate($dstr = '')
    {
        //$data = new \DateTime($dstr);
        //return $data->format('Y-m-d');
        return $dstr;
    }
}
