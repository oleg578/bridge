DROP TABLE IF EXISTS `pdqty`;
CREATE TABLE `pdqty` (
    `Sku` varchar(50) NOT NULL,
    `QTYAvail` int(10) unsigned default 0,
    PRIMARY KEY (`Sku`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
