drop procedure if exists dshipmenttype;
DELIMITER ;;
CREATE PROCEDURE dshipmenttype()
BEGIN
    DECLARE ItemId VARCHAR(32);
    DECLARE SupplierCode VARCHAR(32);
    DECLARE AttrValue VARCHAR(100);
    DECLARE DCquantity VARCHAR(100);
    DECLARE search_index INT;
    SELECT count(*) INTO search_index from `product`;
    SET search_index = search_index - 1;
    WHILE search_index >= 0 DO
        SELECT `product`.`id`, ifnull(`product`.`SupplierCode`, ''), ifnull(`attribute`.`Value`, ''), `product`.`DCQuantity` INTO ItemId, SupplierCode, AttrValue, DCquantity from `product` inner join `attribute` using(`Sku`) where `attribute`.`Name`='D_SHIPPMENT_TYPE' limit 1 offset search_index;
        IF LENGTH(SupplierCode)>0 THEN
            CASE AttrValue
                WHEN 'STOCKED ITEM' THEN UPDATE `product` SET DCQuantity = CONCAT(SupplierCode, '_STOCK=100') where `id`=ItemId;
                WHEN 'STOCKED ITEM OTHER LOCATION'  THEN UPDATE `product` SET DCQuantity = '' where `id`=ItemId;
                WHEN 'NON STOCK - SPECIAL ORDER' THEN UPDATE `product` SET DCQuantity = CONCAT(SupplierCode, '_STOCK=100') where `id`=ItemId;
                WHEN 'NON STOCK - DROP SHIP' THEN UPDATE `product` SET DCQuantity = CONCAT(SupplierCode, '_DS=100') where `id`=ItemId;
                WHEN 'BACK ORDERED' THEN UPDATE `product` SET DCQuantity = CONCAT(SupplierCode, '_STOCK=0') where `id`=ItemId;
                WHEN 'NLA' THEN UPDATE `product` SET DCQuantity = CONCAT(SupplierCode, '_STOCK=0') where `id`=ItemId;
            END CASE;
        END IF;

	    SET search_index = search_index - 1;
    END WHILE;
END;;
DELIMITER ;
