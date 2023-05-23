var nombre = document.getElementById('nombre').value.trim();
        var apellido = document.getElementById('apellido').value.trim();
        var correo = document.getElementById('correo').value.trim();
        var contraseña = document.getElementById('contraseña').value;

    function validarFormulario() {
        

        if (nombre === '') {
            alert('Por favor, ingrese su nombre.');
            return false;
        }

        if (apellido === '') {
            alert('Por favor, ingrese su apellido.');
            return false;
        }

        if (correo === '') {
            alert('Por favor, ingrese su correo electrónico.');
            return false;
        } else {
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(correo)) {
                alert('Por favor, ingrese un correo electrónico válido.');
                return false;
            }
        }

        if (contraseña === '') {
            alert('Por favor, ingrese una contraseña.');
            return false;
        }

        return true;
    }

