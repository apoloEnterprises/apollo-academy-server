CREATE DATABASE IF NOT EXISTS `apollo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `apollo`;

CREATE TABLE IF NOT EXISTS `usuarios` (
  `id` varchar(255) UNIQUE NOT NULL,
  `nomeDeUsuario` varchar(120) UNIQUE NOT NULL,
  `nome_completo` varchar(120),
  `senha` varchar(255) NOT NULL,
  `email` varchar(100) UNIQUE NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `slides` (
  `id` varchar(255) UNIQUE NOT NULL,
  `id_usuario` varchar(120) UNIQUE NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `usuario_nomeCompleto` (
  `id` varchar(255) UNIQUE NOT NULL,
  `id_usuario` varchar(120) UNIQUE NOT NULL,
  `nome_completo` varchar(120) NOT NULL,
  `mostrar` int default 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
 
CREATE TABLE IF NOT EXISTS `titulos` (
  `id` varchar(255) UNIQUE NOT NULL,
  `id_usuario` varchar(120) UNIQUE NOT NULL,
  `nome_completo` varchar(120) NOT NULL,
  `mostrar` int default 0,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- user cateogry, selected after first log in
CREATE TABLE IF NOT EXISTS `usuario_category` (
   `id` int(255) NOT NULL AUTO_INCREMENT,
  `id_usuario` varchar(255) NOT NULL,
  `categoria` varchar(120) NOT NULL,
  `sub_categoria` varchar(255) NOT NULL,
  `sub_categoria2` varchar(255),
  `sub_categoria3` varchar(255),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `coins` (
  `id` varchar(255) UNIQUE NOT NULL,
  `nomeDeUsuario` varchar(120) UNIQUE NOT NULL,
  `coins` int default 100,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;