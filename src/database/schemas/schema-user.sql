CREATE DATABASE IF NOT EXISTS `apollo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `apollo`;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `nomeDeUsuario` varchar(20) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `trofeus` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `subCategoria1` varchar(255) NOT NULL,
  `subCategoria2` varchar(255) NOT NULL,
  `subCategoria3` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
