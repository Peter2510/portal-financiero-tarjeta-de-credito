-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: portal_financiero_tarjeta_de_credito
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `configuracion`
--

DROP TABLE IF EXISTS `configuracion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `configuracion` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `valor` decimal(5,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipo` (`tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `configuracion`
--

LOCK TABLES `configuracion` WRITE;
/*!40000 ALTER TABLE `configuracion` DISABLE KEYS */;
INSERT INTO `configuracion` VALUES ('2dc1d051-7055-409e-b86c-09b969f99936','Tipo de cambio de Quetzal a Dolar',7.50,'2024-10-26 06:48:14','2024-10-26 06:53:34'),('858e8954-27f4-420c-9284-c5bec043ab59','Cobro por uso de tarjeta de credito',0.25,'2024-10-26 06:49:59','2024-10-26 06:49:59');
/*!40000 ALTER TABLE `configuracion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entidad_proveedor`
--

DROP TABLE IF EXISTS `entidad_proveedor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entidad_proveedor` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `entidad` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entidad` (`entidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entidad_proveedor`
--

LOCK TABLES `entidad_proveedor` WRITE;
/*!40000 ALTER TABLE `entidad_proveedor` DISABLE KEYS */;
INSERT INTO `entidad_proveedor` VALUES ('2970fd43-922a-4f9e-ba3e-1141b283c658','American Express','2024-10-26 07:18:02','2024-10-26 07:18:02'),('8086d489-27d8-437b-9de4-d270f189a167','Visa','2024-10-26 07:16:35','2024-10-26 07:16:35'),('c81421ce-9c43-4005-9a9c-6f804221fb69','Mastercard','2024-10-26 07:16:57','2024-10-26 07:16:57'),('cf9c28a2-c903-4562-ac1a-79ae21579ad8','Discover','2024-10-26 07:20:02','2024-10-26 07:20:02');
/*!40000 ALTER TABLE `entidad_proveedor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moneda`
--

DROP TABLE IF EXISTS `moneda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moneda` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `simbolo` varchar(5) NOT NULL,
  `codigo_pais` varchar(5) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `simbolo` (`simbolo`),
  UNIQUE KEY `codigo_pais` (`codigo_pais`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moneda`
--

LOCK TABLES `moneda` WRITE;
/*!40000 ALTER TABLE `moneda` DISABLE KEYS */;
INSERT INTO `moneda` VALUES ('79004923-cb8a-4108-8872-02b46cb5e140','Q','GT','2024-10-26 06:01:34','2024-10-26 06:01:34'),('afa35ec7-776d-48e0-bae9-54714f2b3111','$','USD','2024-10-26 06:04:03','2024-10-26 06:04:03');
/*!40000 ALTER TABLE `moneda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motivo_bloqueo`
--

DROP TABLE IF EXISTS `motivo_bloqueo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motivo_bloqueo` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `motivo` (`motivo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motivo_bloqueo`
--

LOCK TABLES `motivo_bloqueo` WRITE;
/*!40000 ALTER TABLE `motivo_bloqueo` DISABLE KEYS */;
INSERT INTO `motivo_bloqueo` VALUES ('165f3633-3448-47f1-87ca-a60bfd5a0bc7','Extravio de tarjeta','2024-10-26 06:32:51','2024-10-26 06:32:51'),('1a0f5523-ad70-4809-a94e-733e5614aa8b','Rechazo al utilizar','2024-10-26 06:33:23','2024-10-26 06:33:23'),('7053fa38-1501-480e-90cf-cb4ad3ec4028','Robo de tarjeta','2024-10-26 06:32:38','2024-10-26 06:32:38'),('bf274a46-bcce-44c5-b5de-a10ce5869a93','Moroso','2024-10-26 06:33:04','2024-10-26 06:33:04');
/*!40000 ALTER TABLE `motivo_bloqueo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `motivo_eliminacion`
--

DROP TABLE IF EXISTS `motivo_eliminacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `motivo_eliminacion` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `motivo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `motivo` (`motivo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `motivo_eliminacion`
--

LOCK TABLES `motivo_eliminacion` WRITE;
/*!40000 ALTER TABLE `motivo_eliminacion` DISABLE KEYS */;
INSERT INTO `motivo_eliminacion` VALUES ('00396fbe-8d75-4ad6-bd91-9d371da61842','Inactividad','2024-10-26 06:14:48','2024-10-26 06:14:48'),('479f01e5-1ca8-4f26-b508-82ff33e18ad2','Problemas para pagar','2024-10-26 06:15:20','2024-10-26 06:15:20'),('7106027a-547d-4cc5-b92b-3a18188009c4','Exceso de deudas','2024-10-26 06:16:06','2024-10-26 06:16:06'),('c885a512-625e-4335-9a20-d7d4092d3125','Fraude o uso indebido','2024-10-26 06:15:45','2024-10-26 06:15:45'),('e10746cc-eeae-46a5-b016-4b9e675f72c6','Dificultad para administrar las cuentas','2024-10-26 06:16:20','2024-10-26 06:16:20'),('fc12cfd8-2ffe-4c5a-ac4a-f405d75981b2','Altos intereses','2024-10-26 06:15:54','2024-10-26 06:15:54');
/*!40000 ALTER TABLE `motivo_eliminacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movimiento`
--

DROP TABLE IF EXISTS `movimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movimiento` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id_tipo_movimiento` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `descripcion` varchar(150) NOT NULL,
  `debito` decimal(10,2) DEFAULT NULL,
  `credito` decimal(10,2) DEFAULT NULL,
  `saldo_disponible` decimal(10,2) NOT NULL,
  `id_tarjeta_credito` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tipo_movimiento` (`id_tipo_movimiento`),
  KEY `id_tarjeta_credito` (`id_tarjeta_credito`),
  CONSTRAINT `movimiento_ibfk_1` FOREIGN KEY (`id_tipo_movimiento`) REFERENCES `tipo_movimiento` (`id`),
  CONSTRAINT `movimiento_ibfk_2` FOREIGN KEY (`id_tarjeta_credito`) REFERENCES `tarjeta_credito` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movimiento`
--

LOCK TABLES `movimiento` WRITE;
/*!40000 ALTER TABLE `movimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `movimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES ('362a346f-ddda-4b2c-b55d-cc624a37eb5b','Administrador','2024-10-24 23:26:06','2024-10-24 23:26:06'),('ba648de8-45f0-49b3-8edf-6d156ea12ce6','Cliente','2024-10-24 23:26:33','2024-10-24 23:26:33'),('cd3f5221-b74f-466c-9468-61af49000172','Web service','2024-10-26 09:36:00','2024-10-26 09:36:00');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarjeta_credito`
--

DROP TABLE IF EXISTS `tarjeta_credito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tarjeta_credito` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `id_tipo_tarjeta` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fecha_creacion` datetime NOT NULL,
  `notificar_uso` tinyint(1) NOT NULL,
  `limite_credito` decimal(10,0) NOT NULL,
  `nombre_tarjeta` varchar(255) NOT NULL,
  `numero_tarjeta` varchar(255) NOT NULL,
  `cvv` varchar(255) NOT NULL,
  `eliminada` tinyint(1) NOT NULL,
  `cantidad_rechazos` int NOT NULL,
  `bloqueado` tinyint(1) NOT NULL,
  `id_usuario` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `saldo` decimal(10,0) NOT NULL,
  `id_entidad_proveedor` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_tipo_tarjeta` (`id_tipo_tarjeta`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_entidad_proveedor` (`id_entidad_proveedor`),
  CONSTRAINT `tarjeta_credito_ibfk_1` FOREIGN KEY (`id_tipo_tarjeta`) REFERENCES `tipo_tarjeta` (`id`),
  CONSTRAINT `tarjeta_credito_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`),
  CONSTRAINT `tarjeta_credito_ibfk_3` FOREIGN KEY (`id_entidad_proveedor`) REFERENCES `entidad_proveedor` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarjeta_credito`
--

LOCK TABLES `tarjeta_credito` WRITE;
/*!40000 ALTER TABLE `tarjeta_credito` DISABLE KEYS */;
/*!40000 ALTER TABLE `tarjeta_credito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_movimiento`
--

DROP TABLE IF EXISTS `tipo_movimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_movimiento` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tipo` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipo` (`tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_movimiento`
--

LOCK TABLES `tipo_movimiento` WRITE;
/*!40000 ALTER TABLE `tipo_movimiento` DISABLE KEYS */;
INSERT INTO `tipo_movimiento` VALUES ('02fc0bda-1756-43e2-959f-5156805f1281','Debito','2024-10-26 07:07:33','2024-10-26 07:07:33'),('61325053-665f-4978-8bde-1a8af163df00','Abono','2024-10-26 07:07:51','2024-10-26 07:07:51'),('b51ce914-931d-4d5a-9e4d-149f7c32d623','Credito','2024-10-26 07:07:27','2024-10-26 07:07:27');
/*!40000 ALTER TABLE `tipo_movimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_tarjeta`
--

DROP TABLE IF EXISTS `tipo_tarjeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_tarjeta` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `id_moneda` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `limite_credito` decimal(10,2) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tipo` (`tipo`),
  KEY `id_moneda` (`id_moneda`),
  CONSTRAINT `tipo_tarjeta_ibfk_1` FOREIGN KEY (`id_moneda`) REFERENCES `moneda` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_tarjeta`
--

LOCK TABLES `tipo_tarjeta` WRITE;
/*!40000 ALTER TABLE `tipo_tarjeta` DISABLE KEYS */;
INSERT INTO `tipo_tarjeta` VALUES ('04f04019-8cda-4d5d-a5cd-456361ecda74','Normal','79004923-cb8a-4108-8872-02b46cb5e140',3000.00,'2024-10-28 21:04:22','2024-10-28 21:04:22'),('089eec8b-afa8-44b5-b518-6bbc7d60aa3c','Gold','afa35ec7-776d-48e0-bae9-54714f2b3111',1000.00,'2024-10-28 21:04:59','2024-10-28 21:04:59');
/*!40000 ALTER TABLE `tipo_tarjeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo_electronico` varchar(50) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `documento_identificacion` varchar(20) NOT NULL,
  `telefono` varchar(9) NOT NULL,
  `id_rol` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `a2f_activo` tinyint(1) NOT NULL DEFAULT '0',
  `pin` varchar(100) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `correo_electronico` (`correo_electronico`),
  UNIQUE KEY `documento_identificacion` (`documento_identificacion`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('b4ebfdd7-f391-404f-ba62-a5e756fac28a','Josep Carrasco','jcarrasco@correo.com','Madrid','135698745159','15698547','362a346f-ddda-4b2c-b55d-cc624a37eb5b',0,'$2b$10$w9BCpV58/5gZzWA.4nN7keHYF9rDXqnURTbETU.WslNg0burX9M9S','2024-10-27 09:02:53','2024-10-27 09:02:53');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario_web_service`
--

DROP TABLE IF EXISTS `usuario_web_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario_web_service` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `llave` varchar(100) NOT NULL,
  `pin` varchar(100) NOT NULL,
  `id_rol` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `usuario_web_service_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `rol` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario_web_service`
--

LOCK TABLES `usuario_web_service` WRITE;
/*!40000 ALTER TABLE `usuario_web_service` DISABLE KEYS */;
INSERT INTO `usuario_web_service` VALUES ('72510aaf-828c-449f-8e96-b6e6f7e6931d','A90SlJ9fvS98','$2b$10$cl1.xopUXLS4iA3LdnwyDus/b5Y8CGHlE.ELXgxRqSoMsBJP/6WgO','cd3f5221-b74f-466c-9468-61af49000172','2024-10-26 10:15:57','2024-10-26 10:15:57');
/*!40000 ALTER TABLE `usuario_web_service` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-30 15:31:33
