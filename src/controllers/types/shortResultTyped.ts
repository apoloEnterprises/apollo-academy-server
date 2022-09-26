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