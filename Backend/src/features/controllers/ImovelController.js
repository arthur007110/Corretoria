function ImovelController(db){

    function salvarImovel(imovel) {
        const { descricao, valor, cpfProprietario, cpfCorretor, rua, cep, bairro, numero } = imovel;

        console.log(imovel);
        if(!descricao || !valor || !cpfProprietario || !cpfCorretor || !rua || !cep || !bairro || !numero) throw new Error('atributos obrigatórios não preenchidos');

        const parms = [
            {name: 'id', value: 0},
            {name: 'alugado', value: 0},
            {name: 'descricao', value: descricao},
            {name: 'valor', value: valor},
            {name: 'cpfProprietario', value: cpfProprietario},
            {name: 'cpfCorretor', value: cpfCorretor},
            {name: 'rua', value: rua},
            {name: 'cep', value: cep},
            {name: 'bairro', value: bairro},
            {name: 'numero', value: numero},
        ]

        console.log(parms);

        db.insertInto('imovel', parms, (err) =>{
            if(err) throw err;
            console.log('Registro inserido com sucesso');
        });
    }

    function deletarImovel(imovel) {
        const { id } = imovel;

        if(!id) throw new Error('id é obrigatório');

        const parms = [
            {name: 'id', value: id},
        ]

        db.deleteFrom('imovel', parms, (err) =>{
            if(err) throw err;
            console.log('Registro deletado com sucesso');
        });
    }

    function atualizarImovel(imovel) {
        const { id, descricao, valor, cpfProprietario, cpfCorretor, alugado, rua, cep, bairro, numero } = imovel;

        if(!id) throw new Error('id é obrigatório');

        const params = [];
        if(descricao) params.push({name: 'descricao', value: descricao});
        if(valor) params.push({name: 'valor', value: valor});
        if(cpfProprietario) params.push({name: 'cpfProprietario', value: cpfProprietario});
        if(cpfCorretor) params.push({name: 'cpfCorretor', value: cpfCorretor});
        if(alugado) params.push({name: 'alugado', value: alugado});
        if(rua) params.push({name: 'rua', value: rua});
        if(cep) params.push({name: 'cep', value: cep});
        if(bairro) params.push({name: 'bairro', value: bairro});
        if(numero) params.push({name: 'numero', value: numero});

        const conditions = [
            {name: 'id', value: id},
        ]

        db.update('imovel', params, conditions, (err) =>{
            if(err) throw err;
            console.log('Registro atualizado com sucesso');
        });
    }

    function visualizarImovel(imovel) {
        const { id } = imovel;
        return new Promise((resolve, reject) => {
            const params = [
                {name: 'id', value: id},
            ];

            db.sellectOne('imovel', params, (err, result) =>{
                if(err) reject(err);
                if(result.length > 0){
                    resolve(result[0]);
                    return;
                }
                else throw new Error('Imóvel não encontrado');
            });
        });
    }

    function visualizarImovelView(imovel) {
        const { id } = imovel;
        return new Promise((resolve, reject) => {

            db.query(
                `
                    SELECT proprietario.nome as proprietario, corretor.nome as corretor, id, descricao, valor, alugado, rua, cep, bairro, numero, quartos, banheiros, area, tipo
                    FROM imovel, pessoa as proprietario, pessoa as corretor
                    WHERE id = ${id}
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
                    else throw new Error('Imóvel não encontrado');
                }
            );
        });
    }

    function listarImoveis() {
        return new Promise((resolve, reject) => {
            db.sellectAll('imovel', (err, result) =>{
                if(err) reject(err);
                resolve(result);
            });
        });
    }

    function listarImoveisView() {
        return new Promise((resolve, reject) => {
            db.query( 
                `
                    SELECT proprietario.nome as proprietario, corretor.nome as corretor, id, descricao, valor, alugado, rua, cep, bairro, numero, quartos, banheiros, area, tipo
                    FROM imovel, pessoa as proprietario, pessoa as corretor
                    WHERE imovel.cpfProprietario = proprietario.cpf
                    AND imovel.cpfCorretor = corretor.cpf
                `,
                (err, result) =>{
                    if(err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    function buscaAvancadaImoveis(options) {
        const { busca, alugado } = options;

        return new Promise((resolve, reject) => {
            db.query( 
                `
                    SELECT proprietario.nome as proprietario, corretor.nome as corretor, id, descricao, valor, alugado, rua, cep, bairro, numero, quartos, banheiros, area, tipo
                    FROM imovel, pessoa as proprietario, pessoa as corretor
                    WHERE imovel.cpfProprietario = proprietario.cpf
                    AND imovel.cpfCorretor = corretor.cpf
                    AND (descricao LIKE '%${busca}%'
                    OR proprietario.nome LIKE '%${busca}%'
                    OR corretor.nome LIKE '%${busca}%'
                    OR rua LIKE '%${busca}%'
                    OR bairro LIKE '%${busca}%'
                    OR numero LIKE '%${busca}%')
                    AND alugado = ${alugado}
                `,
                (err, result) =>{
                    if(err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    return{
        salvarImovel,
        deletarImovel,
        atualizarImovel,
        listarImoveis,
        listarImoveisView,
        visualizarImovel,
        visualizarImovelView,
        buscaAvancadaImoveis
    }

}

module.exports = ImovelController;