document.addEventListener('DOMContentLoaded', () => {
    async function buscarTodosLivros() {
        const containerLivros = document.getElementById('container-todos-livros')

        const containerMensagem = document.getElementById('container-mensagem-todos-livros')

        const respostaAoCriar = document.createElement('i')


        containerLivros.innerHTML = ''
        containerMensagem.innerHTML = ''
        respostaAoCriar.className = ''
        respostaAoCriar.textContent = ''

        try {
            const response = await fetch('http://127.0.0.1:3000/bibliotecario/listarLivros')

            if (response.ok) {
                const data = await response.json()

                if (!data.message || data.message.length === 0) {
                    respostaAoCriar.textContent = 'Nenhum livro disponível no momento.'
                    respostaAoCriar.classList.add('mensagem-erro')
                    containerMensagem.appendChild(respostaAoCriar)
                    return
                }

                data.message.forEach(livro => {
                    const li = document.createElement('li')
                    li.classList.add('livro-item')

                    li.innerHTML = `
                        <h4 class="livro-titulo">${livro.tituloLivro}</h4>
                        <p class="livro-autor">Autor: ${livro.autorLivro}</p>
                        <p class="livro-editora">Editora: ${livro.editora}</p>
                     `

                    containerLivros.appendChild(li)
                })
            } else {
                respostaAoCriar.textContent = 'Não foi possível listar os livros disponíveis'
                respostaAoCriar.classList.add('mensagem-erro')
                containerMensagem.appendChild(respostaAoCriar)
            }
        } catch (error) {
            respostaAoCriar.textContent = 'Não foi possível listar os livros disponíveis'
            respostaAoCriar.classList.add('mensagem-erro')
            containerMensagem.appendChild(respostaAoCriar)
        }
    }

    async function buscarLivrosIndisponiveis() {
        const containerLivros = document.getElementById('container-livros-indisponiveis')

        const containerMensagem = document.getElementById('container-mensagem-livros-indisponiveis')

        const respostaAoCriar = document.createElement('i')


        containerLivros.innerHTML = ''
        containerMensagem.innerHTML = ''
        respostaAoCriar.className = ''
        respostaAoCriar.textContent = ''

        try {
            const response = await fetch('http://127.0.0.1:3000/bibliotecario/listarLivrosIndisponiveis')

            if (response.ok) {
                const data = await response.json()

                if (!data.message || data.message.length === 0) {
                    respostaAoCriar.textContent = 'Nenhum livro disponível no momento.'
                    respostaAoCriar.classList.add('mensagem-erro')
                    containerMensagem.appendChild(respostaAoCriar)
                    return
                }

                data.message.forEach(livro => {
                    const li = document.createElement('li')
                    li.classList.add('livro-item')

                    li.innerHTML = `
                        <h4 class="livro-titulo">${livro.tituloLivro}</h4>
                        <p class="livro-autor">Autor: ${livro.autorLivro}</p>
                        <p class="livro-editora">Editora: ${livro.editora}</p>
                     `

                    containerLivros.appendChild(li)
                })
            } else {
                respostaAoCriar.textContent = 'Não foi possível listar os livros disponíveis'
                respostaAoCriar.classList.add('mensagem-erro')
                containerMensagem.appendChild(respostaAoCriar)
            }
        } catch (error) {
            respostaAoCriar.textContent = 'Não foi possível listar os livros disponíveis'
            respostaAoCriar.classList.add('mensagem-erro')
            containerMensagem.appendChild(respostaAoCriar)
        }
    }

    async function buscarLivrosEmprestimosDevolucoes() {
        const containerLivros = document.getElementById('container-livros-emprestimos-devolucoes')

        const containerMensagem = document.getElementById('container-mensagem-livros-emprestimos-devolucoes')

        const respostaAoCriar = document.createElement('i')


        containerLivros.innerHTML = ''
        containerMensagem.innerHTML = ''
        respostaAoCriar.className = ''
        respostaAoCriar.textContent = ''

        try {
            const response = await fetch('http://127.0.0.1:3000/bibliotecario/listarRegistroEmprestimos')

            if (response.ok) {
                const data = await response.json()

                if (!data.message || data.message.length === 0) {
                    respostaAoCriar.textContent = 'Nenhum livro disponível no momento.'
                    respostaAoCriar.classList.add('mensagem-erro')
                    containerMensagem.appendChild(respostaAoCriar)
                    return
                }

                data.message.forEach(livro => {
                    const li = document.createElement('li')
                    li.classList.add('livro-item')

                    if (livro.data_devolucao === null) {
                        const retiradaFormatada = formatarData(livro.data_retirada)

                        li.innerHTML = `
                        <h4 class="livro-titulo">${livro.livro_titulo}</h4>
                        <p class="livro-autor">RA do aluno: ${livro.aluno_id}</p>
                        <p class="livro-autor">Data de retirada: ${retiradaFormatada}</p>
                        <p class="livro-editora">Sem devolução</p>
                         `
                    } else {
                        const retiradaFormatada = formatarData(livro.data_retirada)
                        const devolucaoFormatada = formatarData(livro.data_devolucao)

                        li.innerHTML = `
                            <h4 class="livro-titulo">${livro.livro_titulo}</h4>
                            <p class="livro-autor">RA do aluno: ${livro.aluno_id}</p>
                            <p class="livro-autor">Data de retirada: ${retiradaFormatada}</p>
                            <p class="livro-editora">Data de devolução: ${devolucaoFormatada}</p>
                        `
                    }

                    containerLivros.appendChild(li)
                })
            } else {
                respostaAoCriar.textContent = 'Não foi possível listar os livros disponíveis'
                respostaAoCriar.classList.add('mensagem-erro')
                containerMensagem.appendChild(respostaAoCriar)
            }
        } catch (error) {
            respostaAoCriar.textContent = 'Não foi possível listar os livros disponíveis'
            respostaAoCriar.classList.add('mensagem-erro')
            containerMensagem.appendChild(respostaAoCriar)
        }
    }

    buscarTodosLivros()
    buscarLivrosIndisponiveis()
    buscarLivrosEmprestimosDevolucoes()
})
