CREATE TABLE `attrmetadata` (
  `id` varchar(32) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Type` varchar(8) NOT NULL,
  `List` varchar(2048) DEFAULT '',
  `Deleted` varchar(32) DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `name` (`Name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8
