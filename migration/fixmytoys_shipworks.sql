DROP TABLE IF EXISTS `fixmytoys_shipworks`;
CREATE TABLE `fixmytoys_shipworks` (
    `ID` int unsigned AUTO_INCREMENT,
    `ShippingID` varchar(50) NOT NULL,
    `OrderID` varchar(50) NOT NULL,
    `SKU` varchar(50) NOT NULL,
    `Quantity` int unsigned DEFAULT 0,
    `InvoiceDate` DATE NOT NULL,
    `ShippingDate` DATE NOT NULL,
    `ShippingCost` double(11,2) DEFAULT '0.00',
    `ShippingCarrier` varchar(50) NOT NULL,
    `ShippingMethod` varchar(50) NOT NULL,
    `TrackingNumber` varchar(50) NOT NULL,
    `ShippedToZipCode` varchar(50) NOT NULL,
    `ShipWeight` double(7,2) DEFAULT '0.00',
    PRIMARY KEY (`ID`),
    KEY `SKU` (`SKU`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
