function PessoaController(db){
    
    const ProprietarioController = require('./ProprietarioController');
    const ProprietarioC = ProprietarioController(db);

    const InquilinoController = require('./InquilinoController');
    const InquilinoC = InquilinoController(db);

    const CorretorController = require('./CorretorController');
    const CorretorC = CorretorController(db);
    
    
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

    function salvarCorretor(inquilino) {
        return CorretorC.salvarCorretor(inquilino);
    }

    function deletarCorretor(inquilino) {
        return CorretorC.deletarCorretor(inquilino);
    }

    function atualizarCorretor(inquilino) {
        return CorretorC.atualizarCorretor(inquilino);
    }

    function visualizarCorretor(inquilino) {
       return CorretorC.visualizarCorretor(inquilino);
    }

    function listarCorretores() {
       return CorretorC.listarCorretores();
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
        visualizarInquilino,
        salvarCorretor,
        deletarCorretor,
        atualizarCorretor,
        listarCorretores,
        visualizarCorretor
    }

}

module.exports = PessoaController;