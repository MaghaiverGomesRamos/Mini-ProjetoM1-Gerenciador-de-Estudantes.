import readline from 'readline';
import { data } from '../data/database.js';
import {geralMedia, individualMedia, studentMaiorMedia} from '../utils/calculations.js';
import { relatorioTurma } from '../utils/relatorio.js';


//Importando readLine
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//Função para adicionar estudante
export function addStudent(nome, idade, notas) {
    if (nome === '' || idade <= 0 || notas.some(n => n < 0 || n > 10)) {
        console.log('⚠️ Dados invalidos!');
        return;
    }

    data.push({ nome: nome, idade: Number(idade), notas: notas });
    console.log("✅ Estudante adicionado com sucesso!")
}

//Função para listar estudantes
export function listStudent() {
    console.log('Estudantes Cadastrados:')

    if (data.length === 0) {
        console.log('Nenhum estudante cadastrado!')
        return;
    }

    for (let dados of data) {
        console.log(`
    -----------------------------------------------
    Nome: ${dados.nome}
    Idade: ${dados.idade}
    Notas: ${dados.notas.join(', ')}
    `)
    }
}

//Função para procurar estudante especifico
export function searchStudent(nome) {
    const resultado = data.filter(e =>
        e.nome.toLowerCase().includes(nome.toLowerCase())
    );

    if (resultado.length === 0) {
        console.log('Nenhum estudante encontrado!')
        return;
    }

    resultado.forEach(e => {
        console.log('--------------------------------------------------------')
        console.log(`- ${e.nome} (Idade: ${e.idade}) Notas: ${e.notas.join(', ')}`)
    }
    );

}

//Função para encontrar media especifica
export function encontrarMedia (nome){
    const resultado = data.find ( e => e.nome.toLowerCase()=== nome.toLowerCase());

    if (resultado) {
        const media = individualMedia(resultado);
        console.log('--------------------------------------------------')
        console.log(`Aluno: ${resultado.nome} e Media: ${media.toFixed(2)}`)
    } else {
        console.log('Aluno não encontrado!')
    }
}

//Função para interface do menu inicial
export function menu() {
    console.log(`
    ------------------------------------------
    MENU INICIAL
    ------------------------------------------
    1 - Cadastrar estudante.
    2 - Listar estudantes.
    3 - Buscar estudantes.
    4 - Calculo de medias.
    5 - Relatórios.
    6 - Encerrar programa.`);
}

//Função do interface do menu de medias
export function menuMedia() {
    console.log(`
    ------------------------------------------
    MENU MEDIAS
    ------------------------------------------
    1 - Media individual.
    2 - Media geral.
    3 - Maior media .
    4 - Sair do menu.`);
};

//Função para iniciar o sistema de escolha
export function sistema() {
    menu()

    rl.question("Escolha uma opção: ", (opcao) => {
      switch (opcao) {  
            case '1':
                rl.question('Digite um nome: ', (nome) => {
                    rl.question('Digite uma idade: ', (idadeStr) => {
                        rl.question('Digite as notas separadas por vigula: ', (notasStr) => {
                            const notas = notasStr.split(',').map(Number);
                            const idade = Number(idadeStr)
                            addStudent(nome, idade, notas);
                            sistema();
                        });
                    });

                });
                break;

            case '2':
                listStudent();
                sistema();
                break;

            case '3':
                rl.question('Digite um nome para buscar: ', (busca) => {
                    searchStudent(busca);
                    sistema();
                });
                break;

            case '4':
                menuMedia()
                rl.question('Selecione uma opção: ', (resposta) => {
                    switch (resposta) {
                        case '1':
                            rl.question('Nome do aluno: ', (nome) => {
                                encontrarMedia(nome)
                                sistema();
                            });

                            break;

                        case '2':
                            geralMedia();
                            sistema();
                            break;

                        case '3':
                            studentMaiorMedia();
                            sistema();
                            break;
                    }

                })

                break;

            case '5':
                relatorioTurma()
                sistema()
                break;

            case '6':
                console.log('Encerrando....')
                rl.close()
                break;
      }; 
    });
};


