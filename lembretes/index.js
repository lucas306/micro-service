const express = require ('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const lembretes = {};
contador = 0;
const axios = require("axios");

app.get('/lembretes', (req, res) => {
    res.send(lembretes);
});

app.put('/lembretes', async (req, res) => {
    contador++;
    const { texto } = req.body;
    lembretes[contador] = {
        contador, texto
    };
    await axios.put("http://localhost:10000/eventos", {
        tipo: "LembreteCriado",
        dados:{
            contador,
            texto
        }
    });
    res.status(201).send(lembretes[contador]);
});

app.listen(4000 , () => {
    console.log('Lembretes. porta 4000');
});

app.put("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});
