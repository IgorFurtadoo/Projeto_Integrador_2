document.addEventListener('DOMContentLoaded', () => {
    const cadastrarLivroForm = document.getElementById('formCadastroLivro')

    cadastrarLivroForm.addEventListener('submit', (event) => {
        event.preventDefault()
        cadastrarLivro(event)
    })

    const containerMensagem = document.getElementById('container-mensagem')

    const respostaAoCriar = document.createElement('i')

    async function cadastrarLivro(event) {
        const form = new FormData(event.target)

        const data = {
            tituloLivro: form.get('titulo-livro'),
            autorLivro: form.get('autor-livro'),
            editora: form.get('editora')
        }

        containerMensagem.innerHTML = ''
        respostaAoCriar.className = ''

        // Validações
        if (!validarTituloLivro(data.tituloLivro)) {
            respostaAoCriar.textContent = 'Título do livro inválido'
            respostaAoCriar.classList.add('mensagem-erro')

        } else if (!validarAutorLivro(data.autorLivro)) {
            respostaAoCriar.textContent = 'Autor do livro inválido'
            respostaAoCriar.classList.add('mensagem-erro')

        } else if (!validarEditora(data.editora)) {
            respostaAoCriar.textContent = 'Editora inválida'
            respostaAoCriar.classList.add('mensagem-erro')

        } else {

            try {
                const response = await fetch("http://127.0.0.1:3000/bibliotecario/cadastro", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })

                if (response.ok) {
                    const responseData = await response.json()

                    if (responseData.detail !== "ok") {
                        respostaAoCriar.textContent = responseData.message
                        respostaAoCriar.classList.add('mensagem-erro')
                    } else {
                        cadastrarLivroForm.elements['titulo-livro'].value = ""
                        cadastrarLivroForm.elements['autor-livro'].value = ""
                        cadastrarLivroForm.elements['editora'].value = ""

                        respostaAoCriar.textContent = responseData.message
                        respostaAoCriar.classList.add('mensagem-sucesso')
                    }
                } else {
                    respostaAoCriar.textContent = 'Erro ao realizar o cadastro'
                    respostaAoCriar.classList.add('mensagem-erro')
                }
            } catch (error) {
                respostaAoCriar.textContent = 'Erro ao realizar o cadastro'
                respostaAoCriar.classList.add('mensagem-erro')
            }
        }

        containerMensagem.appendChild(respostaAoCriar)

        setTimeout(() => {
            containerMensagem.innerHTML = ''
        }, 3000)
    }
})
