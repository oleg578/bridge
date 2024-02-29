DROP TABLE IF EXISTS `partsdata`;
CREATE TABLE `partsdata` (
  `ID` varchar(32) NOT NULL,
  `PartNo` varchar(50) NOT NULL,
  `MfgCode` varchar(32) NOT NULL,
  `Description` varchar(255) DEFAULT '',
  `DisplayText` varchar(255) DEFAULT '',
  `PublishedCost` double(11,2) DEFAULT '0.00',
  `AvgCost` double(11,2) DEFAULT '0.00',
  `MSRP` double(11,2) DEFAULT '0.00',
  `OnHand` int(10) unsigned DEFAULT '0',
  `Bin` varchar(32) DEFAULT '',
  `LocationId` int(10) unsigned DEFAULT '2',
  `Weight` double(11,3) DEFAULT 0.000,
  `Length` double(11,2) DEFAULT '0.00',
  `Depth` double(11,2) DEFAULT '0.00',
  `Height` double(11,2) DEFAULT '0.00',
  `Status` boolean DEFAULT 0,
  `Upc` varchar(20) DEFAULT '',
  `Asin` varchar(20) DEFAULT '',
  `Classification` varchar(100) DEFAULT '',
  PRIMARY KEY (`ID`),
  KEY `PartNo` (`PartNo`) USING BTREE,
  KEY `MfgCode` (`MfgCode`) USING BTREE,
  KEY `LocationId` (`LocationId`) USING BTREE,
  KEY `part_mult` (`PartNo`,`MfgCode`,`LocationId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;