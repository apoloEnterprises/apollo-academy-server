CREATE DATABASE IF NOT EXISTS `apollo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `apollo`;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `nomeDeUsuario` UNIQUE NOT NULL,
  `senha` varchar(255) NOT NULL,
  `email` UNIQUE NOT NULL,
  `trofeus` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `subCategoria1` varchar(255) NOT NULL,
  `subCategoria2` varchar(255) NOT NULL,
  `subCategoria3` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `perguntas` (
  `id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `data` varchar(20) NOT NULL,
  `autorID` varchar(20) NOT NULL,
  `pergunta-txt` varchar(20) NOT NULL,
  `pergunta-descr` varchar(20) NOT NULL,
  `categoria` varchar(20) NOT NULL,
  `subCategoria1` varchar(255) NOT NULL,
  `subCategoria2` varchar(255) NOT NULL,
  `subCategoria3` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

