const $form = document.querySelector("#form")

$form.addEventListener("submit", handleSubmit)

async function handleSubmit(event) {
    event.preventDefault()

    if(errorsInForm()){
        return
    }

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

function errorsInForm() {

    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var email = document.getElementById("email").value;
    var telefono = document.getElementById("telefono").value;

    var nombreRegex = /^[a-zA-Z\s]+$/;
    var emailRegex = /^\S+@\S+\.\S+$/;
    var telefonoRegex = /^\d{10}$/;

    var error = false; // Bandera para indicar si hay errores

    if (!nombreRegex.test(nombre)) {
        showError("nombre", "Ingrese un nombre válido");
        error = true;
    } else {
        hideError("nombre");
    }

    if (!nombreRegex.test(apellido)) {
        showError("apellido", "Ingrese un apellido válido");
        error = true;
    } else {
        hideError("apellido");
    }

    if (!emailRegex.test(email)) {
        showError("email", "Ingrese un correo electrónico válido");
        error = true;
    } else {
        hideError("email");
    }

    if (!telefonoRegex.test(telefono)) {
        showError("telefono", "Ingrese un número de teléfono válido (10 dígitos)");
        error = true;
    } else {
        hideError("telefono");
    }

    return error;
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

function showError(fieldId, errorMessage) {
    var errorElement = document.getElementById(fieldId + "-error");
    errorElement.textContent = errorMessage;
    errorElement.style.display = "block";
}

function hideError(fieldId) {
    var errorElement = document.getElementById(fieldId + "-error");
    errorElement.textContent = "";
    errorElement.style.display = "none";
}




