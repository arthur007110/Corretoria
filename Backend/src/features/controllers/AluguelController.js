
function AluguelController(db){

    function salvarAluguel(aluguel) {
        const { idImovel, cpfInquilino, dataAluguel, valorAluguel } = aluguel;

        console.log(aluguel);
        if(!idImovel || !cpfInquilino || !dataAluguel || !valorAluguel) throw new Error('atributos obrigatórios não preenchidos');

        const parms = [
            {name: 'idImovel', value: idImovel},
            {name: 'cpfInquilino', value: cpfInquilino},
            {name: 'dataAluguel', value: descricao},
            {name: 'valorAluguel', value: valorAluguel},
        ]

        console.log(parms);

        db.insertInto('aluguel', parms, (err) =>{
            if(err) throw err;
            console.log('Aluguel inserido com sucesso');
        });
    }

    function deletarAluguel(aluguel) {
        const { idImovel, cpfInquilino } = aluguel;

        if(!idImovel || !cpfInquilino) throw new Error('idImovel e CPF são obrigatórios');

        const parms = [
            {name: 'idImovel', value: idImovel},
            {name: 'cpfInquilino', value: cpfInquilino},
        ]

        db.deleteFrom('aluguel', parms, (err) =>{
            if(err) throw err;
            console.log('Aluguel deletado com sucesso');
        });
    }

    function atualizarAluguel(aluguel) {
        const { idImovel, cpfInquilino, dataAluguel, valorAluguel/*, estadia*/ } = aluguel;

        if(!idImovel || !cpfInquilino) throw new Error('idImovel e CPF são obrigatórios');

        const params = [];
        if(dataAluguel) params.push({name: 'dataAluguel', value: dataAluguel});
        if(valorAluguel) params.push({name: 'valorAluguel', value: valorAluguel});
        //if(estadia) params.push({name: 'estadia', value: estadia});

        const conditions = [
            {name: 'idImovel', value: idImovel},
        ]

        db.update('aluguel', params, conditions, (err) =>{
            if(err) throw err;
            console.log('Aluguel atualizado com sucesso');
        });
    }

    function visualizarAluguel(aluguel) {
        const { idImovel, cpfInquilino } = aluguel;
        return new Promise((resolve, reject) => {
            const params = [
                {name: 'idImovel', value: idImovel},
                {name: 'cpfInquilino', value: cpfInquilino},
            ];

            db.sellectOne('aluguel', params, (err, result) =>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    function listarAlugueis() {
        return new Promise((resolve, reject) => {
            db.sellectAll('aluguel', (err, result) =>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    return{
        salvarAluguel,
        deletarAluguel,
        atualizarAluguel,
        listarAlugueis,
        visualizarAluguel,
    }
}

module.exports = AluguelController;