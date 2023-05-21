const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/registro', (req, res) => {
    // Obtener los datos del cuerpo de la solicitud
    const { nombre, apellido, correo, contraseña } = req.body;

    // Crear un objeto con la información del cliente
    const cliente = {
        nombre,
        apellido,
        correo,
        contraseña,
    };

    // Leer el archivo JSON existente (si lo hay)
    fs.readFile('clientes.json', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al leer el archivo JSON.');
            return;
        }

        let clientes = [];
        if (data.length > 0) {
            // Parsear el contenido del archivo JSON a un array
            clientes = JSON.parse(data);
        }

        // Agregar el nuevo cliente al array
        clientes.push(cliente);

        // Convertir el array a formato JSON
        const jsonClientes = JSON.stringify(clientes);

        // Guardar el contenido actualizado en el archivo JSON
        fs.writeFile('clientes.json', jsonClientes, (error) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error al guardar la información en el archivo JSON.');
                return;
            }

            // Resto del código para enviar el correo electrónico

            const transporter = nodemailer.createTransport({

                // Aquí debes configurar los detalles del servidor de correo saliente (SMTP)
                pool: true,
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: "ba.rental.23027@gmail.com",
                    pass: "sglewbrnwewxegup",
                },


            });

            // Configurar el contenido del correo electrónico
            const mailOptions = {
                from: 'ba.rental.23027@gmail.com',
                to: correo,
                subject: '¡Bienvenido(a)!',
                text: `Hola ${nombre} ${apellido}, gracias por registrarte en nuestro sitio.`,
            };

            // Enviar el correo electrónico
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Ocurrió un error al enviar el correo.');
                } else {
                    console.log('Correo enviado:', info.response);
                    res.status(200).send('Registro exitoso. Se ha enviado un correo de bienvenida.');
                }
            });


            // Envío de respuesta exitosa
            res.status(200).send('Registro exitoso. Se ha guardado la información en el archivo JSON.');
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});