function InquilinoController(db){

    function salvarInquilino(inquilino) {
        const { cpf, nome, telefones } = inquilino;

        if(!cpf || !nome ) throw new Error('CPF e nome são obrigatórios');

        const parms = [
            {name: 'cpf', value: cpf},
            {name: 'nome', value: nome},
            {name: 'tipoPessoa', value: 'inquilino'},
        ]

        db.insertInto('pessoa', parms, (err) =>{
            if(err) throw err;
            console.log('Registro inserido com sucesso');
        });

        if(telefones){
            telefones.forEach(telefone => {
                const parms = [
                    {name: 'numero', value: telefone},
                    {name: 'cpfPessoa', value: cpf},
                ]

                db.insertInto('telefone', parms, (err) =>{
                    if(err) throw err;
                    console.log('Registro inserido com sucesso');
                });
            });
        }
    }

    function deletarInquilino(inquilino) {
        const { cpf } = inquilino;

        if(!cpf) throw new Error('CPF é obrigatório');

        const paramsTelefone = [
            {name: 'cpfPessoa', value: cpf},
        ];
        const paramsPessoa = [
            {name: 'cpf', value: cpf},
        ];

        db.deleteFrom('telefone', paramsTelefone, (err) =>{
            if(err) throw err;
            console.log('Registro deletado com sucesso');
        });

        db.deleteFrom('pessoa', paramsPessoa, (err) =>{
            if(err) throw err;
            console.log('Registro deletado com sucesso');
        });
    }

    function atualizarInquilino(inquilino) {
        const { cpf, nome, telefones } = inquilino;

        if(!cpf) throw new Error('Nome é obrigatório');

        const params = [];
        if(nome) params.push({name: 'nome', value: nome});

        const conditions = [
            {name: 'cpf', value: cpf},
        ]

        if(params && params.length > 0) {
            db.update('pessoa', params, conditions, (err) =>{
                if(err) throw err;
                console.log('Registro atualizado com sucesso');
            });
        }

        if(telefones) {
            telefones.forEach(telefone => {
                const parms = [
                    {name: 'numero', value: telefone},
                    {name: 'cpfPessoa', value: cpf},
                ]

                db.insertInto('telefone', parms, (err) =>{
                    if(err) throw err;
                    console.log('Registro inserido com sucesso');
                });
            });
        }
    }

    function visualizarInquilino(inquilino) {
        const { cpf } = inquilino;
        return new Promise((resolve, reject) => {
            const paramsPessoa = [
                {name: 'tipoPessoa', value: 'inquilino'},
                {name: 'cpf', value: cpf},
            ];
            const paramsTelefone = [
                {name: 'cpfPessoa', value: cpf},
            ];
            console.log(paramsPessoa);
            const _inquilino = {};

            db.sellectOne('pessoa', paramsPessoa, (err, result) =>{
                if(err) reject(err);
                console.log(result);
                _inquilino.cpf = result[0].cpf;
                _inquilino.nome = result[0].nome;
                db.sellectAllWhere('telefone', paramsTelefone, (err, result) =>{
                    if(err) reject(err);
                    _inquilino.telefones = result;
                    resolve(_inquilino);
                });
            });
        });
    }

    function listarInquilinos() {
        return new Promise((resolve, reject) => {
            const params = [
                {name: 'tipoPessoa', value: 'inquilino'},
            ];
    
            db.sellectAllWhere('pessoa', params, (err, result) =>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    return{
        salvarInquilino,
        deletarInquilino,
        atualizarInquilino,
        listarInquilinos,
        visualizarInquilino
    }


}
module.exports = InquilinoController;
