CREATE DATABASE IF NOT EXISTS `apollo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `hwbc`;

CREATE TABLE IF NOT EXISTS `curso` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `nome` varchar(20) NOT NULL,
  `descricao` varchar(255) NOT NULL,
  `progresso` varchar(100) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `alunos` varchar(100) NOT NULL,
  `timestamp` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
