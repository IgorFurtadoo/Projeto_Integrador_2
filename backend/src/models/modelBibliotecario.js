const db = require('../database')

function criarTabelaLivros() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS tabela_livros (
                tituloLivro VARCHAR(100) PRIMARY KEY,
                autorLivro VARCHAR(50) NOT NULL,
                editora VARCHAR(75) NOT NULL
            );
        `

        db.execute(query)

        return true
    } catch (error) {
        return false
    }
}

function criarTabelaEmprestimos() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS tabela_emprestimos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                aluno_id VARCHAR(8),
                livro_titulo VARCHAR(100),
                data_retirada TIMESTAMP NOT NULL,
                data_devolucao TIMESTAMP,
                FOREIGN KEY (aluno_id) REFERENCES tabela_alunos(ra) ON DELETE CASCADE,
                FOREIGN KEY (livro_titulo) REFERENCES tabela_livros(tituloLivro) ON DELETE CASCADE
        );
        `

        db.execute(query)

        return true
    } catch (error) {
        console.log(error)

        return false
    }
}

async function verificarTituloLivroExiste(tituloLivro) {
    try {
        const [result] = await db.execute(`SELECT 1 FROM tabela_livros WHERE tituloLivro = ? LIMIT 1;`, [tituloLivro])

        if (result.length > 0) {
            return {
                "detail": "exist"
            }
        }

        return {
            "detail": "not exist"
        }
    } catch (error) {
        return {
            "detail": "error"
        }
    }
}

async function adicionarLivro(autorLivro, editora, tituloLivro) {
    const responseVerificarTituloLivroExiste = await verificarTituloLivroExiste(tituloLivro)

    if (responseVerificarTituloLivroExiste.detail === "exist") {
        return {
            "detail": "error",
            "message": "Esse título já foi cadastrado"
        }

    } else if (responseVerificarTituloLivroExiste.detail === "error") {
        return {
            "detail": "error",
            "message": "Erro ao realizar o cadastro"
        }
    }

    try {
        await db.execute(`INSERT INTO tabela_livros (tituloLivro, autorLivro, editora) VALUES (?, ?, ?)`, [tituloLivro, autorLivro, editora])

        return {
            "detail": "ok",
            "message": "Cadastro realizado com sucesso"
        }

    } catch (error) {
        return {
            "detail": "error",
            "message": "Erro ao realizar o cadastro"
        }
    }
}

async function listarTodosLivros() {
    try {
        const [result] = await db.execute(`
            SELECT * FROM tabela_livros;
        `)

        return {
            "detail": "ok",
            "message": result
        }

    } catch (error) {
        return {
            "detail": "error",
            "message": "Não foi possível listar os livros"
        }
    }
}

async function listarLivrosIndisponiveis() {
    try {
        const [result] = await db.execute(`
            SELECT * FROM tabela_livros l
            WHERE EXISTS (
                SELECT 1 FROM tabela_emprestimos e
                WHERE e.livro_titulo = tituloLivro
                  AND e.data_devolucao IS NULL
            );
        `)

        return {
            "detail": "ok",
            "message": result.reverse()
        }

    } catch (error) {
        return {
            "detail": "error",
            "message": "Não foi possível listar os livros"
        }
    }
}
async function listarRegistroEmprestimos() {
    try {
        const [result] = await db.execute(`SELECT aluno_id, livro_titulo, data_retirada, data_devolucao 
            FROM tabela_emprestimos ORDER BY id DESC`)

        return {
            "detail": "ok",
            "message": result
        }

    } catch (error) {
        return {
            "detail": "error",
            "message": "Não foi possível listar os livros"
        }
    }
}

module.exports = {
    criarTabelaLivros,
    criarTabelaEmprestimos,
    adicionarLivro,
    listarTodosLivros,
    listarLivrosIndisponiveis,
    listarRegistroEmprestimos
}