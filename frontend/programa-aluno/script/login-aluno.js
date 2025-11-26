document.addEventListener('DOMContentLoaded', () => {
    const containerLivros = document.querySelector('.lista-livros')

    const containerMensagem = document.getElementById('container-mensagem')

    const respostaAoCriar = document.createElement('i')

    async function buscarLivrosDisponiveis() {
        containerLivros.innerHTML = ''
        containerMensagem.innerHTML = ''
        respostaAoCriar.className = ''
        respostaAoCriar.textContent = ''

        try {
            const response = await fetch('http://127.0.0.1:3000/aluno/livrosDisponiveis')

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

    buscarLivrosDisponiveis()
})
