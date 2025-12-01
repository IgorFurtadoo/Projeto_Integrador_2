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

function mostrarElemento(id, classesParaAdicionar = []) {
        const el = document.getElementById(id);
        if (el) {
            el.classList.remove('ocultar-elemento');
            classesParaAdicionar.forEach(cls => el.classList.add(cls));
        }
    }

function ocultarElemento(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('ocultar-elemento');
}