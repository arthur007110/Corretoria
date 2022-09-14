function PessoaController(db){

    function salvarProprietario(proprietario) {
        const { cpf, nome, telefones } = proprietario;

        if(!cpf || !nome ) throw new Error('CPF e nome são obrigatórios');

        const parms = [
            {name: 'cpf', value: cpf},
            {name: 'nome', value: nome},
            {name: 'tipoPessoa', value: 'proprietario'},
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

    function deletarProprietario(proprietario) {
        const { cpf } = proprietario;

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

    function atualizarProprietario(proprietario) {
        const { cpf, nome, telefones } = proprietario;

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

    function visualizarProprietario(proprietario) {
        const { cpf } = proprietario;
        return new Promise((resolve, reject) => {
            const paramsPessoa = [
                {name: 'tipoPessoa', value: 'proprietario'},
                {name: 'cpf', value: cpf},
            ];
            const paramsTelefone = [
                {name: 'cpfPessoa', value: cpf},
            ];
            console.log(paramsPessoa);
            const _proprietario = {};

            db.sellectOne('pessoa', paramsPessoa, (err, result) =>{
                if(err) reject(err);
                console.log(result);
                _proprietario.cpf = result[0].cpf;
                _proprietario.nome = result[0].nome;
                db.sellectAll('telefone', paramsTelefone, (err, result) =>{
                    if(err) reject(err);
                    _proprietario.telefones = result;
                    resolve(_proprietario);
                });
            });
        });
    }

    function listarProprietarios() {
        return new Promise((resolve, reject) => {
            const params = [
                {name: 'tipoPessoa', value: 'proprietario'},
            ];
    
            db.sellectAll('pessoa', params, (err, result) =>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    return{
        salvarProprietario,
        deletarProprietario,
        atualizarProprietario,
        listarProprietarios,
        visualizarProprietario
    }

}

module.exports = PessoaController;