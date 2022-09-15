function CorretorController(db){

    function salvarCorretor(corretor) {
        const { cpf, nome, telefones } = corretor;

        if(!cpf || !nome ) throw new Error('CPF e nome são obrigatórios');

        const parms = [
            {name: 'cpf', value: cpf},
            {name: 'nome', value: nome},
            {name: 'tipoPessoa', value: 'corretor'},
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

    function deletarCorretor(corretor) {
        const { cpf } = corretor;

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

    function atualizarCorretor(corretor) {
        const { cpf, nome, telefones } = corretor;

        if(!nome) throw new Error('Nome é obrigatório');

        const params = [
            {name: 'nome', value: nome},
        ];

        const conditions = [
            {name: 'cpf', value: cpf},
        ]

        db.update('pessoa', params, conditions, (err) =>{
            if(err) throw err;
            console.log('Registro atualizado com sucesso');
        });

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

    function visualizarCorretor(corretor) {
        const { cpf } = corretor;
        return new Promise((resolve, reject) => {
            const paramsPessoa = [
                {name: 'tipoPessoa', value: 'corretor'},
                {name: 'cpf', value: cpf},
            ];
            const paramsTelefone = [
                {name: 'cpfPessoa', value: cpf},
            ];
            console.log(paramsPessoa);
            const _corretor = {};

            db.sellectOne('pessoa', paramsPessoa, (err, result) =>{
                if(err) reject(err);
                console.log(result);
                _corretor.cpf = result[0].cpf;
                _corretor.nome = result[0].nome;
                db.sellectAll('telefone', paramsTelefone, (err, result) =>{
                    if(err) reject(err);
                    _corretor.telefones = result;
                    resolve(_corretor);
                });
            });
        });
    }

    function listarCorretores() {
        return new Promise((resolve, reject) => {
            const params = [
                {name: 'tipoPessoa', value: 'corretor'},
            ];
    
            db.sellectAll('pessoa', params, (err, result) =>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    return{
        salvarCorretor,
        deletarCorretor,
        atualizarCorretor,
        listarCorretores,
        visualizarCorretor
    }


}
module.exports = CorretorController;
