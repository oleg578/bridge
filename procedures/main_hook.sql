DELIMITER ;;
CREATE PROCEDURE main_hook() BEGIN

TRUNCATE temp_ca_push;
INSERT INTO temp_ca_push (`Inventory Number`)
SELECT product.Sku
FROM product
WHERE product.Sku NOT LIKE '%GHOST SKU WORKAROUND%';
    UPDATE temp_ca_push
    SET `Quantity Update Type` = 'UNSHIPPED',
        `DC Quantity Update Type` = 'completedclist',
        `Attribute1Name` = 'C_COST_AVERAGE',
        `Attribute2Name` = 'C_COST_MFG',
        `Attribute3Name` = 'C_PRICE_MSRP',
        `Attribute4Name` = 'C_PRICE_MAP',
        `Attribute5Name` = 'C_COST_SHIP_AVERAGE';
    UPDATE temp_ca_push
    SET `Warehouse Location` =
        (SELECT PartsData.Bin
         FROM PartsData
         WHERE SUBSTRING_INDEX(`Inventory Number`,'_',-1) = PartsData.PartNo
             AND PartsData.LocationId = '2' LIMIT 1);
    UPDATE temp_ca_push
    SET `DC Quantity` = concat(
                                   (SELECT CONCAT('SANDUSKY=', temp_ca_onhand.onhand)
                                    FROM temp_ca_onhand
                                    WHERE temp_ca_onhand.inventory_number = `Inventory Number`
                                        AND temp_ca_onhand.locationid = '1' LIMIT 1) ,
                                   (SELECT CONCAT(',RICHMOND=', temp_ca_onhand.onhand)
                                    FROM temp_ca_onhand
                                    WHERE temp_ca_onhand.inventory_number = `Inventory Number`
                                        AND temp_ca_onhand.locationid = '2' LIMIT 1));
    UPDATE temp_ca_push
    SET `DC Quantity` = 'SANDUSKY=0,RICHMOND=0' WHERE `DC Quantity` IS NULL;
    UPDATE temp_ca_push
    SET `Attribute1Value` =
        (SELECT attribute.`Value`
         FROM attribute
         WHERE attribute.Sku = `Inventory Number`
             AND attribute.`Name` = 'C_COST_AVERAGE' LIMIT 1);
    UPDATE temp_ca_push
    SET `Attribute2Value` =
        (SELECT attribute.`Value`
         FROM attribute
         WHERE attribute.Sku = `Inventory Number`
             AND attribute.`Name` = 'C_COST_MFG' LIMIT 1);
    UPDATE temp_ca_push
    SET `Attribute3Value` =
        (SELECT attribute.`Value`
         FROM attribute
         WHERE attribute.Sku = `Inventory Number`
             AND attribute.`Name` = 'C_PRICE_MSRP' LIMIT 1);
    UPDATE temp_ca_push
    SET `Attribute4Value` =
        (SELECT attribute.`Value`
         FROM attribute
         WHERE attribute.Sku = `Inventory Number`
             AND attribute.`Name` = 'C_PRICE_MAP' LIMIT 1);

END;;

DELIMITER ;
