const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'nayeliarrieta02@gmail.com',
        pass: 'mxtj gbdc cltx cwnq'
    }
});

app.post('/enviar-factura', async (req, res) => {
    try {
        console.log('Datos recibidos en /enviar-factura:', req.body);

        const { nombre, email, telefono, direccion, carrito, total } = req.body;

        const htmlFactura = `
            <h2>Detalles de la Compra</h2>
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

        await transporter.sendMail({
            from: 'Flor Eterna <nayeliarrieta02@gmail.com>',
            to: email,
            subject: 'Detalle de tu compra en Flor Eterna',
            html: htmlFactura
        });

        res.status(200).json({ message: 'detalle de la compra enviada correctamente' });
    } catch (error) {
        console.error('Error al enviar la factura:', error);
        res.status(500).json({ message: 'Error al enviar la factura', error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor corriendo en puerto 3000');
});