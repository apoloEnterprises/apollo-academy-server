CREATE DATABASE IF NOT EXISTS `apollo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `apollo`;

CREATE TABLE IF NOT EXISTS `curso` (
  `id` varchar(255) UNIQUE NOT NULL,
  `data` TIMESTAMP DEFAULT NOW(),
  `nome` varchar(120) NOT NULL,
  `descricao` varchar(255),
  `foto_capa` varchar(255) NOT NULL,
  `autor` varchar(100),
  `idioma` varchar(100),
  PRIMARY KEY (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `usuario_curso_assistido` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `id_usuario` varchar(255) NOT NULL,
  `id_curso` varchar(255) NOT NULL,
  `aula_assistida` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id) ON UPDATE CASCADE,
  FOREIGN KEY (`id_curso`) REFERENCES curso(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `usuario_curso_assistindo` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `id_usuario` varchar(255) NOT NULL,
  `id_curso` varchar(255) NOT NULL,
  `aula_assistindo` varchar(100) NOT NULL,
  `timestamp` varchar(100) NOT NULL,
  `total_timestamp` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_usuario`) REFERENCES usuarios(id) ON UPDATE CASCADE,
  FOREIGN KEY (`id_curso`) REFERENCES curso(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


-- envia como: programacao, backend, node js
CREATE TABLE IF NOT EXISTS `curso_category` (
   `id` int(255) NOT NULL AUTO_INCREMENT,
   `nome_curso` varchar(255),
  `categoria` varchar(120) NOT NULL,
  `sub_categoria` varchar(255) NOT NULL,
  `sub_categoria2` varchar(255),
  `sub_categoria3` varchar(255),
  `item` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`nome_curso`) REFERENCES curso(nome) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `curso_aulas` (
   `id` varchar(255) UNIQUE NOT NULL,
   `id_curso` varchar(255),
   `id_modulo` varchar(255),
   `aula_nome` varchar(255) UNIQUE NOT NULL,
   `video` varchar(255) NOT NULL,
   `duracao_total` varchar(255),
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_curso`) REFERENCES curso(id) ON UPDATE CASCADE,
  FOREIGN KEY (`id_modulo`) REFERENCES curso_modulos(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `curso_modulos` (
   `id` varchar(255) UNIQUE NOT NULL,
   `id_curso` varchar(255),
   `nome_modulo` varchar(255) UNIQUE NOT NULL,
   `modulo_ordem` varchar(255) UNIQUE NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_curso`) REFERENCES curso(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- //////////////////////////////////////////////////////////////////

CREATE TABLE IF NOT EXISTS `curso_avaliacoes` (
   `id` varchar(255) UNIQUE NOT NULL,
   `id_curso` varchar(255) NOT NULL,
   `id_aluno` varchar(255) NOT NULL,
   `nota` DECIMAL(6,4) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`id_curso`) REFERENCES curso(id) ON UPDATE CASCADE,
  FOREIGN KEY (`id_aluno`) REFERENCES usuarios(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `curso_alunos` (
   `id` varchar(255) UNIQUE NOT NULL,
   `data` TIMESTAMP DEFAULT NOW(),
   `nome_curso` varchar(120) NOT NULL,
   `id_aluno` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`nome_curso`) REFERENCES curso(nome),
  FOREIGN KEY (`id_aluno`) REFERENCES usuarios(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;