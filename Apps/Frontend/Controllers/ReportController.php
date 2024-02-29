<?php

namespace Apps\Frontend\Controllers;

/**
 * Description of ReportController.
 *
 * @author Oleh Nahornyi
 * @RoutePrefix("/report")
 */
class ReportController extends ControllerBase
{
    /**
     * @Get("/sales/{page:[0-9]+}")
     */
    public function salesAction($page = 1)
    {
        $pagelength = 25;
        $sql = 'SELECT `invent`.`invoice`.`orderid`, `invent`.`invoice`.`sitename`, `invent`.`invoice`.`buyeremailaddress`, `invent`.`invoice`.`buyerfirstname`, `invent`.`invoice`.`buyerlastname`, `invent`.`invoice`.`buyercompany`, `bridge`.`ShipWorks`.`shippingdate`, `bridge`.`ShipWorks`.`trackingnumber` FROM `invent`.`invoice` INNER JOIN `bridge`.`ShipWorks` ON `invent`.`invoice`.`orderid` = `bridge`.`ShipWorks`.`orderid` WHERE `bridge`.`ShipWorks`.`trackingnumber` NOT IN ( SELECT `invoice`.`trackingnumber` FROM `invent`.`invoice` ) AND `bridge`.`ShipWorks`.`shippingdate` BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() AND `bridge`.`ShipWorks`.`voided` = 0 ORDER BY `bridge`.`ShipWorks`.`shippingdate` DESC';
        $sql_count = 'SELECT count(`invent`.`invoice`.`orderid`) as ItemsCount FROM `invent`.`invoice` INNER JOIN `bridge`.`ShipWorks` ON `invent`.`invoice`.`orderid` = `bridge`.`ShipWorks`.`orderid` WHERE `bridge`.`ShipWorks`.`trackingnumber` NOT IN ( SELECT `invoice`.`trackingnumber` FROM `invent`.`invoice` ) AND `bridge`.`ShipWorks`.`shippingdate` BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() AND `bridge`.`ShipWorks`.`voided` = 0';
        $current_page = ($page > 0) ? $page : 1;
        $offset = ($current_page - 1) * $pagelength;

        $sql_suffix = " LIMIT {$offset}, {$pagelength}";
        $sql .=  $sql_suffix;
        $query = $this->db->query($sql_count);
        $query->setFetchMode(\Phalcon\Db::FETCH_OBJ);
        $r_num = $query->fetch();
        $items_count = $r_num->ItemsCount;
        $previous_page = ($current_page > 1) ? $current_page - 1 : $current_page;
        $last_page = (int) ceil($items_count / $pagelength);
        $next_page = min([$current_page + 1, $last_page]);
        $query = $this->db->query($sql);
        $query->setFetchMode(\Phalcon\Db::FETCH_OBJ);
        $data = $query->fetchAll();
        $this->view->setVars([
            'sales' => $data,
            'previouspage' => $previous_page,
            'currentpage' => $current_page,
            'nextpage' => $next_page,
            'firstpage' => 1,
            'lastpage' => $last_page,
        ]);
    }

    /**
     * @Get("/nosource/{page:[0-9]+}")
     */
    public function nosourceAction($page = 1)
    {
        $pagelength = 25;
        $sql = "SELECT `product`.`Sku`,`product`.`SKUType` FROM `product` WHERE `product`.`Sku` NOT IN (SELECT `pricefile`.`sku_custom` FROM `inventroy`.`pricefile`) AND SUBSTRING_INDEX(`product`.`Sku`, '_' ,- 1) NOT IN (SELECT `PartsData`.`PartNo` FROM `PartsData`) AND `product`.`Sku` NOT LIKE 'GHOST SKU WORKAROUND%' AND `product`.`SKUType` = 'Basic Item'";
        $sql_count = "SELECT count(`product`.`Sku`) as ItemsCount FROM `product` WHERE `product`.`Sku` NOT IN (SELECT `pricefile`.`sku_custom` FROM `inventroy`.`pricefile`) AND SUBSTRING_INDEX(`product`.`Sku`, '_' ,- 1) NOT IN (SELECT `PartsData`.`PartNo` FROM `PartsData`) AND `product`.`Sku` NOT LIKE 'GHOST SKU WORKAROUND%' AND `product`.`SKUType` = 'Basic Item'";
        $current_page = ($page > 0) ? $page : 1;
        $offset = ($current_page - 1) * $pagelength;

        $sql_suffix = " LIMIT {$offset}, {$pagelength}";
        $sql .=  $sql_suffix;
        $query = $this->db->query($sql_count);
        $query->setFetchMode(\Phalcon\Db::FETCH_OBJ);
        $r_num = $query->fetch();
        $items_count = $r_num->ItemsCount;
        $previous_page = ($current_page > 1) ? $current_page - 1 : $current_page;
        $last_page = (int) ceil($items_count / $pagelength);
        $next_page = min([$current_page + 1, $last_page]);
        $query = $this->db->query($sql);
        $query->setFetchMode(\Phalcon\Db::FETCH_OBJ);
        $data = $query->fetchAll();
        $this->view->setVars([
            'sales' => $data,
            'previouspage' => $previous_page,
            'currentpage' => $current_page,
            'nextpage' => $next_page,
            'firstpage' => 1,
            'lastpage' => $last_page,
        ]);
    }

    /**
     * @Get("/nosourcepricefile/{page:[0-9]+}")
     */
    public function nosourcepricefileAction($page = 1)
    {
        $pagelength = 25;
        $sql = "SELECT `product`.`Sku`,`product`.`SKUType` FROM `product` WHERE `product`.`Sku` NOT IN (SELECT `pricefile`.`sku_custom` FROM `inventroy`.`pricefile`) AND `product`.`Sku` NOT LIKE 'GHOST SKU WORKAROUND%' AND `product`.`SKUType` = 'Basic Item'";
        $sql_count = "SELECT count(`product`.`Sku`) as ItemsCount FROM `product` WHERE `product`.`Sku` NOT IN (SELECT `pricefile`.`sku_custom` FROM `inventroy`.`pricefile`) AND `product`.`Sku` NOT LIKE 'GHOST SKU WORKAROUND%' AND `product`.`SKUType` = 'Basic Item'";
        $current_page = ($page > 0) ? $page : 1;
        $offset = ($current_page - 1) * $pagelength;

        $sql_suffix = " LIMIT {$offset}, {$pagelength}";
        $sql .=  $sql_suffix;
        $query = $this->db->query($sql_count);
        $query->setFetchMode(\Phalcon\Db::FETCH_OBJ);
        $r_num = $query->fetch();
        $items_count = $r_num->ItemsCount;
        $previous_page = ($current_page > 1) ? $current_page - 1 : $current_page;
        $last_page = (int) ceil($items_count / $pagelength);
        $next_page = min([$current_page + 1, $last_page]);
        $query = $this->db->query($sql);
        $query->setFetchMode(\Phalcon\Db::FETCH_OBJ);
        $data = $query->fetchAll();
        $this->view->setVars([
            'sales' => $data,
            'previouspage' => $previous_page,
            'currentpage' => $current_page,
            'nextpage' => $next_page,
            'firstpage' => 1,
            'lastpage' => $last_page,
        ]);
    }

    /**
     * @Get("/nosourcepartsdata/{page:[0-9]+}")
     */
    public function nosourcepartsdataAction($page = 1)
    {
        $pagelength = 25;
        $sql = "SELECT `product`.`Sku`,`product`.`SKUType` FROM `product` WHERE SUBSTRING_INDEX(`product`.`Sku`, '_' ,- 1) NOT IN (SELECT `partsdata`.`PartNo` FROM `partsdata`) AND `product`.`Sku` NOT LIKE 'GHOST SKU WORKAROUND%' AND `product`.`SKUType` = 'Basic Item'";
        $sql_count = "SELECT count(`product`.`Sku`) as ItemsCount FROM `product` WHERE SUBSTRING_INDEX(`product`.`Sku`, '_' ,- 1) NOT IN (SELECT `partsdata`.`PartNo` FROM `partsdata`) AND `product`.`Sku` NOT LIKE 'GHOST SKU WORKAROUND%' AND `product`.`SKUType` = 'Basic Item'";
        $current_page = ($page > 0) ? $page : 1;
        $offset = ($current_page - 1) * $pagelength;

        $sql_suffix = " LIMIT {$offset}, {$pagelength}";
        $sql .=  $sql_suffix;
        $query = $this->db->query($sql_count);
        $query->setFetchMode(\Phalcon\Db::FETCH_OBJ);
        $r_num = $query->fetch();
        $items_count = $r_num->ItemsCount;
        $previous_page = ($current_page > 1) ? $current_page - 1 : $current_page;
        $last_page = (int) ceil($items_count / $pagelength);
        $next_page = min([$current_page + 1, $last_page]);
        $query = $this->db->query($sql);
        $query->setFetchMode(\Phalcon\Db::FETCH_OBJ);
        $data = $query->fetchAll();
        $this->view->setVars([
            'sales' => $data,
            'previouspage' => $previous_page,
            'currentpage' => $current_page,
            'nextpage' => $next_page,
            'firstpage' => 1,
            'lastpage' => $last_page,
        ]);
    }

    /**
     * @Get("/sales/csv")
     */
    public function salescsvAction()
    {
        $this->view->disable();
        $upload_dir = $this->config->upload_dir;
        $file_name = 'sales_general_report'.date('Y_m_j_H_i').'.csv';
        $this->response->setHeader('Content-Type', 'text/plain');
        $this->response->setHeader('Content-Disposition', "attachment; filename=\"$file_name\"");
        /* orderid|sitename|buyeremailaddress|buyerfirstname|buyerlastname|buyercompany|shippingdate|trackingnumber*/
        $head_csv = [
            'orderid',
            'sitename',
            'buyeremailaddress',
            'buyerfirstname',
            'buyerlastname',
            'buyercompany',
            'shippingdate',
            'trackingnumber',
            ];
        $sql = 'SELECT `invent`.`invoice`.`orderid`, `invent`.`invoice`.`sitename`, `invent`.`invoice`.`buyeremailaddress`, `invent`.`invoice`.`buyerfirstname`, `invent`.`invoice`.`buyerlastname`, `invent`.`invoice`.`buyercompany`, `bridge`.`ShipWorks`.`shippingdate`, `bridge`.`ShipWorks`.`trackingnumber` FROM `invent`.`invoice` INNER JOIN `bridge`.`ShipWorks` ON `invent`.`invoice`.`orderid` = `bridge`.`ShipWorks`.`orderid` WHERE `bridge`.`ShipWorks`.`trackingnumber` NOT IN ( SELECT `invoice`.`trackingnumber` FROM `invent`.`invoice` ) AND `bridge`.`ShipWorks`.`shippingdate` BETWEEN DATE_SUB(NOW(), INTERVAL 30 DAY) AND NOW() AND `bridge`.`ShipWorks`.`voided` = 0 ORDER BY `bridge`.`ShipWorks`.`shippingdate` DESC';
        $query = $this->db->query($sql);
        $query->setFetchMode(\Phalcon\Db::FETCH_NUM);
        $data = $query->fetchAll();
        $f_h = fopen($upload_dir.$file_name, 'w');
        fputcsv($f_h, $head_csv);
        foreach ($data as $row) {
            fputcsv($f_h, $row);
        }
        fclose($f_h);
        readfile($upload_dir.$file_name);

        $this->response->setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
        $this->response->setHeader('Content-Length', filesize($upload_dir.$file_name));
        $this->response->setHeader('Content-Disposition', "attachment; filename=$file_name");
        unlink($upload_dir.$file_name);
    }

    /**
     * @Get("/nosource/csv")
     */
    public function nosourcecsvAction()
    {
        $this->view->disable();
        $upload_dir = $this->config->upload_dir;
        $file_name = 'nosource_report'.date('Y_m_j_H_i').'.csv';
        $this->response->setHeader('Content-Type', 'text/plain');
        $this->response->setHeader('Content-Disposition', "attachment; filename=\"$file_name\"");
        $head_csv = [
            'Sku',
            'SKUType',
            ];
        $sql = "SELECT `product`.`Sku`,`product`.`SKUType` FROM `product` WHERE `product`.`Sku` NOT IN (SELECT `pricefile`.`sku_custom` FROM `inventroy`.`pricefile`) AND SUBSTRING_INDEX(`product`.`Sku`, '_' ,- 1) NOT IN (SELECT `PartsData`.`PartNo` FROM `PartsData`) AND `product`.`Sku` NOT LIKE 'GHOST SKU WORKAROUND%' AND `product`.`SKUType` = 'Basic Item'";
        $query = $this->db->query($sql);
        $query->setFetchMode(\Phalcon\Db::FETCH_NUM);
        $data = $query->fetchAll();
        $f_h = fopen($upload_dir.$file_name, 'w');
        fputcsv($f_h, $head_csv);
        foreach ($data as $row) {
            fputcsv($f_h, $row);
        }
        fclose($f_h);
        readfile($upload_dir.$file_name);

        $this->response->setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
        $this->response->setHeader('Content-Length', filesize($upload_dir.$file_name));
        $this->response->setHeader('Content-Disposition', "attachment; filename=$file_name");
        unlink($upload_dir.$file_name);
    }

    /**
     * @Get("/nosourcepricefile/csv")
     */
    public function nosourcepricefilecsvAction()
    {
        $this->view->disable();
        $upload_dir = $this->config->upload_dir;
        $file_name = 'nosource_pricefile_report'.date('Y_m_j_H_i').'.csv';
        $this->response->setHeader('Content-Type', 'text/plain');
        $this->response->setHeader('Content-Disposition', "attachment; filename=\"$file_name\"");
        $head_csv = [
            'Sku',
            'SKUType',
            ];
        $sql = "SELECT `product`.`Sku`,`product`.`SKUType` FROM `product` WHERE `product`.`Sku` NOT IN (SELECT `pricefile`.`sku_custom` FROM `inventroy`.`pricefile`) AND `product`.`Sku` NOT LIKE 'GHOST SKU WORKAROUND%' AND `product`.`SKUType` = 'Basic Item'";
        $query = $this->db->query($sql);
        $query->setFetchMode(\Phalcon\Db::FETCH_NUM);
        $data = $query->fetchAll();
        $f_h = fopen($upload_dir.$file_name, 'w');
        fputcsv($f_h, $head_csv);
        foreach ($data as $row) {
            fputcsv($f_h, $row);
        }
        fclose($f_h);
        readfile($upload_dir.$file_name);

        $this->response->setHeader('Content-Type', 'application/octet-stream; charset=utf-8');
        $this->response->setHeader('Content-Length', filesize($upload_dir.$file_name));
        $this->response->setHeader('Content-Disposition', "attachment; filename=$file_name");
        unlink($upload_dir.$file_name);
    }

    /**
     *@Route("/holidaysales", methods={"POST", "GET"})
     */
    public function holidaysalesAction()
    {
        if ($this->request->isPost() && $this->security->checkToken()) {
            $this->view->disable();
            $location = $this->request->getPost('location');
            if ($location) {
                $head_csv = [
                    'Sku',
                    'OnHand',
                    'AvgCost',
                    'MfgCost',
                    'MSRP',
                    'MAP',
                    'LocationID',
                    ];
                //build csv file
                $SQL = 'SELECT partsdata.PartNo AS sku, partsdata.OnHand AS onhand, partsdata.AvgCost AS avgcost, partsdata.PublishedCost AS mfgcost, partsdata.MSRP AS `msrp`, if(mfgmap.oldmfg is not null, 0,1) AS `map`, LocationId FROM partsdata INNER JOIN holdaysale ON partsdata.PartNo = holdaysale.sku left join mfgmap on(partsdata.MfgCode=mfgmap.oldmfg) WHERE partsdata.LocationId=?';
                $query = $this->db->query($SQL, [$location]);
                $query->setFetchMode(\Phalcon\Db::FETCH_NUM);
                $data = $query->fetchAll();
                $f_h = fopen($this->config->csv_dir.'holidaysales.csv', 'wb');
                fputcsv($f_h, $head_csv);
                foreach ($data as $row) {
                    fputcsv($f_h, $row);
                }
                fclose($f_h);
                chmod($this->config->csv_dir.'holidaysales.csv', 0666);
                $this->flashSession->success('Report builded succesfully');
                $this->response->redirect('report/holidaysales');
            } else {
                $this->flashSession->error('Location required');
                $this->response->redirect('report/holidaysales');
            }
        }
    }
}
