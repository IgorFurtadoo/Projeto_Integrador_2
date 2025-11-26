const db = require('../database')
const { verificarAlunoExiste } = require('./modelAluno')

async function verificarLivro(tituloLivro) {
    try {
        const [response] = await db.execute(`SELECT 1 FROM tabela_livros WHERE tituloLivro = ?`, [tituloLivro])

        if (response.length < 1) {
            return {
                "detail": "not exist"
            }
        }

        const [result] = await db.execute(`
            SELECT 1 FROM tabela_emprestimos
            WHERE livro_titulo = ?
                AND data_devolucao IS NULL;
        `, [tituloLivro])

        if (result.length > 0) {
            return {
                "detail": "unavailable"
            }
        }

        return {
            "detail": "available"
        }
    } catch (error) {
        return {
            "detail": "error"
        }
    }
}

async function retirarLivro(ra, tituloLivro) {
    const responseVerificarAlunoExist = await verificarAlunoExiste(ra)

    if (responseVerificarAlunoExist.detail === "not exist") {
        return {
            "detail": "error",
            "message": "Esse RA não está cadastrado"
        }

    } else if (responseVerificarAlunoExist.detail === "error") {
        return {
            "detail": "error",
            "message": "Erro ao retirar o livro"
        }
    }

    const responseVerificarLivro = await verificarLivro(tituloLivro)

    if (responseVerificarLivro.detail === "not exist") {
        return {
            "detail": "error",
            "message": "Esse livro não existe"
        }
    }

    else if (responseVerificarLivro.detail === "unavailable") {
        return {
            "detail": "error",
            "message": "Esse livro está indisponível"
        }

    } else if (responseVerificarLivro.detail === "error") {
        return {
            "detail": "error",
            "message": "Erro ao retirar o livro"
        }
    }

    try {
        await db.execute(`
            INSERT INTO tabela_emprestimos (aluno_id, livro_titulo, data_retirada)
            VALUES (?, ?, NOW());
        `, [ra, tituloLivro])

        return {
            "detail": "ok",
            "message": "Livro retirado com sucesso"
        }

    } catch (error) {
        return {
            "detail": "error",
            "message": "Erro ao retirar o livro"
        }
    }
}

async function devolverLivro(ra, tituloLivro) {
    const responseVerificarAlunoExist = await verificarAlunoExiste(ra)

    if (responseVerificarAlunoExist.detail === "not exist") {
        return {
            "detail": "error",
            "message": "Esse RA não está cadastrado"
        }

    } else if (responseVerificarAlunoExist.detail === "error") {
        return {
            "detail": "error",
            "message": "Erro ao devolver o livro"
        }
    }

    const responseVerificarLivro = await verificarLivro(tituloLivro)

    if (responseVerificarLivro.detail === "not exist") {
        return {
            "detail": "error",
            "message": "Esse livro não existe"
        }
    }

    else if (responseVerificarLivro.detail === "available") {
        return {
            "detail": "error",
            "message": "Esse livro não foi retirado"
        }

    } else if (responseVerificarLivro.detail === "error") {
        return {
            "detail": "error",
            "message": "Erro ao devolver o livro"
        }
    }

    try {
        const [result] = await db.execute(`
            SELECT 1 FROM tabela_emprestimos 
            WHERE aluno_id = ? 
            AND livro_titulo = ? 
            AND data_devolucao IS NULL
            `, [ra, tituloLivro]
        )

        if (result.length < 1) {
            return {
                "detail": "error",
                "message": `O RA ${ra} não retirou o livro ${tituloLivro}`
            }
        }

        await db.execute(`
            UPDATE tabela_emprestimos SET data_devolucao = NOW() WHERE aluno_id = ? AND livro_titulo = ?;
        `, [ra, tituloLivro])

        return {
            "detail": "ok",
            "message": "Livro devolvido com sucesso"
        }

    } catch (error) {
        return {
            "detail": "error",
            "message": "Erro ao devolver o livro"
        }
    }
}

module.exports = {
    retirarLivro,
    devolverLivro
}