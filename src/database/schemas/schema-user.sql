CREATE DATABASE IF NOT EXISTS `apollo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `apollo`;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` varchar(255) UNIQUE NOT NULL,
  `nomeDeUsuario` varchar(120) UNIQUE NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` varchar(100) UNIQUE NOT NULL,
  `trofeus` varchar(255) NOT NULL,
  `level` int(11) DEFAULT 1,
  `exp` int(11) DEFAULT 0,
  `categoria` varchar(255) NOT NULL,
  `subCategoria1` varchar(255) NOT NULL,
  `subCategoria2` varchar(255) NOT NULL,
  `subCategoria3` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
