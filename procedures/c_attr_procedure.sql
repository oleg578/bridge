DELIMITER ;;
DROP PROCEDURE IF EXISTS set_attrs;
CREATE PROCEDURE set_attrs()
BEGIN
    DECLARE done INT DEFAULT FALSE;
    DECLARE skusrc VARCHAR(50);
    DECLARE avgcost VARCHAR(50);
    /*
    select `product`.`Sku`, IFNULL(`PartsData`.`AvgCost`, 0) from `product` left outer join `PartsData` on (SUBSTRING_INDEX(product.Sku,'_',-1)=`PartsData`.`PartNo` AND LEFT(product.Sku,LOCATE('_',product.Sku) - 1)=`PartsData`.`MfgCode` AND `PartsData`.`LocationId`=2);
     */
    DECLARE avgcostcurs CURSOR FOR select `product`.`Sku`, IFNULL(`PartsData`.`AvgCost`, 0) from `product` left outer join `PartsData` on (SUBSTRING_INDEX(product.Sku,'_',-1)=`PartsData`.`PartNo` AND LEFT(product.Sku,LOCATE('_',product.Sku) - 1)=`PartsData`.`MfgCode` AND `PartsData`.`LocationId`=2);
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
    OPEN avgcostcurs;
    START TRANSACTION;
    insert_loop: LOOP
        FETCH avgcostcurs INTO skusrc, avgcost;
        IF done THEN
            LEAVE insert_loop;
        END IF;
        /* Create (update) C_COST_AVERAGE */

        INSERT INTO bridge.attribute (`id`,`Sku`,`Classification`,`Name`,`Value`) VALUES (MD5(CONCAT(skusrc,"C_COST_AVERAGE")), skusrc, "", "C_COST_AVERAGE", avgcost) ON DUPLICATE KEY UPDATE Value=avgcost;
    END LOOP;
    COMMIT;
    CLOSE avgcostcurs;
END;;
DELIMITER ;
