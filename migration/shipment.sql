--
-- Table structure for table `shipment`
--

DROP TABLE IF EXISTS `shipment`;
CREATE TABLE `shipment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `SiteOrderID` varchar(255) DEFAULT NULL,
  `DeliveryStatus` varchar(50) DEFAULT NULL,
  `Sku` varchar(50) DEFAULT NULL,
  `Title` varchar(100) DEFAULT NULL,
  `Quantity` int(10) unsigned DEFAULT NULL,
  `TrackingNumber` varchar(255) DEFAULT NULL,
  `ShippedDate` varchar(32) DEFAULT NULL,
  `ShippingClass` varchar(100) DEFAULT NULL,
  `ShippingCarrier` varchar(100) DEFAULT NULL,
  `ChannelAdvisorOrderID` varchar(100) DEFAULT NULL,
  `Account` varchar(100) DEFAULT NULL,
  `BuyerEmail` varchar(255) DEFAULT NULL,
  `DeliverByDate`	 varchar(32) DEFAULT NULL,
  `DistributionCenter` varchar(100) DEFAULT NULL,
  `EstimatedShipDate`	 varchar(32) DEFAULT NULL,
  `OrderDate` varchar(32) DEFAULT NULL,
  `OrderPrivateNotes` varchar(1000) DEFAULT NULL,
  `OrderPublicNotes` varchar(1000) DEFAULT NULL,
  `PurchasedSKU` varchar(50) DEFAULT NULL,
  `ShippingType` varchar(100) DEFAULT NULL,
  `SiteName` varchar(255) DEFAULT NULL,
  `WarehouseLocation` varchar(55) DEFAULT NULL,
  `ExternalFulfillmentStatus` varchar(32) DEFAULT NULL,
  `PaymentStatus` varchar(50) DEFAULT NULL,
  `ExternalFulfillmentID` varchar(255) DEFAULT NULL,
  `SecondarySiteOrderID` varchar(255) DEFAULT NULL,
  `SellerFulfillmentID` varchar(255) DEFAULT NULL,
  `SellerOrderID` varchar(255) DEFAULT NULL,
  `ShippingAddressLine1` varchar(255) DEFAULT NULL,
  `ShippingAddressLine2` varchar(255) DEFAULT NULL,
  `ShippingCity` varchar(255) DEFAULT NULL,
  `ShippingCountry` varchar(255) DEFAULT NULL,
  `ShippingFirstName` varchar(255) DEFAULT NULL,
  `ShippingLastName` varchar(255) DEFAULT NULL,
  `ShippingPostalCode` varchar(255) DEFAULT NULL,
  `ShippingStateorProvince` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `SiteOrderID` (`SiteOrderID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
