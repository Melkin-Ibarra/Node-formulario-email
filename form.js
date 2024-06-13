const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

// Configura el middleware para analizar los datos del formulario
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Ruta para procesar el formulario
app.post('/enviar-correo', async (req, res) => {
    try {
        const { nombre, correo, mensaje } = req.body;

        // Configura el transporte de correo para tu servidor
        const transporter = nodemailer.createTransport({
            host: 'mail.ejemplo.com', // Cambia esto por la dirección de tu servidor de correo
            port: 465, // Puerto del servidor de correo (generalmente 587 o 465)
            secure: true, // Si el servidor utiliza SSL/TLS, cambia a true
            auth: {
                user: 'user@ejemplo.com', // Cambia esto por tu dirección de correo
                pass: 'password', // Cambia esto por tu contraseña
            },
        });

        // Configura el correo
        const mailOptions = {
            from: 'ejemplo@gmail.com', // Cambia esto por tu dirección de correo
            to: 'user@ejemplo.com',
            subject: 'Nuevo mensaje del formulario de contacto',
            text: `Nombre: ${nombre}\nCorreo: ${correo}\nMensaje: ${mensaje}`,
        };

        // Envía el correo
        await transporter.sendMail(mailOptions);

        res.status(200).send('Correo enviado correctamente');
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).send('Error al enviar el correo');
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});