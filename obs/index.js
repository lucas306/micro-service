const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const observacoesPorLembreteId = {};
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');

//id: é um placeholder
//exemplo: /lembretes/122/obs | (/lembretes/:id/obs) 
app.put( '/lembretes/:id/obs', async (req, res) =>{
    const idObs = uuidv4();
    const { texto } = req.body;
    //req.params dá acesso à lista de parâmetros da URL
    const observacoesPorLembrete = 
        observacoesPorLembreteId[req.params.id] || [];
    observacoesPorLembrete.push({id: idObs, texto });
    observacoesPorLembreteId[req.params.id] = 
        observacoesPorLembrete;
    await axios.put("http://localhost:10000/eventos", {
        tipo: "ObservacaoCriada",
        dados:{
            id: idObs, texto, lembretesId: req.params.id
        },
    });
    res.status(201).send(observacoesPorLembrete);
});

app.get( '/lembretes/:id/obs', (req, res) => {
    res.send(observacoesPorLembreteId[req.params.id] || []);
});

app.put("/eventos", (req, res) => {
    console.log(req.body);
    res.status(200).send({ msg: "ok" });
});

app.listen(5000, (() => {
    console.log('Lembretes. Porta 5000');
}));