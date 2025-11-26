function validarRa(ra) {
    const regex = /^\d{8}$/.test(ra)
    return regex
}

function validarTituloLivro(tituloLivro) {
    if (tituloLivro.length > 100) {
        return false
    }

    return true
}