-- MySQL dump 10.16  Distrib 10.1.14-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: bridge
-- ------------------------------------------------------
-- Server version	10.1.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `productpush`
--

DROP TABLE IF EXISTS `productpush`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productpush` (
  `id` varchar(32) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Ordinal` int(11) DEFAULT '0',
  `Push` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `name` (`Name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productpush`
--

LOCK TABLES `productpush` WRITE;
/*!40000 ALTER TABLE `productpush` DISABLE KEYS */;
INSERT INTO `productpush` VALUES ('05462881c7e01882630804bf940167c0','SupplierPO',52,0),('0714bf3e0a7322a5bbecd2fc05309a4b','QuantityonAmazon',19,0),('0756dbdc868ba538784de941bc3b0e4f','StartingBid',25,0),('0a164a30f43b25e889a200116bc5a65a','HarmonizedCode',67,0),('0abeef19d1493e6eeaf92eccc5ba7f60','ChannelAdvisorStoreCategoryHiera',64,0),('0b2a8a8fed13280ecd74f7545bc2b962','UpdatedAt',75,0),('0b823c0f6cd9cb50e6ff0991c1c5c54b','ItemCreateDate',23,0),('0d85ed40d53afe5a584ec64589c83231','QuantityOpen',9,0),('0db21bc956487d570d64fa86661144a5','SecondChanceOfferPrice',48,0),('0eceeb45861f9585dd7a97a3e36f85c6','Created',73,0),('0ef872e46e97abdf0ca40196318630a3','SupplierCode',51,0),('13cc2555becc194254044e05d53bdc01','VariationParentSKU',57,0),('1a5cfa5d07a7c36cc9d95215a81fcc59','EAN',30,0),('1a7966fcfd1aa998a542f47627d27bbf','QuantityPendingShipment',12,0),('1be6f9eb563f3bf85c78b4219bf09de9','Brand',41,0),('23df01e7d4a126346f2c00b47bd403eb','ChannelAdvisorStoreURL',66,0),('24e0d9062a7e5383c36bf67e93ada036','ChannelAdvisorStoreCategoryID',63,0),('294598238a4d88a9920c7e6fba9bb843','MPN',32,0),('2b128925ccbc9bb7745ee279526abf4d','QuantityPendingPayment',11,0),('328cb370251adbabea1910f2739fb48e','ItemLastModifiedDate',24,0),('32954654ac8fe66a1d09be19001de2d4','Width',70,0),('351694d5ca17ed32faf2c689f1f5e04f','QuantityoneBay',17,0),('3ad6cb6100190c8f81e99fd52debf7ef','Labels',58,0),('46d295c8a97befd247d2d634ac8cc4b3','CreatedAt',74,0),('4c47c34e42568f58444ca45181010518','QuantityUpdateType',6,0),('4ecc0d90eec1cea3e9db96583a1bb9c2','Blocked',37,0),('51ffc29efc06a15055eca2094dddf8c8','FlagDescription',36,0),('55e1547c9e342166202461083c1b0add','ChannelAdvisorStorePrice',62,0),('585eb810ecb5945743cdcae84095f573','BlockedComment',38,0),('5d2dc46145ba498f0cf18d6c2d269932','QuantityPooledPendingCheckout',14,0),('5fe6005bf6e415c950c011fb65f12b8f','Deleted',71,0),('6418a33ad150bf41dde764f8935e2e6f','TotalQuantity',8,0),('66f9c6c5b672ee16deeef6e4503cb4bc','Reserve',26,0),('67ed6ddb7d890b23166c1bef771e9451','Edited',72,0),('694e8d1f2ee056f98ee488bdc4982d73','Quantity',5,1),('7fc9a1262e9f89a4e87f81c38f1aa8b1','ReceivedInInventory',54,0),('80a71875df891f4f9697856298e9c576','BuyItNowPrice',46,0),('86484255f7c7531856d026ae80df54a1','QuantityonRakutencomShoppingPool',22,0),('87a38a789a1f5ae813d76886bca16aba','ChannelAdvisorStoreTitle',59,0),('8c489d0946f66d17d73f26366a4bf620','Weight',27,0),('8db07d2e99c2a6161d6dc93c2fe4efff','ASIN',31,0),('923cded353539adf694f4e9fee6cbb8b','QuantityPooledPendingPayment',15,0),('9609dddf3618cff8f67b7829e6fc575e','ISBN',28,0),('9836fb2c256da7f85c2b60b98ecb6b52','WarehouseLocation',53,0),('9a39df206406de0db1afb81d95193e05','QuantityPendingCheckout',10,0),('9a97179c08f1d96e284c1394fa573d71','PictureURLs',49,0),('9cc385c9e828a05a8c77ea60fded878e','ChannelAdvisorStoreDescription',60,0),('9e2941b3c81256fac10392aaca4ccfde','Condition',42,0),('a7c61b994d7e651cb22b6b130461d814','RelationshipName',56,0),('a82e93a711b19d533ebfd0ae5e7ce33c','AuctionTitle',2,0),('a864159f4b82fea70945d060554e9c37','SellerCost',44,0),('adbafb042df24d6204e4ce39650d827a','StoreMetaDescription',61,0),('b10f0c75b7b48c70aab4aed9e84e55da','Warranty',43,0),('b12b64d63ddc25a3f2065590b43bfdea','SKUType',4,1),('b26a278d0b6cd8640592269bf9627db5','QuantityPooledOpen',13,0),('b5a7adde1af5c87d7fd797b6245c2a39','Description',34,0),('b792b597b94ac0f341707818e8eb0065','Sku',3,1),('b80bb7740288fda1f201890375a60c8f','id',1,0),('b8ab95c962aea49336f9228fd178a3b0','ProductMargin',45,0),('ba2a9c6c8c77e03f83ef8bf543612275','Length',69,0),('c0bd7654d5b278e65f21cf4e9153fdb4','Manufacturer',40,0),('c5836008c1649301e29351a55db8f65c','Flag',35,0),('cf8c67bfe9fb43efcdd87601aeea6a0e','QuantityonRakutencomShopping',21,0),('d13460065c3422dba07c2dcd4b16af5d','TaxProductCode',50,0),('d33806d2fdc71d7f7cf4009de6131526','RetailPrice',47,0),('db99ae9b078e441ede30cd51caaf8723','QuantityoneBayPooled',18,0),('ded93ec92b33c0aa795a8dc9eba4e981','BlockExternalQuantity',39,0),('e126a5b039c513eb2f7c52a70ac976ef','QuantityonAmazonPooled',20,0),('e792a356ef42e8f12cda4783a0e4867a','QuantityPooledPendingShipment',16,0),('ed20ceeb280589110b4624f00eabd6b4','DCQuantity',7,0),('eec6c4bdbd339edf8cbea68becb85244','Height',68,0),('f03221e080a993d971d05b7661e8daf9','InventorySubtitle',55,0),('f766690cd1739656f60cb172ff773ad5','ChannelAdvisorStoreCategoryName',65,0),('f7e427639246418897ee1818091196bc','ShortDescription',33,0),('fbd99ad01b92dbafc686772a39e3d065','UPC',29,0);
/*!40000 ALTER TABLE `productpush` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attrpush`
--

DROP TABLE IF EXISTS `attrpush`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `attrpush` (
  `id` varchar(32) NOT NULL,
  `Name` varchar(32) NOT NULL,
  `Push` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `name` (`Name`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attrpush`
--

LOCK TABLES `attrpush` WRITE;
/*!40000 ALTER TABLE `attrpush` DISABLE KEYS */;
INSERT INTO `attrpush` VALUES ('00a75d1e2279e088830dacd913085162','Model Numbers',0),('011502c09d01833fc7d28ce46ba4a715','Model Line',0),('019ec3132cdf8ee0f2e2a75cf5d3e459','Gender',0),('03a8bcdec835e0d610d23c2f19731277','Manufacttrer Part Number',0),('042b3f8db0a5c097540b2789d53f4566','AMZ_BULLET_1',0),('0483c33321a91355156cd52b968aca20','Boot Size',0),('0519242a42fed0f739a6abe5c0c86ca6','AMZ_AVGSHIPCOST',0),('051adfa024a7906812a07cbc64496985','Manufacturer Part Numner',0),('056b27080d13bf24856dcaef7cb9d9de','AMZ_BULLET_3',0),('0577e7404754ab8e69d906ed8052469d','Z-8-ALT',0),('0579ae7857b4b576b0618b5f2548c4a8','Z-3-ALT',0),('06db1eeb104216564a8974b6a9d744e8','Spec Code',0),('077e8d44fba1729a9674a44498a5243b','C_PRICE_AMAZON',0),('07b8c025135fc950db1c6406eb0cd33a','Z-9-URL',0),('08676a879fd6140bc4154bc7f088532a','AMZCOLOR',0),('0b3920eb4541c7f6a4f10c1ad1156b78','Model Lines',0),('0d1a52153c14b94ca54806322e1c5944','AMZ TITLE',0),('0e2a01be63047fe86b5f77de56802b38','A_AMAZON_BULLET0',0),('0fa7ac7323ff0aa822f4bda951323d5a','Placement on Vehicle',0),('1010ce781c91af80c50ee4124cd0c72a','~~ FITMENT REQUIRED ~~',0),('105ec5f2b388a16791bbca13a2673629','AMZSALESTARTDATE',0),('1165a1611ada115880c283e7fbdac2ea','ManufacturerCASuggestion',0),('12097a4e1abc6f284b5a125edb6b0296','Jacket Size',0),('12b472045b3bafe86faa24b11d35b7d3','D_MFG_TITLE',0),('15de14fe48f1db7318788f1389543bf8','Z-5-ALT',0),('1863f13bed773ad658d332d71ea06ef0','Repalces OEM MPN',0),('18a9867b7ef27ed8bb0a05ba8d1acb4a','Size (Womens\'s)',0),('199be68d4003c6da0d275098ac261c1e','Z-8-BOXIMG',0),('19fc88b8f05301119676260f745102ac','Part Type',0),('1be6f9eb563f3bf85c78b4219bf09de9','Brand',0),('1be761663d39ee31c2fd4ed7c43dfd33','AMZITEMQTY',0),('1ce4dbdd24e320824a1f130b3a203e22','Brand / Make',0),('1d580e65cdd84475262fbccbd1dd6627','~~ EDITED BY ~~',0),('1fe3c9d0657c143dd35fa09974da425b','Part Number',0),('20e13c4820170e9cf2272476f1b71dd6','Z-1-URL',0),('214e34782a27d0426d056a470346e13f','AMZ_TeamName',0),('21d786523707a0df9968edd5ae3e6175','Trimmer & Edger Type',0),('2256c24beaeb2c9b69cc02f161df3f11','Z-8-URL',0),('22c11357607d79da69a5acb998c1253c','AMZ_PACKSIZE',0),('239f5ad7bb5b600263334bded0904dae','AMZSPORTTYPE',0),('23eeda2cd265fed20b99cfb4e9d2cfbb','B_APPAREL_SIZE',0),('25ac429f9072293d27a836ee2a148f47','Models',0),('26475fcb1f59a14bcfe966146d95b2f4','Z-6-ALT',0),('294598238a4d88a9920c7e6fba9bb843','MPN',0),('29ac044e0878ee6ca9541dbaa96d6e36','Repleaces OEM MPN',0),('2b38c8521d77761f2f6dbc70e0fe72be','A_AMAZON_CATEGORY',0),('2b718be40010c6efaa7a0a2331e0039b','Engine Size (cc)',0),('2be710b3a0d9bf51152f9e1d46a77e2e','Glove Size',0),('2c0bd49eae2d9c328abf6fda3847e5a5','Size Type',0),('2c58224e8c9057d598d7fdd1ba6cea7f','AMZ_BULLET_4',0),('2e962ff82309761892418b5deec20bd8','Z-3-BOXIMG',0),('3038af6be700c27aeb7074b40856f1ec','AMZ_ColorSize',0),('3182f8fc492b1c2c326eef2842864c34','AMZ Item Type',0),('323101e93cb2122e4b059d54343ae2f9','Condition Notes',0),('332285ce314224a9cebcc25b6f3a4086','Transmission Type',0),('335c94d00cce83d2db421a6ee8b9a1fd','A_AMAZON_BULLET3',0),('33bfe46488609fec263ce4b76252a448','AMZGENDER',0),('349e6b82a01e85a2e6af321ad689bd39','OEM MPN',0),('36f332de80eaf23520010091497f5864','B_APPAREL_GENDER',0),('37047c110e13d050d5e78dc5e7e8956b','Pant Size',0),('3778e31f981df25b34d52063a4562656','Equipment Type',0),('380ccee13608320f5464d7b1b8bb1062','Voltage Compatibility',0),('3813b6db79a55f521eb74d265100f15f','Vehicle Title',0),('3a7bac6e0ec77a9e9e343ef3133846c6','A_AMAZON_BULLET2',0),('3bcfffebbd3c71cc83e5f328a9a58794','Pack Size',0),('3bfc3efe57c79b42822509635a5f0cb0','AMZBootWidth',0),('3c6c26a3c065398d0c5193158d184271','Drive Train',0),('3c756e5e8d2fad64c136a47a2efa4450','B_COLOR',0),('3d9221ee9e471021ce6ce73c1d5bdb60','Manufacturer Part Number',0),('404e19f8d038c6e33dc53e4e5aa7aa2d','A_AMAZON_PRODUCTTYPE',0),('40bd9982a8bc935f0d82f70b89bb7e1e','PackageQuantityCASuggestion',0),('42934a217dbcd70864bb1f3dd335b4be','Size (Men\'s)',0),('42db639f666db13dbbc3e05883c88fce','Z-3-URL',0),('431724d35494af91264349987ceb123c','New Row',0),('43b698ec217734ce578f3c8801fb51e8','Z-5-BOXIMG',0),('43d2d6637f08cb2125ef9bb9a03eb20f','Weight & Footage',0),('44ac61d7d597a3f4aee52ea2400d73c6','For Sale By',0),('45ba914b8b0c752ef1e67f9b474bfe31','MfrPartNumberCASuggestion',0),('46c24bcdeedc8084a1c3f7b634153039','Modesl',0),('47035e932b51fa00f3153e8c9ca764a5','POLX_SUB',0),('4ab77343c6854c16a2de5ebebf210687','A_AMAZON_BULLET4',0),('4ada336213b31a1ca02875dd82cb59fe','Z-1-ALT',0),('4f4e515856cb7a2daef73657909539db','Z-7-ALT',0),('50ad0b851862b33ef33ef3d03a54a937','AMZ NOTE',0),('50df20551ba311725b017c5461e36ef1','Country of Manufacture',0),('529a05ca6c1263aab080ec4f20754411','Make',0),('52ffc466b7e07fa64ef8cd19df982538','Z-2-ALT',0),('53266b20f8b0da220701623f66a37722','AMZModelYear',0),('537992561b1a1c95598e1d8fc21303cf','Spark Plug',0),('537c66b24ef5c83b7382cdc3f34885f2','Year',0),('54266c6c1db27b76a02f7472ac7d23b6','Style (Women\'s)',0),('54c9319375dc77b27d65f7abb442303b','First Accessory Choice',0),('56897501e2653991d3da6d8d7103754f','To Fit',0),('58421ee8c966fe141aef2aeee884714e','Z-9-ALT',0),('587f2c7bd1304743c7270136e0562091','Max. Input Current',0),('596e61ba7c0e3982be2a8764a4ac6338','Sizes',0),('597c796b269442c058a25090eeac7c6e','B_PLACEMENT',0),('59ba958bbb1192e22dd3630ae67af3fe','AMZ_special_size_type',0),('5a85a584c93f25f52c998b119c8ad042','Compatible Product',0),('5bfce74acb2e639b27c22fd6464a59b9','Part',0),('5d50889672f6f860d14f502de3de1957','Colors',0),('5ebd809677d9e3142311dd8707193906','BASIC TITLE',0),('5f5d49febba51bf23c277dc2aefece35','AMZCLOTHINGSIZE',0),('601294894177224596a4e0adcf460b63','Size/Pieces',0),('60c8155b902321af46999730e685aa67','Z-2-URL',0),('61bfb09d55787f685669604356b9c0e8','Z-4-BOXIMG',0),('66c1c4d58c02514c36ac74795fa5438d','amznewprice',0),('66dd0f46faf9ef83c3533fcd1994f50b','Vehicle Make',0),('67069bca2a6b6523d378aaa7ca6b8796','AMZMaterialType',0),('6a707108c375b355f333b85e5ae0a75b','ItemTypeCASuggestion',0),('6d2fe3609abc6e4ecb6f94d1bfdbad34','AMZ_Min_Age',0),('6e4161d40a18a6fff752811fa704fdd0','AMZ_Variation_Theme',0),('6f6cb72d544962fa333e2e34ce64f719','Size',0),('717bb249b1244f6cb1317109d1a62bdf','Z-4-URL',0),('77a92f80bd1d79efaa364d930c8f0ae3','Product Number',0),('7a44a5b15acc117b264d423137ab0e64','Z-6-BOXIMG',0),('7a693d111c174968f9e300766db5dd11','Product Year',0),('7ae8ea15a54c9c2afb140cf0d2e15861','Equipment Make',0),('7baccc3294154028cfa35e0a8449d72f','A_FMT_TITLE',0),('7d09a3620e10572b57e65ab3fca67d5e','BrandCASuggestion',0),('7d3131a652cd151f09b308d47b442d3c','AMZOTHERTYPE',0),('7ecf6a7a832b1ef9825d0165cac280d0','AMZCOLORMAP',0),('84be54bb4bd1b755a27d86388700d097','Brands',0),('851ea3255f1493d8dc884304cc73eb91','AMZ Product Type',0),('85a7cd587d6142dbfc1a4de05af7b75d','Scale',0),('87df0730f733871a4f621a3c1a1f9569','Mileage',0),('87ea6549c053dc050fd0d17186a1f91a','Z-5-URL',0),('88b4f22b52ffc767e06b2bac91ee3c16','AMZ DESCRIPTION',0),('8a6c53d363c10cae8c3e49e460e01767','A_AMAZON_MODELNAME',0),('8afbebdbf2b1cb7e1acb87eeb0f5d88b','Replaces OEM MPN',0),('8ceaf547caa0fdb71e782a23465ff39a','Makes',0),('8e1f0fd616d8793f9ea6d1fc81b4cc34','~~~ GHOST FAIL SAFE ~~~',0),('9125e31ccbc67d025296f78e7926c7af','Z-7-URL',0),('91abce618f1f3bbafbb6256a03b7399f','Lawn Mower Models',0),('9220b527a89b94258734ee05cbe8652c','Part Brand',0),('93f0af9c100bda5bfa375df34ab3bbb1','Power Source',0),('948f0edf37b92d0717053d38e5ea12c2','Gauge',0),('957780198e59f44eac46b853c0d19e87','AmzRepricerTestPrice',0),('96a98dcbbac65f0ccc35b8da9d55de82','Second Accesory Choice',0),('9809543d15e409bd0aa36d50ed9394ce','AMZSALEENDDATE',0),('9b1d86229211c3015f5cfcd2aff7efef','amzsp',0),('9e1f2d438cee5e47398787c9b2f9d27f','Surface Finish',0),('9e2941b3c81256fac10392aaca4ccfde','Condition',0),('9f1fbf4f7d05e17dc4cd7e25e3a2601a','Size / Footage',0),('9f230e3e36234b9b1f97def77a616ac3','Gauge Size',0),('a00f6d6b3c23f1db2f1509dfb2644a0d','Fits',0),('a068e1e568f92b6a972ba4fda0ee0a2c','Weight & Size',0),('a1fa27779242b4902f7ae3bdd5c6d508','Type',0),('a2a2604fcb8800f5fa581834b59ba9dc','ebay-metahead',0),('a2cf004a757a192c0c4ecc0db7fbd8d8','Sleeve Length',0),('a559b87068921eec05086ce5485e9784','Model',0),('a8e1f138534f1d0bfe592bc69dce5e22','A_AMAZON_BULLET1',0),('aa15da9bd76b76bb649db4439c005528','Maintenance Kit',0),('aa682bf0f6ebe63d8b31cfff8312ebc9','AMZ_KEYWORDS',0),('aadd4c18c23c1f15783c51e092803bbb','AMZ Category',0),('ada741afd81da4aef4be6ff86a0e2c5a','Waist Size',0),('ae284f900f9d6e21ba69144cfc91e41b','Style',0),('ae402633890ae52d9887d762ebbf6b91','A_AMAZON_TITLE',0),('af1d4eb92c41e33658e985c305c7d0de','B_APPAREL_TYPE',0),('b020db9de04dcd7e98d7621154ba6761','Size (Women\'s)',0),('b10f0c75b7b48c70aab4aed9e84e55da','Warranty',0),('b171961b3153fad7c9812f0df0c22f09','US Shoe Size (Men\'s)',0),('b3821568d06baeb27a3048e2921d93d1','C_PRICE_MSRP',0),('b490f892af7fe4fd60600ea3c7955963','Jersey Size',0),('b63a73f5d03c376d41784cf12d59d208','Z-4-ALT',0),('b8637fdb6681bf5f1f1975c3cf20278b','Fits Brand',0),('ba06cea1afa4cd9f10b23dae46afef42','AMZ_BULLET_5',0),('ba32fb2709a7037bf9cc7e689184d1fa','Recommended Age Range',0),('beda6f08984d467b6710116bb20eac77','AMZCLOTHINGMODEL',0),('c3d63d1c5d99f51dd589e790135a3345','Z-2-BOXIMG',0),('c6eb561a0106a9314e9dcf5e4c812651','ebay-fitment',0),('c75c99e71675e586cb39efe7a12f14ec','B_OEM_PART',0),('c8adcb78161b55b140ec82372c717607','AMZ_BULLET_2',0),('c91d3aad471f840ec594ef0e706f5433','Handling_Time',0),('ca0a37d9bccc4cb27811a6bc5ed42ee0','Amz_Vehicle Model',0),('cb5feb1b7314637725a2e73bdc9f7295','Color',0),('cde48fe1d6343d09026623ff06a88a92','A_AMAZON_ITEMTYPE',0),('cf14a92010b9f2eb275aa6b382fc4271','A_AMAZON_BULLET5',0),('d24472662d62b0b333acb2894de3d1ae','Z-7-BOXIMG',0),('d3d4dc556c1fdd74a32a3320859ea58f','Z-METAHEAD',0),('d8f0966ad8359c15833972649f26d142','smzsd',0),('d92a8333dd3ccb895cc65f7455b71206','Material',0),('dd20850f12db3a8f9f55a3c285f6c816','Model Number',0),('dd7c2fe521130fae4877b2ce36610951','DepartmentCASuggestion',0),('df9c715f20aaf58fb3926cc02b08ec53','Compatibility',0),('e15b5c881cc3d76746ed09bb4668de01','Z-6-URL',0),('e26ec8819cb9b4e48f970d63aa69475a','Exterior Color',0),('e2716f400d704606cc5d4c0987e7ad76','Model Type',0),('e69a8d04e7824d2effcf0eaf84541124','C_PRICE_EBAY',0),('e7ad83d7fe66ae02471ce233c2c399f7','Replace OEM MPN',0),('e8ca3634ad48d93d98573ac07303d019','A_AMAZON_KEYWORDS',0),('ec27ab60a619c1f4823ff9436b1f4cf5','Replaces OEM',0),('ec2e8a456af52a5346a4569379747a8f','FREIGHTCHARGE',0),('ee9dc889807e7666da64cea679b1930d','Z-1-BOXIMG',0),('efcf5cf9a3dde9214961ac38a41485c0','Fitment',0),('f1cc04c0cbfcbe91ae7d102cab68313b','Z-9-BOXIMG',0),('f290fab651b52a67d5712972562576f0','Bib Size',0),('f2d5cfa69a85ab04447b50d94e92d801','Strikethrough_Price',0),('f2edcb0b2b83bcdbbfc5ed985cbf0667','AmzRepricerAutoPrice',0),('f475084e3ed5fd2ceb33b14b89d5b3f5','AMZ_Condition',0),('f57cf5298d15e3cac60e3d0edd7ff1e2','Pants Size',0),('f6a24a094bc22f990cb14521beaa8e29','Maximum Input Current',0),('f8f95d9ba3fae333bd5d4a96ba8546a3','Replaces MPN',0),('f977b37e937833042808ab2b353bcd97','AMZCLOTHINGDEPT',0),('fbd99ad01b92dbafc686772a39e3d065','UPC',0),('fbde2c1c125202618ba4ea64c0d6ac56','Z-FITMENT',0),('fee589b99144d780564418e17490595d','Compatible Brand',0),('ffa9736e5207a349a42009be8022b0fe','Outlets',0);
/*!40000 ALTER TABLE `attrpush` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-27 12:23:43