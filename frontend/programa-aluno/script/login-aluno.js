document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('formLogin')
    const containerAluno = document.getElementById('container-aluno')
    const containerLivros = document.querySelector('#container-livros') // mais seguro com #
    const containerMensagem = document.getElementById('container-mensagem')
    const containerMensagemLivro = document.getElementById('container-mensagem-livro')

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault()
        buscarAlunoELivrosDisponiveis(event) 
    })

    async function buscarAlunoELivrosDisponiveis(event) {
        containerAluno.innerHTML = ''
        containerLivros.innerHTML = ''
        containerMensagem.innerHTML = ''
        containerMensagemLivro.innerHTML = ''

        ocultarElemento('container-aluno')
        ocultarElemento('livros-lista-main')

        const form = event.target
        const ra = form.ra.value.trim()

        if (!ra || ra.length < 5) {
            containerMensagem.innerHTML = '<div class="mensagem-erro">RA inválido</div>'
            return
        }

        try {
            const responseAluno = await fetch('http://127.0.0.1:3000/aluno/listarAluno', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ra })
            })

            const dataAluno = await responseAluno.json()

            if (!responseAluno.ok || dataAluno.detail !== "ok" || !dataAluno.message || dataAluno.message.length === 0) {
                containerMensagem.innerHTML = `<div class="mensagem-erro">${dataAluno.message || 'Aluno não encontrado.'}</div>`
                return
            }

            const aluno = dataAluno.message[0]

            let classificacao = 'Leitor Iniciante'
            if (aluno.livrosLidos > 20) classificacao = 'Leitor Extremo'
            else if (aluno.livrosLidos >= 11) classificacao = 'Leitor Ativo'
            else if (aluno.livrosLidos >= 6) classificacao = 'Leitor Regular'

            const alunoCard = document.createElement('div')
            alunoCard.className = 'aluno-card'

            alunoCard.innerHTML = `
                <div class="aluno-dados">
                    <div class="aluno-linha"><strong>RA:</strong> ${aluno.ra}</div>
                    <div class="aluno-linha"><strong>Nome:</strong> ${aluno.nomeCompleto}</div>
                    <div class="aluno-linha"><strong>Email:</strong> ${aluno.email}</div>
                    <div class="aluno-linha"><strong>Livros lidos:</strong> ${aluno.livrosLidos}</div>
                    <div class="aluno-linha destaque-leitor">${classificacao}</div>
                </div>
            `

            containerAluno.appendChild(alunoCard)
            mostrarElemento('container-aluno')

            try {
                const responseLivro = await fetch('http://127.0.0.1:3000/aluno/livrosDisponiveis')
                const dataLivro = await responseLivro.json()

                if (!responseLivro.ok || dataLivro.detail !== "ok" || dataLivro.message.length === 0) {
                    containerMensagemLivro.innerHTML = '<div class="mensagem-erro">Nenhum livro disponível no momento.</div>'
                } else {
                    dataLivro.message.forEach(livro => {
                        const li = document.createElement('li')
                        li.className = 'livro-item'
                        li.innerHTML = `
                            <h4 class="livro-titulo">${livro.tituloLivro}</h4>
                            <p class="livro-autor">Autor: ${livro.autorLivro}</p>
                            <p class="livro-editora">Editora: ${livro.editora}</p>
                        `
                        containerLivros.appendChild(li)
                    })
                    mostrarElemento('livros-lista-main')
                }
            } catch (err) {
                containerMensagemLivro.innerHTML = '<div class="mensagem-erro">Erro ao carregar livros disponíveis.</div>'
            }

        } catch (err) {
            console.error(err)
            containerMensagem.innerHTML = '<div class="mensagem-erro">Erro de conexão com o servidor.</div>'
        }
    }
})