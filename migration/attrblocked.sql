CREATE TABLE `attrblocked` (
  `id` varchar(32) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Deleted` varchar(32) DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `name` (`Name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8
