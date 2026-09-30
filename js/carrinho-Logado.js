//Vamos verificar se o usuário está logado
const usuarioLogado = localStorage.getItem('usuarioCadastro');
//Se o usuário não estiver logado, é direcionado para a página de login
if (!usuarioLogado) {
    document.innerHTML =
    '<div class = "container text-center mt-5">'
    '<h2 class= "text-danger"><i>fa-solid fa-lock</i>Acesso negado</h2>'
    '<p class="mb-4"><i class="fa-solid fa-lock"></i>Acesso Negado</p>'
    '<p class="text-muted mb-4>Aguarde...</p>'
    '</div>'
 
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 2500)
} else {
     //Cada item do carrinho é exibido na tabela
const carrinho = JSON.parse(localStorage.getItem('itemCarrinho')) || []
const listaCarrinho = document.getElementById('lista-produtos')
const textoTotal = document.getElementById('texto-total')
let valorTotal = 0;
let textoPedidoPorEmail = 'Olá, gostaria de fazer um pedido:\n\n'
 
//Vamos verificar se o carrinho está vazio
if (carrinho.length === 0) {
    listaProdutosinnerHTML = '<tr>' +
        '<td colspan="4" class="text-center">Seu carrinho está vazio.</td>' +
        '</tr>';
    textoTotal.innerText = 'Total: R$ 0,00';
} else {
    carrinho.forEach(item => {
        const subtotal = item.preco * item.quantidade;
        valorTotal += subtotal;
        textoPedidoPorEmail += `- ${item.nome} (Quantidade: ${item.quantidade}) - Subtotal: R$ ${subtotal}\n`;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.nome}</td>
            <td>R$ ${item.preco}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${subtotal}</td>
        `
        listaCarrinho.appendChild(row);
    });
    textoTotal.innerText = `Total: R$ ${valorTotal}`;
}
 
//Botão para enviar o pedido por email
const btnEnviarEmail = document.getElementById('btn-finalizar');
btnEnviarEmail.addEventListener('click', () => {
    const assunto = encodeURIComponent('Pedido de Bordados da Sônia');
    const corpoEmail = encodeURIComponent(textoPedidoPorEmail + `\nTotal: R$ ${valorTotal}`)
    window.location.href = `mailto:contato@bordadosdasonia.com.br?subject=${assunto}&body=${corpoEmail}`;
})
}
//Finalizar o pedido por e-mail
const btnfinalizar = document.getElementById('btn-finalizar');
if (carrinho.length > 0) {
    const textoOriginal = btnfinalizar.innerText;
    btnFinalizar.innerHTML = 'O carrinho está vazio.';
    btnfinalizar.classList.add('btn-success', 'btn-danger');
    setTimeout(() => {
        btnfinalizar.innerText = textoOriginal;
        btnfinalizar.classList.remove('btn-success','btn-danger');
    }, 2500);

    return
}
    btnFinalizar.innerHTML = 'Preparando pedido...';
BtnFinalizar.classList.add('btn-success','btn-danger');
 constCliente = JSON.parse(localStorage.getItem('usuarioCadastro'));
 textoPedidoPorEmail += `\n\nDados do cliente:\nNome: ${cliente.nome} ${cliente.sobrenome}\nEmail: ${cliente.email}\nTelefone: (${cliente.ddd}) ${cliente.telefone}\nEndereço: ${cliente.endereco}, Nº ${cliente.numero}, ${cliente.cidade}, CEP: ${cliente.cep}`;
setTimeout(() => {
    btnFinalizar.innerText = 'Enviar pedido por email';
    btnFinalizar.classList.remove('btn-success','btn-danger');
}, 2500);   