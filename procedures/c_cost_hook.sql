drop procedure if exists c_cost_hook;
DELIMITER ;;
CREATE PROCEDURE c_cost_hook()
BEGIN
DECLARE search_index INT;
DECLARE ItemSku varchar(50);
DECLARE ItemMfg varchar(50);
DECLARE ItemAvgCost double(11,2);
DECLARE kit_count int;
DECLARE child_pd varchar(50);
DECLARE child_mfg varchar(50);
# part I -- create AvgCost for single products
# build index
select count(`product`.`Sku`) INTO search_index from `product` where `product`.`Sku` not like '%workaround%' and `product`.`Sku` not in (select `bundle`.`parentSku` from `bundle`);
SET search_index = search_index - 1;
WHILE search_index >= 0 DO

select `product`.`Sku`, `mfgmap`.`newmfg` into ItemSku, ItemMfg from `product` inner join `mfgmap` on(SUBSTRING_INDEX(`product`.`Sku`,'_',1)=`mfgmap`.`oldmfg`) where `product`.`Sku` not like '%workaround%' and `product`.`Sku` not in (select `bundle`.`parentSku` from `bundle`) limit 1 offset search_index;
SET ItemAvgCost=0.00;
select round(if(`partsdata`.`AvgCost`>0,`partsdata`.`AvgCost`,if(`partsdata`.`PublishedCost`>0,`partsdata`.`PublishedCost`,0.00)),2)  into ItemAvgCost from `partsdata` where `partsdata`.`PartNo` =  TRIM(BOTH '_' FROM REGEXP_SUBSTR (ItemSku,'_[^_]+_?')) and `partsdata`.`MfgCode`=ItemMfg and `partsdata`.`LocationId`=2;
IF ItemAvgCost IS NULL THEN SET ItemAvgCost=0.00;
END IF;
SET ItemAvgCost=ROUND(ItemAvgCost,2);
INSERT INTO `attribute` (`id`,`Sku`,`Classification`,`Name`,`Value`) values(md5(concat(ItemSku,'C_COST')),ItemSku,'','C_COST', ItemAvgCost) ON DUPLICATE KEY UPDATE `Value`=ItemAvgCost;

SET search_index = search_index - 1;
END WHILE;

# part II -- create AvgCost for bundle products
# build index
SET search_index = 0;
select count(`product`.`Sku`) INTO search_index from `product` where `product`.`Sku` not like '%workaround%' and `product`.`Sku` in (select `bundle`.`parentSku` from `bundle`);
SET search_index = search_index - 1;

WHILE search_index >= 0 DO

    select `product`.`Sku` into ItemSku from `product` where `product`.`Sku` not like '%workaround%' and `product`.`Sku` in (select `bundle`.`parentSku` from `bundle`) limit 1 offset search_index;
    `validate_kit`:
        BEGIN
            select count(parentSku) into kit_count from bundle where parentSku=ItemSku;
            SET kit_count = kit_count - 1;
            WHILE kit_count >= 0 DO
                select PartNo,`mfgmap`.`newmfg` into child_pd, child_mfg from bundle left join `mfgmap` on(SUBSTRING_INDEX(`bundle`.`childSku`,'_',1)=`mfgmap`.`oldmfg`) left join partsdata on(TRIM(BOTH '_' FROM REGEXP_SUBSTR (`bundle`.`childSku`,'_[^_]+_?'))=partsdata.PartNo and partsdata.MfgCode=`mfgmap`.`newmfg` and LocationId=2) where parentSku=ItemSku limit 1 offset kit_count;
                IF child_pd is null THEN SET ItemAvgCost=99999.99;LEAVE `validate_kit`;
                END IF;
            SET kit_count = kit_count - 1;
            END WHILE;

            select
            round(
                sum(
                    `bundle`.`Quantity`*if(`partsdata`.`AvgCost`>0,`partsdata`.`AvgCost`,if(`partsdata`.`PublishedCost`>0,`partsdata`.`PublishedCost`,0.00))
                ),2) into ItemAvgCost from `bundle` left join `mfgmap` on(SUBSTRING_INDEX(`bundle`.`childSku`,'_',1)=`mfgmap`.`oldmfg`) left join `partsdata` on (TRIM(BOTH '_' FROM REGEXP_SUBSTR (`bundle`.`childSku`,'_[^_]+_?'))=`partsdata`.`PartNo` and `partsdata`.`LocationId`=2 and `partsdata`.`MfgCode`=`mfgmap`.`newmfg`) where `parentSku`=ItemSku group by `bundle`.`parentSku`;

                IF ItemAvgCost IS NULL THEN SET ItemAvgCost=0.00;
            END IF;
        END;
    INSERT INTO `attribute` (`id`,`Sku`,`Classification`,`Name`,`Value`) values(md5(concat(ItemSku,'C_COST')),ItemSku,'','C_COST', ItemAvgCost) ON DUPLICATE KEY UPDATE `Value`=ItemAvgCost;

    SET search_index = search_index - 1;
END WHILE;

END;;
DELIMITER ;
