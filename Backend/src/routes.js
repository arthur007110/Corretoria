var express = require('express');
var router = express.Router();
const path = require('path');

const rotas = [
    {
        path: '/',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Main', 'index.html'] 
    },
    {
        path: '/cadastrarProprietario',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Proprietario', 'Cadastrar', 'index.html'] 
    }
]

definirRotas = (rotas) => {
    rotas.forEach(rota => {
        if(rota.method === 'GET'){
            router.get(rota.path, (_req, res) => {
                console.log('get', path.join(__dirname, '..', '..', ...rota.filePath));
                res.sendFile(path.join(__dirname, '..', '..', ...rota.filePath));
            });
            return;
        }
        if(rota.method === 'POST'){
            router.post(rota.path, (_req, res) => {
                console.log('post', path.join(__dirname, '..', '..', ...rota.filePath));
                res.sendFile(path.join(__dirname, '..', '..', ...rota.filePath));
            });
            return;
        }
    });
}
definirRotas(rotas);

module.exports = router;