DROP TABLE IF EXISTS `hook`;
CREATE TABLE `hook` (
    `id` varchar(32) NOT NULL,
    `Name` varchar(255) NOT NULL,
    `ProcName` varchar(255) NOT NULL,
    `Type` varchar(10) DEFAULT 'procedure',
    `Active` TINYINT(1) DEFAULT 0,
    `Description` varchar(512) DEFAULT '',
    PRIMARY KEY (`id`),
    KEY `name` (`Name`),
    KEY `active` (`Active`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
