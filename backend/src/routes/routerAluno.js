const express = require('express')
const router = express.Router()
const { adicionarAluno, listarLivrosDisponiveis } = require('../models/modelAluno')

router.post('/cadastro', async (req, res) => {
    const data = req.body

    const response = await adicionarAluno(data.ra, data.nomeCompleto, data.email)

    return res.json(response)
})

router.get('/livrosDisponiveis', async (req, res) => {
    const response = await listarLivrosDisponiveis()

    return res.json(response)
})

module.exports = router