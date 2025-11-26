const express = require('express')
const app = express()
const cors = require('cors')
const { criarTabelaAlunos } = require('./models/modelAluno')
const { criarTabelaLivros, criarTabelaEmprestimos } = require('./models/modelBibliotecario')

criarTabelaAlunos()
criarTabelaLivros()
criarTabelaEmprestimos()

// Importando routers
const routerAluno = require('./routes/routerAluno')
const routerBibliotecario = require('./routes/routerBibliotecario')
const routerTotem = require('./routes/routerTotem')

// Definindo CORS
app.use(cors())

app.use(express.json())

app.use('/aluno', routerAluno)
app.use('/bibliotecario', routerBibliotecario)
app.use('/totem', routerTotem)

app.listen(3000, () => {
    console.log('Running on port 3000...')
})