const $form = document.querySelector("#form")

$form.addEventListener("submit", handleSubmit)

async function handleSubmit(event) {
    event.preventDefault()
    const form = new FormData(this)
    let response; // se declara la variable response
    try {
        response = await fetch(this.action, {
            method: this.method,
            body: form,
            headers: {
                "Accept": "application/json"
            }
        })
    } catch (error) {
        console.error(error)
        showAlert("Ocurrió un error, por favor intente nuevamente")
        return
    }

    if (response.ok) {
        this.reset()
        showAlert("Gracias por contactarnos, te escribiremos pronto")
    }
}



function showAlert(message) {
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.textContent = message;
    document.body.appendChild(alert);

    // Eliminar el elemento de alerta después de 5 segundos
    setTimeout(() => {
        alert.remove();
    }, 4000);
}








