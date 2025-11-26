function validarTituloLivro(tituloLivro) {
    if (tituloLivro.length > 100) {
        return false
    }

    return true
}

function validarEditora(editora) {
    if (editora.length > 75) {
        return false
    }

    return true
}

function validarAutorLivro(autorLivro) {
    if (autorLivro.length > 50) {
        return false
    }

    return true
}

function formatarData(dataHora) {
    const now = new Date()
    const normalDate = now.toLocaleDateString('pt-BR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    })

    return normalDate
}