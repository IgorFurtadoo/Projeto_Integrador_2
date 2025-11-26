document.addEventListener('DOMContentLoaded', () => {
    const retiradaLivrosForm = document.getElementById('formRetiradaLivros')

    retiradaLivrosForm.addEventListener('submit', (event) => {
        event.preventDefault()
        retirarLivro(event)
    })

    const containerMensagem = document.getElementById('container-mensagem')

    const respostaAoCriar = document.createElement('i')

    async function retirarLivro(event) {
        const form = new FormData(event.target)

        const data = {
            ra: form.get('ra'),
            tituloLivro: form.get('titulo-livro')
        }

        containerMensagem.innerHTML = ''
        respostaAoCriar.className = ''

        // Validações
        if (!validarTituloLivro(data.tituloLivro)) {
            respostaAoCriar.textContent = 'Título do livro inválido'
            respostaAoCriar.classList.add('mensagem-erro')

        } else if (!validarRa(data.ra)) {
            respostaAoCriar.textContent = 'RA inválido'
            respostaAoCriar.classList.add('mensagem-erro')

        } else {

            try {
                const response = await fetch("http://127.0.0.1:3000/totem/retirarLivro", {
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
                        retiradaLivrosForm.elements['ra'].value = ""
                        retiradaLivrosForm.elements['titulo-livro'].value = ""

                        respostaAoCriar.textContent = responseData.message
                        respostaAoCriar.classList.add('mensagem-sucesso')
                    }
                } else {
                    respostaAoCriar.textContent = 'Erro ao retirar o livro'
                    respostaAoCriar.classList.add('mensagem-erro')
                }
            } catch (error) {
                respostaAoCriar.textContent = 'Erro ao retirar o livro'
                respostaAoCriar.classList.add('mensagem-erro')
            }
        }

        containerMensagem.appendChild(respostaAoCriar)

        setTimeout(() => {
            containerMensagem.innerHTML = ''
        }, 3000)
    }
})
