drop procedure if exists c_test;
DELIMITER ;;
CREATE PROCEDURE c_test()
BEGIN
DECLARE ItemAvgCost double(11,2);
SET ItemAvgCost=0.00;
SELECT ItemAvgCost;
END;;
DELIMITER ;
