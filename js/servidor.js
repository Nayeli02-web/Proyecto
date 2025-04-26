const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/enviar-factura', async (req, res) => {
    const { nombre, email, telefono, direccion, carrito, total } = req.body;

    const htmlFactura = `
        <h2>Factura de Compra</h2>
        <p><strong>Nombre:</strong> ${nombre}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${telefono}</p>
        <p><strong>Dirección:</strong> ${direccion}</p>
        <h3>Productos:</h3>
        <ul>
            ${carrito.map(p => `<li>${p.nombre} - ₡${p.precio} x ${p.cantidad} = ₡${p.precio * p.cantidad}</li>`).join('')}
        </ul>
        <h3>Total: ₡${total}</h3>
    `;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'nayeliarrieta02@gmail.com',
            pass: 'mxtj gbdc cltx cwnq'
        }
    });

    try {
        await transporter.sendMail({
            from: 'Flor Eterna <nayeliarrieta02@gmail.com>',
            to: email,
            subject: 'Factura de tu compra en Flor Eterna',
            html: htmlFactura
        });

        res.status(200).send({ message: 'Correo enviado' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error al enviar correo' });
    }
});

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Ruta para recibir el formulario
app.post('/enviar-formulario', (req, res) => {
    const { email, nombreCompleto, fechaNacimiento, rangoIngreso, edad, genero, gradoAcademico } = req.body;

    // Configurar el transporte de correo
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'tuemail@gmail.com', // Pon tu correo de Gmail aquí
            pass: 'tucontraseña'  // Asegúrate de usar una contraseña de aplicación si tienes 2FA activado
        }
    });

    // Opciones del correo
    let mailOptions = {
        from: 'tuemail@gmail.com',
        to: 'destinatario@correo.com',  // Pon el correo donde quieres recibir los formularios
        subject: 'Formulario de Registro',
        text: `Nuevo registro:
        
        Email: ${email}
        Nombre Completo: ${nombreCompleto}
        Fecha de Nacimiento: ${fechaNacimiento}
        Rango de Ingreso: ${rangoIngreso}
        Edad: ${edad}
        Género: ${genero}
        Grado Académico: ${gradoAcademico}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el correo: ' + error.toString());
        }
        res.status(200).send('Formulario enviado correctamente');
    });
});
