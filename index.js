const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

// Inicialización de la aplicación Express
const app = express();
const port = 3000;

// Middleware para analizar solicitudes JSON
app.use(bodyParser.json());

// Ruta para manejar la verificación del webhook
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode === 'subscribe' && token === 'Mi_codigo_secreto') {
        res.status(200).send(challenge);
    } else {
        res.status(403).send('Token de verificación incorrecto o ausente');
    }
});

// Ruta para manejar los mensajes entrantes y enviar una respuesta
app.post('/webhook', (req, res) => {
    const body = req.body;

    console.log("Mensaje recibido: ", JSON.stringify(body, null, 2));

    if (body.object === 'whatsapp_business_account') {
        const messages = body.entry[0].changes[0].value.messages;
        if (messages && messages.length > 0) {
            const message = messages[0];
            const from = message.from; // Número del remitente
            const text = message.text.body; // Texto del mensaje

            console.log(`Mensaje de ${from}: ${text}`);

            // Aquí enviamos una respuesta automática al remitente
            axios({
                method: 'post',
                url: 'https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages',
                data: {
                    messaging_product: "whatsapp",
                    to: from,
                    text: {
                        body: "Gracias por tu mensaje, estamos procesando tu solicitud."
                    }
                },
                headers: {
                    'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                console.log('Mensaje enviado exitosamente');
            }).catch(error => {
                console.error('Error al enviar el mensaje:', error.response.data);
            });
        }

        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
