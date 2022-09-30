$.post("/listarProprietarios")
.done(function( data ) {
    data.forEach(proprietario => {
        console.log(proprietario);
        const proprietarioButton = $("<li></li>").append(
            $("<button></button>", {type: 'button'}).text(proprietario.nome).click(
                function(){
                    selecionarProprietario(proprietario.cpf, proprietario.nome);
                }
            )
        )
        $("#proprietariosDropdown").append(proprietarioButton);
    });
});

function selecionarProprietario(cpf, nome){
    $("#cpfProprietario").val(cpf);
    $("#proprietariosDropdownButton").text(`Proprietário(${nome})`);
}

$.post("/listarCorretores")
.done(function( data ) {
    data.forEach(corretor => {
        console.log(corretor);
        const corretorButton = $("<li></li>").append(
            $("<button></button>", {type: 'button'}).text(corretor.nome).click(
                function(){
                    selecionarCorretor(corretor.cpf, corretor.nome);
                }
            )
        )
        $("#corretoresDropdown").append(corretorButton);
    });
});

function selecionarCorretor(cpf, nome){
    $("#cpfCorretor").val(cpf);
    $("#corretoresDropdownButton").text(`Corretor(${nome})`);
}

function salvarImovel(){
    const imovel = {
        descricao: $("#descricao").val(),
        valor: $("#valor").val(),
        cep: $("#cep").val(),
        rua: $("#rua").val(),
        bairro: $("#bairro").val(),
        numero: $("#numero").val(),
        cidade: $("#cidade").val(),
        estado: $("#estado").val(),
        quartos: $("#quartos").val(),
        banheiros: $("#banheiros").val(),
        garagem: $("#garagem").val(),
        quintal: $("#quintal").val(),
        area: $("#area").val(),
        tipo: $("#tipo").val(),
        cpfProprietario: $("#cpfProprietario").val(),
        cpfCorretor: $("#cpfCorretor").val(),
    }
    $.post("/salvarImovel", imovel)
    .done(function( data ) {
        $("#subView").load("/Imovel/Listar/index.html");
    });
}