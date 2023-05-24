const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/registro', (req, res) => {

    // Obtener los datos del HTML5
    const { nombre, apellido, correo, contraseña } = req.body;

    // Crear un objeto con la información DEL HTML5
    const cliente = {
        nombre,
        apellido,
        correo,
        contraseña,
    };

    // Leer el archivo clientes.json
    fs.readFile('clientes.json', (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send('Error al leer el archivo JSON.');
            return;
        }

        let clientes = [];
        if (data.length > 0) {
            // Parsear el contenido de clientes.json a un array
            clientes = JSON.parse(data);
        }

        // Agrega el nuevo cliente al array
        clientes.push(cliente);

        // Convertir el array a formato json
        const jsonClientes = JSON.stringify(clientes);

        // 
        fs.writeFile('clientes.json', jsonClientes, (error) => {
            if (error) {
                console.log(error);
                res.status(500).send('Error al guardar la información en el archivo JSON.');
                return;
            }
// Envio del correo al cliente
            const transporter = nodemailer.createTransport({

                // Configuracion del servicio de correo, se utilizo Gmail
                pool: true,
                host: "smtp.gmail.com",
                port: 465,
                secure: true, // use TLS
                auth: {
                    user: "ba.rental.23027@gmail.com",
                    pass: "sglewbrnwewxegup",
                },


            });

            // Contenido del correo electrónico
            const mailOptions = {
                from: 'ba.rental.23027@gmail.com',
                to: correo,
                subject: '¡Bienvenido(a)!',
                text: `Hola ${nombre} ${apellido}, gracias por registrarte en BA-Rental, El mejor sitio para rentar.`,
            };

            // Envio del correo electrónico
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Ocurrió un error al enviar el correo.');
                } else {
                    console.log('Correo enviado:', info.response);
                    res.status(200).send('Registro exitoso. Se ha enviado un correo de bienvenida.');
                }
            });


            //Respuesta de envio exitoso
            res.status(200).send('Registro exitoso. Se envio la informacion al usuario y se guardaron los datos en clientes.json');
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor se inicio en el puerto 3000');
});