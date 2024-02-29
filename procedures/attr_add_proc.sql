DELIMITER ;;
CREATE PROCEDURE attr_add(IN attrName varchar(50), attrValue mediumtext)
BEGIN
    DECLARE search_sku VARCHAR(50);
    DECLARE search_index INT;
    SELECT count(`Sku`) from `bridge`.`product` INTO search_index;
    SET search_index = search_index - 1;
    WHILE search_index >= 0 DO
	select `bridge`.`product`.`Sku` from `bridge`.`product` limit 1 offset search_index into search_sku;
    INSERT INTO `bridge`.`attribute`
	(`Id`, `Sku`, `Classification`, `Name`, `Value`)
    VALUES (MD5(CONCAT(search_sku,attrName)), search_sku,'', attrName, attrValue)
	ON DUPLICATE KEY UPDATE
	`bridge`.`attribute`.`Sku` = search_sku,
    `bridge`.`attribute`.`Classification` = '',
    `bridge`.`attribute`.`Name` = attrName,
    `bridge`.`attribute`.`Value` = attrValue;
	SET search_index = search_index - 1;
    END WHILE;
END;;
DELIMITER ;
