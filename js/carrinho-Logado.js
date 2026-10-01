// 1. Verifica se o usuário está logado
const usuarioLogado = localStorage.getItem('usuarioCadastro');

if (!usuarioLogado) {
    // CORREÇÃO: Usar document.body.innerHTML e concatenar as strings corretamente com '+'
    document.body.innerHTML =
    '<div class="container text-center mt-5">' +
    '<h2 class="text-danger"><i class="fa-solid fa-lock"></i> Acesso negado</h2>' +
    '<p class="mb-4">Acesso Negado</p>' +
    '<p class="text-muted mb-4">Aguarde...</p>' +
    '</div>';
 
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2500);

} else {
    // 2. Se o usuário estiver logado, processa o carrinho
    const carrinho = JSON.parse(localStorage.getItem('itemCarrinho')) || [];
    const listaCarrinho = document.getElementById('lista-produtos');
    const textoTotal = document.getElementById('texto-total');
    const btnFinalizar = document.getElementById('btn-finalizar'); // CORREÇÃO: Unificado ID do botão

    let valorTotal = 0;
    // CORREÇÃO: Usar 'let' para permitir que os dados do cliente sejam anexados depois
    let textoPedidoPorEmail = 'Olá, gostaria de fazer um pedido:\n\n'; 
 
    // Verifica se o carrinho está vazio
    if (carrinho.length === 0) {
        // CORREÇÃO: Nome correto do elemento corrigido para 'listaCarrinho.innerHTML'
        listaCarrinho.innerHTML = '<tr>' +
            '<td colspan="4" class="text-center">Seu carrinho está vazio.</td>' +
            '</tr>';
        textoTotal.innerText = 'Total: R\$ 0,00';
    } else {
        carrinho.forEach(item => {
            const subtotal = item.preco * item.quantidade;
            valorTotal += subtotal;
            textoPedidoPorEmail += `- ${item.nome} (Quantidade: ${item.quantidade}) - Subtotal: R$ ${subtotal.toFixed(2)}\n`;
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.nome}</td>
                <td>R$ ${item.preco.toFixed(2)}</td>
                <td>${item.quantidade}</td>
                <td>R$ ${subtotal.toFixed(2)}</td>
            `;
            listaCarrinho.appendChild(row);
        });
        textoTotal.innerText = `Total: R$ ${valorTotal.toFixed(2)}`;
    }
 
    // 3. Evento para enviar o pedido por e-mail
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', () => {
            // CORREÇÃO: Se o carrinho estiver vazio, exibe o alerta visual e não envia
            if (carrinho.length === 0) {
                const textoOriginal = btnFinalizar.innerText;
                btnFinalizar.innerText = 'O carrinho está vazio.';
                btnFinalizar.classList.remove('btn-success');
                btnFinalizar.classList.add('btn-danger');
                
                setTimeout(() => {
                    btnFinalizar.innerText = textoOriginal;
                    btnFinalizar.classList.remove('btn-danger');
                    btnFinalizar.classList.add('btn-success');
                }, 2500);
                return; // Para a execução aqui
            }

            // CORREÇÃO: Lógica de envio unificada e formatação do Cliente corrigida
            btnFinalizar.innerText = 'Preparando pedido...';
            
            const cliente = JSON.parse(localStorage.getItem('usuarioCadastro')) || {};
            
            // Monta a string do e-mail com os dados do cliente de forma segura
            let corpoFinal = textoPedidoPorEmail + `\nTotal: R$ ${valorTotal.toFixed(2)}`;
            corpoFinal += `\n\nDados do cliente:\n` +
                          `Nome: ${cliente.nome || ''} ${cliente.sobrenome || ''}\n` +
                          `Email: ${cliente.email || ''}\n` +
                          `Telefone: (${cliente.ddd || ''}) ${cliente.telefone || ''}\n` +
                          `Endereço: ${cliente.endereco || ''}, Nº ${cliente.numero || ''}, ${cliente.cidade || ''}, CEP: ${cliente.cep || ''}`;

            const assunto = encodeURIComponent('Pedido de Bordados da Sônia');
            const corpoEmailEncoded = encodeURIComponent(corpoFinal);
            
            // Redireciona para o cliente de e-mail do usuário
            window.location.href = `mailto:contato@bordadosdasonia.com.br?subject=${assunto}&body=${corpoEmailEncoded}`;

            setTimeout(() => {
                btnFinalizar.innerText = 'Enviar pedido por email';
            }, 2500);
        });
    }
}