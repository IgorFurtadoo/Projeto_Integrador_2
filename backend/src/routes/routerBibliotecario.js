const express = require('express')
const router = express.Router()
const { adicionarLivro, listarTodosLivros, listarLivrosIndisponiveis, listarRegistroEmprestimos, listarInfosAlunos } = require('../models/modelBibliotecario')

router.post('/cadastro', async (req, res) => {
    const data = req.body

    const response = await adicionarLivro(data.autorLivro, data.editora, data.tituloLivro)

    return res.json(response)
})

router.get('/listarLivros', async (req, res) => {
    const response = await listarTodosLivros()

    return res.json(response)
})

router.get('/listarLivrosIndisponiveis', async (req, res) => {
    const response = await listarLivrosIndisponiveis()

    return res.json(response)
})

router.get('/listarRegistroEmprestimos', async (req, res) => {
    const response = await listarRegistroEmprestimos()

    return res.json(response)
})

router.get('/listarAlunos', async (req, res) => {
    const response = await listarInfosAlunos()

    return res.json(response)
})

module.exports = router