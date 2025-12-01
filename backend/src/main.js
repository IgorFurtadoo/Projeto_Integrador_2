const express = require('express');
const cors = require('cors');

const { criarTabelaAlunos } = require('./models/modelAluno');
const { criarTabelaLivros, criarTabelaEmprestimos } = require('./models/modelBibliotecario');

const routerAluno = require('./routes/routerAluno');
const routerBibliotecario = require('./routes/routerBibliotecario');
const routerTotem = require('./routes/routerTotem');

const app = express();

async function iniciarServidor() {
    try {
        console.log('Criando tabelas no banco de dados...');

        await criarTabelaAlunos();
        await criarTabelaLivros();
        await criarTabelaEmprestimos();

        console.log('Tabelas criadas/verificados com sucesso!');

        app.use(cors());
        app.use(express.json());

        app.use('/aluno', routerAluno);
        app.use('/bibliotecario', routerBibliotecario);
        app.use('/totem', routerTotem);

        app.listen(3000, () => {
            console.log('Running on port 3000...');
        });

    } catch (erro) {
        console.error('Erro ao iniciar o servidor:', erro);
        process.exit(1);
    }
}

iniciarServidor();