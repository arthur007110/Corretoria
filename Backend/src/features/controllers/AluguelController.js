
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
        ];

        try{
            db.insertInto('aluguel', parms, (err) =>{
                if(err) throw err;
                console.log('Aluguel inserido com sucesso');
            });
        }catch(err){
            throw err;
        }
    }

    function deletarAluguel(aluguel) {
        const { idImovel, cpfInquilino } = aluguel;

        if(!idImovel || !cpfInquilino) throw new Error('idImovel e CPF do inquilino são obrigatórios');

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
        const { idImovel, cpfInquilino, data, valor } = aluguel;

        if(!idImovel || !cpfInquilino) throw new Error('idImovel e CPF são obrigatórios');

        const params = [];
        if(data) conditions.push({name: 'data', value: data});
        if(valor) conditions.push({name: 'valor', value: valor});

        const conditions = [
            {name: 'idImovel', value: idImovel},
            {name: 'cpfInquilino', value: cpfInquilino},
        ];

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

    function visualizarAluguelView(aluguel) {
        const { idImovel, cpfInquilino } = aluguel;
        return new Promise((resolve, reject) => {
            db.query(
                `
                    SELECT proprietario.nome as proprietario, corretor.nome as corretor, inquilino.nome as inquilino, data, valor
                    FROM aluguel, imovel, pessoa as proprietario, pessoa as corretor, pessoa as inquilino
                    WHERE idImovel = ${idImovel}
                    AND cpfInquilino = ${cpfInquilino}
                    AND aluguel.cpfInquilino = inquilino.cpf
                    AND aluguel.idImovel = imovel.id
                    AND imovel.cpfProprietario = proprietario.cpf
                    AND imovel.cpfCorretor = corretor.cpf
                    LIMIT 1
                `,
                (err, result) =>{
                    if(err) reject(err);
                    if(result.length > 0){
                        resolve(result[0]);
                        return;
                    }
                    else throw new Error('Aluguel não encontrado');
                }
            );
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

    function listarAlugueisView() {
        return new Promise((resolve, reject) => {
            db.query(
                `
                    SELECT proprietario.nome as proprietario, corretor.nome as corretor, inquilino.nome as inquilino, data, aluguel.valor as valor
                    FROM aluguel, imovel, pessoa as proprietario, pessoa as corretor, pessoa as inquilino
                    WHERE aluguel.cpfInquilino = inquilino.cpf
                    AND aluguel.idImovel = imovel.id
                    AND imovel.cpfProprietario = proprietario.cpf
                    AND imovel.cpfCorretor = corretor.cpf
                `,
                (err, result) =>{
                    if(err) throw(err);
                    resolve(result);
                }
            );
        });
    }

    return{
        salvarAluguel,
        deletarAluguel,
        atualizarAluguel,
        listarAlugueis,
        visualizarAluguel,
        visualizarAluguelView,
        listarAlugueisView,
    }
}

module.exports = AluguelController;