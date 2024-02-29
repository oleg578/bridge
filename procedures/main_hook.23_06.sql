drop procedure if exists main_hook;
DELIMITER ;;
CREATE PROCEDURE main_hook() BEGIN

### LAST UPDATED 06/23/2016 ###

### TRUNCATE TABLES ###
TRUNCATE temp_ca_push;
TRUNCATE temp_ca_onhand;
TRUNCATE temp_ca_stock;

### BUILD MAIN TABLE ###
INSERT INTO temp_ca_push (`Inventory Number`)
SELECT
product.Sku
FROM product
WHERE product.Sku NOT LIKE '%GHOST SKU WORKAROUND%';

### POLARIS NLA ###
INSERT INTO temp_ca_stock (`sku`)
SELECT
CONCAT('POL_',inventroy.pricefile.sku) AS P
FROM
inventroy.pricefile
WHERE
inventroy.pricefile.description LIKE '%BY 9999999%'
AND inventroy.pricefile.mfgcode = 'POL';

### ATTRIBUTE NLA ###
INSERT INTO temp_ca_stock (`sku`)
SELECT
attribute.Sku
FROM
attribute
WHERE
attribute.`Name` = 'D_SHIPPMENT_TYPE' AND
attribute.`Value` = 'NLA';

### ATTRIBUTE BACKORDERED ###
INSERT INTO temp_ca_stock (`sku`)
SELECT
attribute.Sku
FROM
attribute
WHERE
attribute.`Name` = 'D_SHIPPMENT_TYPE' AND
attribute.`Value` = 'BACK ORDERED';

### SET ATTRIBUTE NAMES ###
UPDATE temp_ca_push SET
`Quantity Update Type` = 'UNSHIPPED',
`DC Quantity Update Type` = 'completedclist',
`Attribute1Name` = 'C_COST',
`Attribute2Name` = 'C_PRICE_MSRP',
`Attribute3Name` = 'C_PRICE_MAP';

### BIN LOCATIONS ###
UPDATE
temp_ca_push
SET `Warehouse Location` =
(SELECT PartsData.Bin FROM PartsData WHERE SUBSTRING_INDEX(`Inventory Number`,'_',-1) = PartsData.PartNo AND PartsData.LocationId = '2' Limit 1);

### SAVE ONHAND QUANTITIES TO temp_ca_onhand ###
INSERT INTO temp_ca_onhand (inventory_number,mfgcode,onhand,locationid)
SELECT
temp_ca_push.`Inventory Number`,
PartsData.MfgCode,
TRUNCATE(PartsData.OnHand,0),
PartsData.LocationId
FROM
temp_ca_push
INNER JOIN PartsData ON SUBSTRING_INDEX(temp_ca_push.`Inventory Number`,'_',-1) = PartsData.PartNo;

insert into temp_ca_onhand (`inventory_number`, `mfgcode`, `onhand`, `locationid`)
	select `inventory_number`, `mfgcode`, '0', 2 from temp_ca_onhand where `inventory_number` in
		(
			select `inventory_number` from temp_ca_onhand where `locationid`=1
		) group by inventory_number having count(locationid)=1;

insert into temp_ca_onhand (`inventory_number`, `mfgcode`, `onhand`, `locationid`)
	select `inventory_number`, `mfgcode`, '0', 1 from temp_ca_onhand where `inventory_number` in
		(
			select `inventory_number` from temp_ca_onhand where `locationid`=2
		) group by inventory_number having count(locationid)=1;

### SET DC QUANTITIES ###
UPDATE
temp_ca_push
SET `DC Quantity` =
concat(
(SELECT
CONCAT(
'SANDUSKY=',
temp_ca_onhand.onhand
)
 FROM temp_ca_onhand WHERE temp_ca_onhand.inventory_number = `Inventory Number` AND temp_ca_onhand.locationid = '1' Limit 1)
,
(SELECT
CONCAT(
',RICHMOND=',
temp_ca_onhand.onhand
)
 FROM temp_ca_onhand WHERE temp_ca_onhand.inventory_number = `Inventory Number` AND temp_ca_onhand.locationid = '2' Limit 1)
,
(SELECT
concat(
',',
temp_ca_onhand.mfgcode,
'_STOCK=',
IF ((
SELECT
temp_ca_stock.sku
FROM
temp_ca_stock
WHERE
temp_ca_stock.sku = `Inventory Number` LIMIT 1) = `Inventory Number`,0,100)
)
FROM
temp_ca_onhand
WHERE
temp_ca_onhand.inventory_number = `Inventory Number` LIMIT 1)
);

### DC QUANTITIES FAIL SAFE ###
UPDATE
temp_ca_push
SET `DC Quantity` = 'SANDUSKY=0,RICHMOND=0' WHERE `DC Quantity` IS NULL;

### REMOVE SPACES FROM DC QUANTITIES ###
UPDATE temp_ca_push SET `DC Quantity` = REPLACE(`DC Quantity`, ' ', '');

### SET COST ###
UPDATE
temp_ca_push
SET `Attribute1Value` =
(SELECT attribute.`Value` FROM attribute WHERE attribute.Sku = `Inventory Number` AND attribute.`Name` = 'C_COST' Limit 1);

### SET MSRP ###
UPDATE
temp_ca_push
SET `Attribute2Value` =
(SELECT attribute.`Value` FROM attribute WHERE attribute.Sku = `Inventory Number` AND attribute.`Name` = 'C_PRICE_MSRP' Limit 1);

### SET MAP ###
UPDATE
temp_ca_push
SET `Attribute3Value` =
(SELECT attribute.`Value` FROM attribute WHERE attribute.Sku = `Inventory Number` AND attribute.`Name` = 'C_PRICE_MAP' Limit 1);

END;;

DELIMITER ;
