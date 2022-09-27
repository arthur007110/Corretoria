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
const imovelController = require('./features/controllers/ImovelController');
const imovelC = imovelController(db);
//Criei aq
const aluguelController = require('./features/controllers/AluguelController');
const aluguelC = aluguelController(db);

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
        path: '/visualizarProprietario',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Proprietario', 'Visualizar', 'index.html'] 
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
    },
    {
        path: '/visualizarProprietario',
        method: 'POST',
        controller: pessoaC,
        action: 'visualizarProprietario',
    },
    {
        path: '/cadastrarInquilino',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Inquilino', 'Cadastrar', 'index.html'] 
    },
    {
        path: '/atualizarInquilino',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Inquilino', 'Atualizar', 'index.html'] 
    },
    {
        path: '/deletarInquilino',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Inquilino', 'Deletar', 'index.html'] 
    },
    {
        path: '/listarInquilinos',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Inquilino', 'Listar', 'index.html'] 
    },
    {
        path: '/visualizarInquilino',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Inquilino', 'Visualizar', 'index.html'] 
    },
    {
        path: '/listarInquilinos',
        method: 'POST',
        controller: pessoaC,
        action: 'listarInquilinos',
    },
    {
        path: '/salvarInquilino',
        method: 'POST',
        controller: pessoaC,
        action: 'salvarInquilino',
    },
    {
        path: '/deletarInquilino',
        method: 'POST',
        controller: pessoaC,
        action: 'deletarInquilino',
    },
    {
        path: '/atualizarInquilino',
        method: 'POST',
        controller: pessoaC,
        action: 'atualizarInquilino',
    },
    {
        path: '/visualizarInquilino',
        method: 'POST',
        controller: pessoaC,
        action: 'visualizarInquilino',
    },
    {
        path: '/cadastrarCorretor',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Corretor', 'Cadastrar', 'index.html'] 
    },
    {
        path: '/atualizarCorretor',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Corretor', 'Atualizar', 'index.html'] 
    },
    {
        path: '/deletarCorretor',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Corretor', 'Deletar', 'index.html'] 
    },
    {
        path: '/listarCorretores',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Corretor', 'Listar', 'index.html'] 
    },
    {
        path: '/visualizarCorretor',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Corretor', 'Visualizar', 'index.html'] 
    },
    {
        path: '/listarCorretores',
        method: 'POST',
        controller: pessoaC,
        action: 'listarCorretores',
    },
    {
        path: '/salvarCorretor',
        method: 'POST',
        controller: pessoaC,
        action: 'salvarCorretor',
    },
    {
        path: '/deletarCorretor',
        method: 'POST',
        controller: pessoaC,
        action: 'deletarCorretor',
    },
    {
        path: '/atualizarCorretor',
        method: 'POST',
        controller: pessoaC,
        action: 'atualizarCorretor',
    },
    {
        path: '/visualizarCorretor',
        method: 'POST',
        controller: pessoaC,
        action: 'visualizarCorretor',
    },
    {
        path: '/salvarImovel',
        method: 'POST',
        controller: imovelC,
        action: 'salvarImovel',
    },
    {
        path: '/deletarImovel',
        method: 'POST',
        controller: imovelC,
        action: 'deletarImovel',
    },
    {
        path: '/atualizarImovel',
        method: 'POST',
        controller: imovelC,
        action: 'atualizarImovel',
    },
    {
        path: '/visualizarImovel',
        method: 'POST',
        controller: imovelC,
        action: 'visualizarImovel',
    },
    {
        path: '/listarImoveis',
        method: 'POST',
        controller: imovelC,
        action: 'listarImoveis',
    },
    {
        path: '/cadastrarImovel',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Imovel', 'Cadastrar', 'index.html']
    },
    {
        path: '/salvarAluguel',
        method: 'POST',
        controller: aluguelC,
        action: 'salvarAluguel',
    },
    {
        path: '/deletarAluguel',
        method: 'POST',
        controller: aluguelC,
        action: 'deletarAluguel',
    },
    {
        path: '/atualizarAluguel',
        method: 'POST',
        controller: aluguelC,
        action: 'atualizarAluguel',
    },
    {
        path: '/visualizarAluguel',
        method: 'POST',
        controller: aluguelC,
        action: 'visualizarAluguel',
    },
    {
        path: '/listarAlugueis',
        method: 'POST',
        controller: aluguelC,
        action: 'listarAlugueis',
    },
    {
        path: '/cadastrarAluguel',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Aluguel', 'Cadastrar', 'index.html']
    },
    {
        path: '/atualizarAluguel',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Aluguel', 'Atualizar', 'index.html'] 
    },
    {
        path: '/deletarAluguel',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Aluguel', 'Deletar', 'index.html'] 
    },
    {
        path: '/listarAlugueis',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Aluguel', 'Listar', 'index.html'] 
    },
    {
        path: '/visualizarAluguel',
        method: 'GET',
        filePath: ['Frontend', 'Pages', 'Aluguel', 'Visualizar', 'index.html'] 
    },
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