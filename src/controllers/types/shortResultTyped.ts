export default interface ResultQueyCateogry {
  categoria: string
}

export default interface ResultQueyResposta {
  id: string,
  autor_ID: string,
  pergunta_ID: string,
  resposta_Txt: string,
}

export default interface ResultQueyComment {
  autor_ID: string,
  resposta_ID: string,
  comentario_Txt: string,
}

export default interface ResultQueryWatched {
  aula_assistindo: string,
  timestamp: string,
}


export default interface ResultQueryInsertWacting {
  id_usuario: string,
  id_curso: string,
  aula_assistida: string,
  aula_assistindo: string,
  timestamp: string,
}

export default interface ResultQueryInsertCategory {
  category: string,
  sub_category: string,
}


export default interface ResultQueryInsertCourse {
	nome: string,
	descricao:string,
	foto_capa: string,
	autor: string,
	categoria:string,
	sub_categoria:string,
	item:string
}

export default interface ResultQueryCourseModules {
	nome_modulo: string,
	aula_nome:string,
	video: string,
}