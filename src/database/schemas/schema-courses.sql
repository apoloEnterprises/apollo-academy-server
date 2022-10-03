CREATE DATABASE IF NOT EXISTS `apollo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `apollo`;

CREATE TABLE IF NOT EXISTS `curso` (
   `id` varchar(255) UNIQUE NOT NULL,
  `nome` varchar(120) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `foto_capa` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `subcategoria1` varchar(255) NOT NULL,
  `subcategoria2` varchar(255),
  `subcategoria3` varchar(255),
  `modulos` varchar(100) NOT NULL,
  `aula` varchar(100) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `alunos` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `usuario_curso` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `id_usuario` varchar(255),
  `id_curso` varchar(255),
  `aula_assistida` varchar(100) NOT NULL,
  `aula_assistindo` varchar(100) NOT NULL,
  `timestamp` varchar(100) NOT NULL,
  `total_timestamp` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id) ON UPDATE CASCADE,
  FOREIGN KEY (`id_curso`) REFERENCES curso(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `curso_category` (
   `id` varchar(255) UNIQUE NOT NULL,
  `programacao` varchar(120) NOT NULL,
  `design` varchar(255) NOT NULL,
  `marketing` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- 1. table com categoria e subcategoria, enviava como (programacao, front-end)
CREATE TABLE IF NOT EXISTS `curso_category` (
   `id` int(255) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(120) NOT NULL,
  `sub_categoria` varchar(255) NOT NULL,
  `item` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
-- 2. table com programacao, design, marketing

CREATE TABLE IF NOT EXISTS `curso_subcategory` (
   `id` varchar(255) UNIQUE NOT NULL,
  `id_category` varchar(120) NOT NULL,
  `back_end` varchar(120) NOT NULL,
  `front_end` varchar(255) NOT NULL,
  `back_end` varchar(255) NOT NULL,
  `` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_category`) REFERENCES curso_category(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


CREATE TABLE IF NOT EXISTS `curso-aulas` (
   `id` varchar(255) UNIQUE NOT NULL,
   `id_curso` varchar(255) UNIQUE NOT NULL,
   `aula` varchar(255) UNIQUE NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `curso-modulos` (
   `id` varchar(255) UNIQUE NOT NULL,
   `id_curso` varchar(255) UNIQUE NOT NULL,
   `aula` varchar(255) UNIQUE NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;