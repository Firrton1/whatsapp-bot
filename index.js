const axios = require('axios');

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
