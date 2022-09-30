function visualizarImovel(id){
    $(function(){
        localStorage.setItem('imovelId', id);
        $("#subView").load("/Imovel/Visualizar/index.html"); 
    });
}

function buscar(){
    const options = {
        busca: $("#inputBuscaAvancada").val(),
        alugado: $("#alugadoBuscaAvancada").is(":checked")
    }
    console.log(options);
    $.post("/buscaAvancadaImoveis", options)
    .done(function( data ) {
        console.log(data);
        $("#tabelaImovel").empty();
        $('#tabelaImovel').append(
            $("<tr></tr>").append(
                $("<th>").text("ID"),
                $("<th>").text("Proprietário"),
                $("<th>").text("Corretor"),
                $("<th>").text("Alugado"),
                $("<th>").text("Valor"),
                $("<th>").text("Ações")
            )
        );
        data.forEach(imovel => {
            $("#tabelaImovel").append(
                $("<tr>").append(
                    $("<td>").text(imovel.id),
                    $("<td>").text(imovel.proprietario),
                    $("<td>").text(imovel.corretor),
                    $("<td>").text(imovel.alugado ? "Sim" : "Não"),
                    $("<td>").text(`R$ ${imovel.valor.toString().replace(".", ",")}`),
                    $("<td>").append(
                        $("<button>").text("Visualizar").click(
                            function(){
                                visualizarImovel(imovel.id);
                            }
                        )
                    ),
                    $("<td>").append(
                        $("<button>").text("Editar").click(
                            function(){
                                editarImovel(imovel.id);
                            }
                        ),
                    ),
                    $("<td>").append(
                        $("<button>").text("Deletar").click(
                            function(){
                                deletarImovel(imovel.id);
                            }
                        ),
                    ),
                )
            )
        });
    });
}

$.post("/listarImoveisView")
.done(function( data ) {
    console.log(data);
    data.forEach(imovel => {
        const tr = document.createElement('tr');
        $("#tabelaImovel").append(
            $("<tr>").append(
                $("<td>").text(imovel.id),
                $("<td>").text(imovel.proprietario),
                $("<td>").text(imovel.corretor),
                $("<td>").text(imovel.alugado ? "Sim" : "Não"),
                $("<td>").text(`R$ ${imovel.valor.toString().replace(".", ",")}`),
                $("<td>").append(
                    $("<button>").text("Visualizar").click(
                        function(){
                            visualizarImovel(imovel.id);
                        }
                    ),
                ),
                $("<td>").append(
                    $("<button>").text("Editar").click(
                        function(){
                            editarImovel(imovel.id);
                        }
                    ),
                ),
                $("<td>").append(
                    $("<button>").text("Deletar").click(
                        function(){
                            deletarImovel(imovel.id);
                        }
                    ),
                ),
            )
        )
    });
});

function visualizarImovel(id){
    $(function(){
        localStorage.setItem('imovelId', id);
        $("#subView").load("/Imovel/Visualizar/index.html"); 
    });
}

function editarImovel(id){
    $(function(){
        localStorage.setItem('imovelId', id);
        $("#subView").load("/Imovel/Atualizar/index.html"); 
    });
}

function deletarImovel(id){
    $(function(){
        $.post("/deletarImovel", {id: id})
        .done(function( data ) {
            $("#subView").load("/Imovel/Listar/index.html"); 
        });
    });
}