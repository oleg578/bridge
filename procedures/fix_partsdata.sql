drop procedure if exists fix_partsdata;
DELIMITER $$
CREATE PROCEDURE fix_partsdata(IN src_partno varchar(255),IN src_mfg varchar(255),IN src_locid varchar(255),IN dest_partno varchar(255),IN dest_mfg varchar(255),IN dest_locid varchar(255))
BEGIN
    DECLARE onhand_val varchar(255);
    SELECT OnHand INTO onhand_val FROM PartsData WHERE PartNo = src_partno AND MfgCode = src_mfg AND LocationId = src_locid;
    UPDATE PartsData SET OnHand = onhand_val WHERE PartNo = dest_partno AND MfgCode = dest_mfg AND LocationId = dest_locid;
END$$
DELIMITER ;
