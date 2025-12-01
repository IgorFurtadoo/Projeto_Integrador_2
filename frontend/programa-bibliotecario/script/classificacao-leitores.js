document.addEventListener('DOMContentLoaded', () => {
    async function buscarTodosAlunos() {
        const containerAlunos = document.getElementById('corpo-tabela')
        const containerMensagem = document.getElementById('container-erros')
        const respostaAoCriar = document.createElement('i')

        containerMensagem.innerHTML = ''
        respostaAoCriar.className = ''

        try {
            const response = await fetch('http://127.0.0.1:3000/bibliotecario/listarAlunos')

            if (response.ok) {
                const data = await response.json()

                data.message.forEach(aluno => {
                    const tr = document.createElement('tr')
                    let classificacao = 'Leitor Iniciante'

                    if (aluno.livrosLidos > 20) {
                        tr.classList.add('extremo')
                        classificacao = 'Leitor Extremo'

                    } else if (aluno.livrosLidos <= 20 && aluno.livrosLidos >= 11) {
                        tr.classList.add('ativo')
                        classificacao = 'Leitor Ativo'
                        

                    } else if (aluno.livrosLidos < 11 && aluno.livrosLidos >= 6) {
                        tr.classList.add('regular')
                        classificacao = 'Leitor Regular'

                    } else {
                        tr.classList.add('iniciante')
                    }

                    tr.innerHTML = `
                        <td>${aluno.ra}</td>
                        <td>${aluno.nomeCompleto}</td>
                        <td>${aluno.email}</td>
                        <td>${aluno.livrosLidos}</td>
                        <td>${classificacao}</td>
                     `

                    containerAlunos.appendChild(tr)
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

    buscarTodosAlunos()
})
