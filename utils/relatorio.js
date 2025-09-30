import { data } from "../data/database.js";
import { individualMedia } from "./calculations.js"


//Função para fazer um relatorio completo
export function relatorioTurma (){
    const aprovados = data.filter( e => individualMedia(e) >= 7)
    const recuperacao = data.filter(e => {
        const media = individualMedia(e);
        return media >= 5 && media < 7;
    });

    const reprovados = data.filter( e => individualMedia(e) < 5);

    console.log("📊 Relatório da turma:")
    console.log('\n✅ Aprovados:')
    aprovados.forEach(e => console.log(`- ${e.nome} | Media: ${individualMedia(e).toFixed(2)}`))

    console.log('\n⚠️ Recuperação:')
    recuperacao.forEach(e => console.log(`- ${e.nome} | Media: ${individualMedia(e).toFixed(2)}`))

    console.log("\n❌ Reprovados: ")
    reprovados.forEach(e => console.log(`- ${e.nome} | Media: ${individualMedia(e).toFixed(2)}`))
}