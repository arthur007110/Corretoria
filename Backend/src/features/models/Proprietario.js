const Pessoa = require('./Pessoa');

class Proprietario extends Pessoa{
    constructor(cpf, nome, telefones) {
        super(cpf, nome, telefones);
    }

    salvar(){
        console.log('salvar proprietario');
    }
}

module.exports = Proprietario;