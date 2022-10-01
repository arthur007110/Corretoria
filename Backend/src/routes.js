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
const aluguelController = require('./features/controllers/AluguelController');
const aluguelC = aluguelController(db);

const rotas = [
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
        path: '/listarNegociosCorretores',
        method: 'POST',
        controller: pessoaC,
        action: 'listarNegociosCorretores',
    },
    {
        path: '/listarValorBrutoCorretor',
        method: 'POST',
        controller: pessoaC,
        action: 'listarValorBrutoCorretor',
    },
    {
        path: '/listarAlugueisCorretor',
        method: 'POST',
        controller: pessoaC,
        action: 'listarAlugueisCorretor',
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
        path: '/visualizarImovelView',
        method: 'POST',
        controller: imovelC,
        action: 'visualizarImovelView',
    },
    {
        path: '/listarImoveis',
        method: 'POST',
        controller: imovelC,
        action: 'listarImoveis',
    },
    {
        path: '/listarImoveisView',
        method: 'POST',
        controller: imovelC,
        action: 'listarImoveisView',
    },
    {
        path: '/listarImoveisLivres',
        method: 'POST',
        controller: imovelC,
        action: 'listarImoveisLivres',
    },
    {
        path: '/buscaAvancadaImoveis',
        method: 'POST',
        controller: imovelC,
        action: 'buscaAvancadaImoveis',
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
        path: '/visualizarAluguelView',
        method: 'POST',
        controller: aluguelC,
        action: 'visualizarAluguelView',
    },
    {
        path: '/listarAlugueisView',
        method: 'POST',
        controller: aluguelC,
        action: 'listarAlugueisView',
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
                try{
                    const { body } = req;
                    const result = await rota.controller[rota.action](body);
                    console.log(result);
                    if(result) res.send(result);
                    else res.status(200).send('OK');
                }catch(err){
                    console.log(err);
                    res.status(500).send(err.toString());
                }
            });
            return;
        }
    });
}
definirRotas(rotas);

module.exports = router;