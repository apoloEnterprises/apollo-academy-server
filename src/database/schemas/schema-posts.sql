CREATE DATABASE IF NOT EXISTS `apollo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `apollo`;


CREATE TABLE IF NOT EXISTS `perguntas` (
  `id` varchar(100) NOT NULL,
  `data` TIMESTAMP DEFAULT NOW(),
  `autor_ID` varchar(100) NOT NULL,
  `pergunta_Txt` varchar(255) NOT NULL,
  `pergunta_Descr` varchar(255) NOT NULL,
  `qnt_respostas` int(11) DEFAULT 0,
  `categoria` varchar(20) NOT NULL,
  `subCategoria1` varchar(20) NOT NULL,
  `subCategoria2` varchar(20) NOT NULL,
  `subCategoria3` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `respostas` (
  `id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `data` TIMESTAMP DEFAULT NOW(),
  `pergunta_ID` varchar(100) NOT NULL,
  `autor_ID` varchar(100) NOT NULL,
  `resposta_Txt` varchar(255) NOT NULL,
  `likes` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`pergunta_ID`) REFERENCES perguntas(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `comentarios` (
  `id` BINARY(16) default (UUID_TO_BIN(UUID())),
  `data` TIMESTAMP DEFAULT NOW(),
  `resposta_ID` varchar(20) NOT NULL,
  `autor_ID` varchar(20) NOT NULL,
  `comentario_Txt` varchar(20) NOT NULL,
  `likes` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

