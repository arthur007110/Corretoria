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

    function listarProprietarios() {
        return new Promise((resolve, reject) => {
            const params = [
                {name: 'tipoPessoa', value: 'proprietario'},
            ];
    
            // db.sellectAll('pessoa', params, (err, result) =>{
            //     if(err) reject(err);
            //     resolve(result);
            // });
            db.query(
                `SELECT corretoria.pessoa.nome, corretoria.pessoa.cpf, corretoria.telefone.numero from corretoria.pessoa inner join corretoria.telefone on telefone.cpfPessoa=pessoa.cpf
                union
                select corretoria.pessoa.nome, corretoria.pessoa.cpf, -1 from corretoria.pessoa`,
                (err, result) =>{
                    if(err) reject(err);
                    resolve(result);
                }
            )
        });
    }

    return{
        salvarProprietario,
        deletarProprietario,
        atualizarProprietario,
        listarProprietarios
    }

}

module.exports = PessoaController;