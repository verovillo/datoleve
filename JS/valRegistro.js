    var registro = document.getElementById('registro');

    formulario.addEventListener('submit', function(event) {
        event.preventDefault(); 

        
        var nombre = document.getElementById('nombre').value.trim();
        var apellido = document.getElementById('apellido').value.trim();
        var correo = document.getElementById('correo').value.trim();
        var contraseña = document.getElementById('contraseña').value.trim();

        
        if (nombre === '') {
            alert('Por favor, ingrese su nombre.');
            return;
        }

        if (apellido === '') {
            alert('Por favor, ingrese su apellido.');
            return;
        }

        if (correo === '') {
            alert('Por favor, ingrese su correo electrónico.');
            return;
        } else {
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(correo)) {
                alert('Por favor, ingrese un correo electrónico.');
                return;
            }
        }

        if (contraseña === '') {
            alert('Por favor, ingrese una contraseña.');
            return;
        }

        formulario.submit();
    });


