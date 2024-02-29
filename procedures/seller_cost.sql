drop procedure if exists seller_cost;
DELIMITER ;;
CREATE PROCEDURE seller_cost()
  BEGIN
    insert into `product` (`product`.`id`,`product`.`Sku`, `product`.`SellerCost`) select md5(`attribute`.`Sku`),`attribute`.`Sku`, `attribute`.`Value` from `attribute` where `attribute`.`Name`='C_COST' and `attribute`.`Value`!='_Delete_' on duplicate key update `product`.`SellerCost`=`attribute`.`Value`;
  END;;
DELIMITER ;
