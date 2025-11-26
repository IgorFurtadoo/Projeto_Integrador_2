const express = require('express')
const router = express.Router()
const { retirarLivro, devolverLivro } = require('../models/modelTotem')

router.post('/retirarLivro', async (req, res) => {
    const data = req.body

    const response = await retirarLivro(data.ra, data.tituloLivro)

    return res.json(response)
})

router.post('/devolverLivro', async (req, res) => {
    const data = req.body

    const response = await devolverLivro(data.ra, data.tituloLivro)

    return res.json(response)
})

module.exports = router