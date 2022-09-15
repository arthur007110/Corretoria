function PessoaController(db){
    
    const ProprietarioController = require('./ProprietarioController');
    const ProprietarioC = ProprietarioController(db);

    const InquilinoController = require('./InquilinoController');
    const InquilinoC = InquilinoController(db);
    
    
    function salvarProprietario(proprietario) {
        return ProprietarioC.salvarProprietario(proprietario);
    }

    function deletarProprietario(proprietario) {
        return ProprietarioC.deletarProprietario(proprietario);
    }

    function atualizarProprietario(proprietario) {
        return ProprietarioC.atualizarProprietario(proprietario);
    }

    function visualizarProprietario(proprietario) {
       return ProprietarioC.visualizarProprietario(proprietario);
    }

    function listarProprietarios() {
       return ProprietarioC.listarProprietarios();
    }
    
    function salvarInquilino(inquilino) {
        return InquilinoC.salvarInquilino(inquilino);
    }

    function deletarInquilino(inquilino) {
        return InquilinoC.deletarInquilino(inquilino);
    }

    function atualizarInquilino(inquilino) {
        return InquilinoC.atualizarInquilino(inquilino);
    }

    function visualizarInquilino(inquilino) {
       return InquilinoC.visualizarInquilino(inquilino);
    }

    function listarInquilinos() {
       return InquilinoC.listarInquilinos();
    }

    return{
        salvarProprietario,
        deletarProprietario,
        atualizarProprietario,
        listarProprietarios,
        visualizarProprietario,
        salvarInquilino,
        deletarInquilino,
        atualizarInquilino,
        listarInquilinos,
        visualizarInquilino
    }

}

module.exports = PessoaController;