var express = require('express');
var router = express.Router();
const path = require('path');
const mainDb = require('./features/bd/main');
let db = undefined;
try{
    db = mainDb();
}catch(err){
    throw err;
}

const pessoaController = require('./features/controllers/PessoaController');
const pessoaC = pessoaController(db);

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
    },
    {
        path: '/atualizarProprietario',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Proprietario', 'Atualizar', 'index.html'] 
    },
    {
        path: '/deletarProprietario',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Proprietario', 'Deletar', 'index.html'] 
    },
    {
        path: '/listarProprietarios',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Proprietario', 'Listar', 'index.html'] 
    },
    {
        path: '/listarProprietarios',
        method: 'POST',
        controller: pessoaC,
        action: 'listarProprietarios',
    },
    {
        path: '/salvarProprietario',
        method: 'POST',
        controller: pessoaC,
        action: 'salvarProprietario',
    },
    {
        path: '/deletarProprietario',
        method: 'POST',
        controller: pessoaC,
        action: 'deletarProprietario',
    },
    {
        path: '/atualizarProprietario',
        method: 'POST',
        controller: pessoaC,
        action: 'atualizarProprietario',
    }
]

definirRotas = (rotas) => {

    rotas.forEach(rota => {
        if(rota.method === 'GET'){
            router.get(rota.path, (_req, res) => {
                res.sendFile(path.join(__dirname, '..', '..', ...rota.filePath));
            });
            return;
        }
        if(rota.method === 'POST'){
            router.post(rota.path, async(req, res) => {
                const { body } = req;
                const result = await rota.controller[rota.action](body);
                console.log(result);
                if(result) res.send(result);
                else res.status(200).send('OK');
            });
            return;
        }
    });
}
definirRotas(rotas);

module.exports = router;