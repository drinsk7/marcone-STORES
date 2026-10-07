let carrinho = [];


/* =========================
   ADICIONAR PRODUTO
========================= */

function adicionarProduto(nome, preco) {

    let produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    atualizarCarrinho();

    mostrarNotificacao(
        "Produto adicionado ao carrinho!"
    );
}


/* =========================
   ATUALIZAR CARRINHO
========================= */

function atualizarCarrinho() {

    let lista =
        document.getElementById("listaCarrinho");

    let contador =
        document.getElementById("contador");

    let totalElemento =
        document.getElementById("total");

    let pedidoTexto =
        document.getElementById("pedidoTexto");


    /* CONTADOR */

    let quantidadeTotal =
        carrinho.reduce(
            (total, produto) =>
                total + produto.quantidade,
            0
        );

    contador.textContent = quantidadeTotal;


    /* LISTA */

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p style="
                text-align:center;
                color:#999;
                padding:25px;
            ">
                Seu carrinho está vazio.
            </p>
        `;

    } else {

        lista.innerHTML =
            carrinho.map(
                (produto, index) => `

                <div class="item-carrinho">

                    <div>

                        <strong>
                            ${produto.nome}
                        </strong>

                        <br>

                        <small>
                            $${produto.preco}
                            ×
                            ${produto.quantidade}
                        </small>

                    </div>

                    <button
                        class="remover"
                        onclick="removerProduto(${index})"
                    >
                        REMOVER
                    </button>

                </div>

            `
            ).join("");

    }


    /* TOTAL */

    let total =
        carrinho.reduce(
            (soma, produto) =>
                soma +
                produto.preco *
                produto.quantidade,
            0
        );

    totalElemento.textContent =
        "$" + total;


    /* TEXTO DO PEDIDO */

    pedidoTexto.value =
        gerarTextoPedido(total);
}


/* =========================
   GERAR PEDIDO
========================= */

function gerarTextoPedido(total) {

    if (carrinho.length === 0) {

        return "Carrinho vazio.";

    }


    let texto =
        "MARCONE STORE - PEDIDO\n\n";


    carrinho.forEach(produto => {

        texto +=
            `${produto.nome} | ` +
            `Quantidade: ${produto.quantidade} | ` +
            `Valor: $${produto.preco * produto.quantidade}\n`;

    });


    texto +=
        `\nTOTAL: $${total}`;


    texto +=
        "\n\nPagamento: abrir ticket no Discord da Marcone.";


    return texto;
}


/* =========================
   REMOVER
========================= */

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


/* =========================
   ABRIR CARRINHO
========================= */

function abrirCarrinho() {

    document
        .getElementById("modalCarrinho")
        .classList.add("ativo");

    atualizarCarrinho();

}


/* =========================
   FECHAR CARRINHO
========================= */

function fecharCarrinho() {

    document
        .getElementById("modalCarrinho")
        .classList.remove("ativo");

}


/* =========================
   COPIAR PEDIDO
========================= */

async function copiarPedido() {

    let texto =
        document.getElementById(
            "pedidoTexto"
        ).value;


    try {

        await navigator.clipboard.writeText(
            texto
        );

        mostrarNotificacao(
            "Pedido copiado! Cole no seu ticket."
        );

    } catch (erro) {

        let campo =
            document.getElementById(
                "pedidoTexto"
            );

        campo.select();

        document.execCommand("copy");

        mostrarNotificacao(
            "Pedido copiado!"
        );

    }

}


/* =========================
   NOTIFICAÇÃO
========================= */

function mostrarNotificacao(mensagem) {

    let notificacao =
        document.getElementById(
            "notificacao"
        );


    notificacao.textContent =
        mensagem;


    notificacao.classList.add(
        "mostrar"
    );


    setTimeout(() => {

        notificacao.classList.remove(
            "mostrar"
        );

    }, 2500);

}


/* =========================
   CLICAR FORA DO CARRINHO
========================= */

document
    .getElementById("modalCarrinho")
    .addEventListener(
        "click",
        function(event) {

            if (
                event.target.id ===
                "modalCarrinho"
            ) {

                fecharCarrinho();

            }

        }
    );


/* INICIAR */

atualizarCarrinho();