drop procedure if exists non_map_general;
DELIMITER ;;
CREATE PROCEDURE non_map_general()
BEGIN
insert ignore into non_map (`sku_custom`) select product.Sku from product inner join attribute on(product.Sku=attribute.Sku and attribute.Name="D_SHIPPMENT_TYPE") where attribute.Value='NLA';
END;;
DELIMITER ;

