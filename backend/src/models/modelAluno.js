const db = require('../database')

function criarTabelaAlunos() {
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS tabela_alunos (
                ra VARCHAR(8) PRIMARY KEY NOT NULL,
                nomeCompleto VARCHAR(50) NOT NULL,
                email VARCHAR(75) NOT NULL,
                classificacao INT DEFAULT 0
            );
        `

        db.execute(query)

        return true
    } catch (error) {
        return false
    }
}

async function verificarAlunoExiste(ra) {
    try {
        const [result] = await db.execute(`SELECT 1 FROM tabela_alunos WHERE ra = ? LIMIT 1;`, [ra])

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

async function verificarEmailExiste(email) {
    try {
        const [result] = await db.execute(`SELECT 1 FROM tabela_alunos WHERE email = ? LIMIT 1;`, [email])

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

async function adicionarAluno(ra, nomeCompleto, email) {
    const responseVerificarAluno = await verificarAlunoExiste(ra)

    if (responseVerificarAluno.detail === "exist") {
        return {
            "detail": "error",
            "message": "Esse RA já foi registrado"
        }

    } else if (responseVerificarAluno.detail === "error") {
        return {
            "detail": "error",
            "message": "Erro ao realizar o cadastro"
        }
    }

    const responseVerificarEmail = await verificarEmailExiste(email)

    if (responseVerificarEmail.detail === "exist") {
        return {
            "detail": "error",
            "message": "Esse e-mail já foi registrado"
        }

    } else if (responseVerificarEmail.detail === "error") {
        return {
            "detail": "error",
            "message": "Erro ao realizar o cadastro"
        }
    }

    try {
        await db.execute(`INSERT INTO tabela_alunos (ra, nomeCompleto, email) VALUES (?, ?, ?)`, [ra, nomeCompleto, email])

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

async function listarLivrosDisponiveis() {
    try {
        const [result] = await db.execute(`
            SELECT * FROM tabela_livros l
            WHERE NOT EXISTS (
                SELECT 1 FROM tabela_emprestimos e
                WHERE e.livro_titulo = tituloLivro
                  AND e.data_devolucao IS NULL
            );
        `)

        return {
            "detail": "ok",
            "message": result
        }

    } catch (error) {
        return {
            "detail": "error",
            "message": "Não foi possível listar os livros disponíveis"
        }
    }
}

module.exports = {
    criarTabelaAlunos,
    adicionarAluno,
    verificarAlunoExiste,
    listarLivrosDisponiveis
}