CREATE DATABASE IF NOT EXISTS `apollo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `apollo`;

CREATE TABLE IF NOT EXISTS `perguntas` (
  `id` varchar(100) NOT NULL,
  `data` varchar(100) NOT NULL,
  `autor_name` varchar(100) NOT NULL,
  `pergunta_Txt` varchar(255) NOT NULL,
  `qnt_respostas` int(11) DEFAULT 0,
  `categoria` varchar(20) NOT NULL,
  `subCategoria` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`autor_name`) REFERENCES usuarios(nomeDeUsuario) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
 
CREATE TABLE IF NOT EXISTS `respostas` (
  `id` varchar(100) NOT NULL,
  `data` varchar(100) NOT NULL,
  `pergunta_ID` varchar(100) NOT NULL,
  `autor_resposta_name` varchar(100) NOT NULL,
  `resposta_Txt` varchar(855) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`pergunta_ID`) REFERENCES perguntas(id) ON UPDATE CASCADE,
  FOREIGN KEY (`autor_resposta_name`) REFERENCES usuarios(nomeDeUsuario) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `comentario_pergunta` (
  `id` varchar(100) NOT NULL,
  `data` varchar(100) NOT NULL,
  `pergunta_ID` varchar(100) NOT NULL,
  `autor_name` varchar(100) NOT NULL,
  `comentario_Txt` varchar(855) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`pergunta_ID`) REFERENCES perguntas(id) ON UPDATE CASCADE,
  FOREIGN KEY (`autor_name`) REFERENCES usuarios(nomeDeUsuario) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `respostas_likes` (
  `id` varchar(100) NOT NULL,
  `data` varchar(100) NOT NULL,
  `resposta_id` varchar(100) NOT NULL,
  `autor_like` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`resposta_id`) REFERENCES respostas(id) ON UPDATE CASCADE,
  FOREIGN KEY (`autor_like`) REFERENCES usuarios(nomeDeUsuario) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

  
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id` varchar(100) NOT NULL,
  `data` varchar(100) NOT NULL,
  `resposta_ID` varchar(100) NOT NULL,
  `autor_ID` varchar(100) NOT NULL,
  `comentario_Txt` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`resposta_ID`) REFERENCES respostas(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `posts_likes` (
  `id` varchar(100) NOT NULL,
  `data` varchar(100) NOT NULL,
  `pergunta_ID` varchar(100) NOT NULL,
  `autor_ID` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`pergunta_ID`) REFERENCES perguntas(id) ON UPDATE CASCADE,
  FOREIGN KEY (`autor_ID`) REFERENCES perguntas(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `comentarios_likes` (
  `id` varchar(100) NOT NULL,
  `data` varchar(100) NOT NULL,
  `resposta_id` varchar(100) NOT NULL,
  `autor_like` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`resposta_id`) REFERENCES respostas(id) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;


