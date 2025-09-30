import { data } from "../data/database.js";


// //Calcula a média individual de um estudante (objeto)
//   Retorna um número
 
export function individualMedia(estudante) {
  if (!estudante || !Array.isArray(estudante.notas) || estudante.notas.length === 0) {
    return 0;
  }
  const soma = estudante.notas.reduce((acc, n) => acc + Number(n), 0);
  return soma / estudante.notas.length;
}

 //Calcula e imprime a média geral da turma
 
export function geralMedia() {
  if (!data || data.length === 0) {
    console.log("Sem estudantes cadastrados!");
    return 0;
  }

  const somaMedias = data.reduce((acc, est) => acc + individualMedia(est), 0);
  const mediaGeral = somaMedias / data.length;

  console.log(`
------------------------------------------------------
Quantidade de estudantes: ${data.length}
Média Geral: ${mediaGeral.toFixed(2)}
------------------------------------------------------
`);
  return mediaGeral;
}


//  Identifica o estudante com maior média

export function studentMaiorMedia() {
  if (!data || data.length === 0) {
    console.log("Sem estudantes cadastrados!");
    return null;
  }

  let maiorEst = data[0];
  let maiorMedia = individualMedia(maiorEst);

  for (const est of data) {
    const mediaAtual = individualMedia(est);
    if (mediaAtual > maiorMedia) {
      maiorMedia = mediaAtual;
      maiorEst = est;
    }
  }

  console.log(`
------------------------------------------------
Nome: ${maiorEst.nome}
Idade: ${maiorEst.idade}
Maior Média: ${maiorMedia.toFixed(2)}
------------------------------------------------
`);
  return { estudante: maiorEst, media: maiorMedia };
}