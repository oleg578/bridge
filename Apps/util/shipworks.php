#!/usr/bin/env php
<?php
ini_set('memory_limit', '-1');

$datestamp = date('Y_d_m_H_i');

echo "Shipworks started : $datestamp\n";

$filename = 'Shipworks_'.$datestamp.'.xml';

$hostname = 'localhost';
$username = 'root';
$password = 'fxmt106fx';
//$password = 'corner';
$dbName = 'bridge';

$db = new mysqli($hostname, $username, $password, $dbName);

if ($db->connect_errno) {
    exit('Connect error: ('.$db->connect_errno.') '.$db->connect_error);
}

$pool = $db->query('select  product.Sku as sku, if(PartNo,PartNo,inventroy.pricefile.sku) as partnum, '.
    'if(partsdata.PartNo,mfgmap.newmfg, inventroy.pricefile.mfgcode) as mfg, 1 as qty, Bin as binloc, '.
    'if(partsdata.OnHand>0,1,0) as onhand  from product  inner join mfgmap '.
    'on(mfgmap.oldmfg=SUBSTRING_INDEX(product.Sku,"_",1)) '.
    'left join partsdata on(partsdata.PartNo=TRIM(BOTH "_" '.
    'FROM REGEXP_SUBSTR(product.Sku,"_[a-zA-Z0-9\-]+")) '.
    'and partsdata.MfgCode=mfgmap.newmfg and partsdata.LocationId=3) '.
    'left join inventroy.pricefile on(product.Sku=inventroy.pricefile.sku_custom '.
    'and SUBSTRING_INDEX(product.Sku,"_", 1)=inventroy.pricefile.mfgcode)  '.
    'where product.Sku not in(select ParentSku from bundle)  UNION  '.
    'select product.Sku as sku, if(PartNo,PartNo, inventroy.pricefile.sku) as partnum, '.
    'if(partsdata.PartNo,mfgmap.newmfg, inventroy.pricefile.mfgcode) as mfg, '.
    'bundle.Quantity as qty, Bin as binloc,if(partsdata.OnHand>0,1,0) as onhand from product '.
    'inner join mfgmap on(mfgmap.oldmfg=SUBSTRING_INDEX(product.Sku,"_",1)) '.
    'inner join bundle on(product.Sku=bundle.ParentSku) left join partsdata  '.
    'on(partsdata.PartNo=TRIM(BOTH "_" FROM REGEXP_SUBSTR(bundle.ChildSku,"_[a-zA-Z0-9\-]+")) '.
    'and partsdata.MfgCode=mfgmap.newmfg and partsdata.LocationId=3) '.
    'left join inventroy.pricefile on(bundle.ChildSku=inventroy.pricefile.sku_custom '.
    'and SUBSTRING_INDEX(product.Sku,"_",1)=inventroy.pricefile.mfgcode)');

$result_pool = [];

while ($item = $pool->fetch_object()) {
    $result_pool[$item->sku][] = [
        'partnum' => $item->partnum,
        'qty' => $item->qty,
        'mfg' => $item->mfg,
        'binloc' => $item->binloc,
        'onhand' => $item->onhand,
    ];
}

$pool->close();

$db->close();

//result_pool
$xmldoc = new XMLWriter();
$xmldoc->openMemory();
$xmldoc->startDocument('1.0', 'UTF-8');
$xmldoc->startElement('Root');
$xmldoc->text('xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"');

foreach ($result_pool as $sku => $parts) {
    $xmldoc->startElement('Row');
    $xmldoc->startElement('SKU');
    $xmldoc->text($sku);
    $xmldoc->endElement(); // MYSKU
    //add parts
    $index = 1;
    foreach ($parts as $part) {
        //var_dump($part);
        $xmldoc->startElement('PARTNUM'.$index);
        $xmldoc->text($part['partnum']);
        $xmldoc->endElement();
        $xmldoc->startElement('QTY'.$index);
        $xmldoc->text($part['qty']);
        $xmldoc->endElement();
        $xmldoc->startElement('MFG'.$index);
        $xmldoc->text($part['mfg']);
        $xmldoc->endElement();
        $xmldoc->startElement('BIN'.$index);
        if ($part['binloc']) {
            $xmldoc->text($part['binloc']);
        } else {
            $xmldoc->text('NULL');
        }
        $xmldoc->endElement();
        $xmldoc->startElement('ONHAND'.$index);
        if ($part['onhand']) {
            $xmldoc->text($part['onhand']);
        } else {
            $xmldoc->text('NULL');
        }
        $xmldoc->endElement();
        ++$index;
    }
    $xmldoc->endElement(); // Row
}
$xmldoc->endElement(); // Root
$xmldoc->endDocument();

$rsc = fopen('/home/fxmt106luk/sites/bridge/Apps/reports/shipworks.xml', 'w');
//$rsc = fopen('/home/olegn/Lucas/projects/bridge/Apps/reports/shipworks.xml', 'w');

fwrite($rsc, $xmldoc->outputMemory(true));

fclose($rsc);
