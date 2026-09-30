document.addEventListener("DOMContentLoaded", () => {
  
    let carrinho = JSON.parse(localStorage.getItem("gama_delivery_cart")) || [];

    const salvarCarrinho = () => {
        localStorage.setItem("gama_delivery_cart", JSON.stringify(carrinho));
    };

    window.adicionarAoCarrinho = (id, nome, preco, imagem = "") => {

        const itemExistente = carrinho.find(item => item.id === id);

        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({
                id: id,
                nome: nome,
                preco: parseFloat(preco),
                imagem: imagem,
                quantidade: 1
            });
        }

        salvarCarrinho();
        atualizarContadorMenu();
        alert(`${nome} foi adicionado ao seu carrinho!`);
    };

   
    const atualizarContadorMenu = () => {
        const iconeCarrinho = document.querySelector(".fa-cart-shopping");
        if (iconeCarrinho) {
            const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
            
 
            const contadorAntigo = document.getElementById("cart-badge");
            if (contadorAntigo) contadorAntigo.remove();

            if (totalItens > 0) {
            
                const badge = document.createElement("span");
                badge.id = "cart-badge";
                badge.textContent = totalItens;
                badge.style.position = "absolute";
                badge.style.backgroundColor = "#ff4444";
                badge.style.color = "white";
                badge.style.fontSize = "0.7rem";
                badge.style.padding = "2px 6px";
                badge.style.borderRadius = "50%";
                badge.style.marginLeft = "5px";
                badge.style.marginTop = "-10px";
                
                iconeCarrinho.parentNode.appendChild(badge);
            }
        }
    };

    const renderizarCarrinho = () => {
        const containerCarrinho = document.getElementById("itens-carrinho");
        const containerTotal = document.getElementById("total-carrinho");

        if (!containerCarrinho) return; 

        containerCarrinho.innerHTML = "";

        if (carrinho.length === 0) {
            containerCarrinho.innerHTML = "<p class='text-center my-4'>Seu carrinho está vazio.</p>";
            if (containerTotal) containerTotal.textContent = "R\$ 0,00";
            return;
        }

        let valorTotalGeral = 0;

        carrinho.forEach((item, index) => {
            const subtotal = item.preco * item.quantidade;
            valorTotalGeral += subtotal;

            const divItem = document.createElement("div");
            divItem.className = "d-flex justify-content-between align-items-center border-bottom py-3";
            divItem.innerHTML = `
                <div>
                    <h5 class="mb-0">${item.nome}</h5>
                    <small class="text-muted">R$ ${item.preco.toFixed(2)} cada</small>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary btn-diminuir" data-index="${index}">-</button>
                    <span>${item.quantidade}</span>
                    <button class="btn btn-sm btn-outline-secondary btn-aumentar" data-index="${index}">+</button>
                    <span class="ms-3 fw-bold">R$ ${subtotal.toFixed(2)}</span>
                    <button class="btn btn-sm btn-danger ms-2 btn-remover" data-index="${index}">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            containerCarrinho.appendChild(divItem);
        });

        if (containerTotal) {
            containerTotal.textContent = `R$ ${valorTotalGeral.toFixed(2)}`;
        }

        adicionarEventosBotoes();
    };

    const adicionarEventosBotoes = () => {
        document.querySelectorAll(".btn-aumentar").forEach(botao => {
            botao.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                carrinho[index].quantidade += 1;
                salvarCarrinho();
                renderizarCarrinho();
                atualizarContadorMenu();
            });
        });

        document.querySelectorAll(".btn-diminuir").forEach(botao => {
            botao.addEventListener("click", (e) => {
                const index = e.target.getAttribute("data-index");
                if (carrinho[index].quantidade > 1) {
                    carrinho[index].quantidade -= 1;
                } else {
                    carrinho.splice(index, 1); 
                }
                salvarCarrinho();
                renderizarCarrinho();
                atualizarContadorMenu();
            });
        });

        document.querySelectorAll(".btn-remover").forEach(botao => {
            botao.closest(".btn-remover").addEventListener("click", (e) => {
                const index = e.currentTarget.getAttribute("data-index");
                carrinho.splice(index, 1);
                salvarCarrinho();
                renderizarCarrinho();
                atualizarContadorMenu();
            });
        });
    };

    atualizarContadorMenu();
    renderizarCarrinho();
});
