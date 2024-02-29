drop procedure if exists non_map_classification;
DELIMITER ;;
CREATE PROCEDURE non_map_classification()
BEGIN
insert ignore into non_map (`sku_custom`) select product.Sku as sku_custom from product inner join (select * from ((select PartNo, oldmfg from partsdata inner join mfgmap on(mfgmap.newmfg=partsdata.MfgCode) where Classification=CONCAT(MfgCode, "_1001") and newmfg='POL') union (select PartNo,oldmfg from partsdata inner join mfgmap on(mfgmap.newmfg=partsdata.MfgCode) where MfgCode='POL' and Classification in ("80","81","82","83","84","85","86","87","88","89"))) as ppol group by PartNo) as pn on(CONCAT_WS("_",pn.oldmfg, pn.PartNo)=product.Sku) where product.SKUType<>'Parent';
END;;
DELIMITER ;
