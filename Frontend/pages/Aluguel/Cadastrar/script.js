$.post("/listarImoveis")
.done(function( data ) {
    data.forEach(imovel => {
        console.log(imovel);
        const imovelButton = $("<li></li>").append(
            $("<button></button>", {type: 'button'}).text(imovel.id).click(
                function(){
                    selecionarImovel(imovel.id);
                }
            )
        )
        $("#imovelDropdown").append(imovelButton);
    });
});

function selecionarImovel(id){
    $("#idImovel").val(id);
    $("#imovelDropdownButton").text(`Imovel(${id})`);
}

$.post("/listarInquilinos")
.done(function( data ) {
    data.forEach(inquilino => {
        console.log(inquilino);
        const inquilinoButton = $("<li></li>").append(
            $("<button></button>", {type: 'button'}).text(inquilino.nome).click(
                function(){
                    selecionarInquilino(inquilino.cpf, inquilino.nome);
                }
            )
        )
        $("#inquilinosDropdown").append(inquilinoButton);
    });
});

function selecionarInquilino(cpf, nome){
    $("#cpfInquilino").val(cpf);
    $("#inquilinosDropdownButton").text(`Inquilino(${nome})`);
}