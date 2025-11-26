function validarRa(ra) {
    const regex = /^\d{8}$/.test(ra)
    return regex
}

function validarNomeCompleto(nomeCompleto) {
    if (nomeCompleto.length > 50) {
        return false
    }

    return true
}

function validarEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return regex.test(email.trim())
}