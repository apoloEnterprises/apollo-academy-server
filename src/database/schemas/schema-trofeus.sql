CREATE TABLE IF NOT EXISTS `trofeus` (
  `id` varchar(255) UNIQUE NOT NULL,
  `data` varchar(120) UNIQUE NOT NULL,
  `trofeu_coqnuistado` varchar(120) UNIQUE NOT NULL,
  `trofeu_nome` varchar(120) UNIQUE NOT NULL,
  `trofeu_tipo` varchar(255) NOT NULL,
  `usuario_nome` varchar(100) UNIQUE NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;  

CREATE TABLE IF NOT EXISTS `trofeus_conquistado` (
  `id` varchar(255) UNIQUE NOT NULL,
  `data` varchar(120) NOT NULL,
  `trofeu_nome` varchar(120) UNIQUE NOT NULL,
  `trofeu_tipo` varchar(120) NOT NULL,
  `usuario_nome` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`usuario_nome`) REFERENCES usuarios(nomeDeUsuario) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;  