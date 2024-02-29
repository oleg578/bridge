DROP TABLE IF EXISTS `shipworks`;
CREATE TABLE `shipworks` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `orderid` varchar(255) NOT NULL,
  `qty` int(10) unsigned DEFAULT 0,
  `sku` varchar(50) DEFAULT '',
  `shippingcost` double(11,2) DEFAULT 0.00,
  `weight` double(11,4) DEFAULT 0.00,
  `shippingpostalcode` varchar(10) DEFAULT '',
  `shippingdate` datetime DEFAULT CURRENT_TIMESTAMP,
  `trackingnumber` varchar(255) DEFAULT '',
  `processed` tinyint(1) DEFAULT 0,
  `voided` tinyint(1) DEFAULT 0,
  `ordernumber` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `orderid` (`orderid`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8
