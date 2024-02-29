DROP TABLE IF EXISTS `mfgmap`;
CREATE TABLE `mfgmap` (
  `oldmfg` varchar(32) NOT NULL,
  `newmfg` varchar(32) NOT NULL,
  PRIMARY KEY (`oldmfg`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8
