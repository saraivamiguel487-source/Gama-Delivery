document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastrar");
  
  // Proteção: Só executa o script se o formulário de pizzaria existir na página atual
  if (!form) return;

  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const telefone = document.getElementById("telefone");
  const cnpj = document.getElementById("CNPJ");
  const endereco = document.getElementById("endereco");
  const erroEmail = document.getElementById("erro-email");

  // Função auxiliar para aplicar estilos de validação
  const definirStatus = (campo, valido, mensagemErro = "") => {
    if (valido) {
      campo.classList.remove("erro-input");
      campo.classList.add("sucesso-input");
      campo.style.borderColor = "#198754"; // Borda verde (Bootstrap success)
    } else {
      campo.classList.remove("sucesso-input");
      campo.classList.add("erro-input");
      campo.style.borderColor = "#dc3545"; // Borda vermelha (Bootstrap danger)
    }
    
    // Gerencia o texto de erro dinâmico do e-mail
    if (campo === email && erroEmail) {
      erroEmail.textContent = mensagemErro;
      erroEmail.style.display = valido ? "none" : "block";
      erroEmail.style.color = "#dc3545";
    }
  };

  // Validar Email (CORREÇÃO 1: Expressão corrigida e limpa para evitar falsos-negativos)
  const validarEmail = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valor = email.value.trim();

    if (valor === "") {
      definirStatus(email, false, "O e-mail do pizzaria é obrigatório.");
      return false;
    } else if (!regexEmail.test(valor)) {
      definirStatus(email, false, "Digite um formato de e-mail válido (ex: pizzaria@gama.com).");
      return false;
    } else {
      definirStatus(email, true);
      return true;
    }
  };

  // Validar Campos Obrigatórios Comuns
  const validarCampoObrigatorio = (campo) => {
    if (!campo || campo.value.trim() === "") {
      definirStatus(campo, false);
      return false;
    } else {
      definirStatus(campo, true);
      return true;
    }
  };

  // Validação Avançada Otimizada de CNPJ (Valida se o formato e tamanho batem)
  const validarCNPJ = () => {
    const valorLimpo = cnpj.value.replace(/\D/g, "");
    if (valorLimpo.length !== 14 || /^(\d)\1+$/.test(valorLimpo)) {
      definirStatus(cnpj, false);
      return false;
    }
    definirStatus(cnpj, true);
    return true;
  };

  // Máscara e Validação de Telefone em Tempo Real
  telefone.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,4})$/, "($1) $2");
    } else if (value.length > 0) {
      value = value.replace(/^(\d{0,2})$/, "($1");
    }
    e.target.value = value;
  });

  // Máscara de CNPJ Incremental Corrigida
  cnpj.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ""); 
    if (value.length > 14) value = value.slice(0, 14);
    
    if (value.length > 12) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{1,2})$/, "$1.$2.$3/$4-$5");
    } else if (value.length > 8) {
      value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{1,4})$/, "$1.$2.$3/$4");
    } else if (value.length > 5) {
      value = value.replace(/^(\d{2})(\d{3})(\d{1,3})$/, "$1.$2.$3");
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{1,3})$/, "$1.$2");
    }
    
    e.target.value = value;
  });

  // Ouvintes de evento para perda de foco (blur)
  if (nome) nome.addEventListener("blur", () => validarCampoObrigatorio(nome));
  if (email) email.addEventListener("blur", validarEmail);
  if (telefone) telefone.addEventListener("blur", () => validarCampoObrigatorio(telefone));
  if (cnpj) cnpj.addEventListener("blur", validarCNPJ);
  if (endereco) endereco.addEventListener("blur", () => validarCampoObrigatorio(endereco));

  // Execução do Envio (Submit)
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomeValido = validarCampoObrigatorio(nome);
    const emailValido = validarEmail();
    const telefoneValido = validarCampoObrigatorio(telefone);
    const cnpjValido = validarCNPJ();
    const enderecoValido = validarCampoObrigatorio(endereco);

    if (nomeValido && emailValido && telefoneValido && cnpjValido && enderecoValido) {
      alert("Cadastro do pizzaria realizado com sucesso!"); // AJUSTE: Mensagem alterada de 'procurado' para 'realizado'
      form.reset();
      
      // Remove todas as classes de status após limpar os campos
      [nome, email, telefone, cnpj, endereco].forEach(campo => {
        if (campo) campo.classList.remove("sucesso-input", "erro-input");
      });
    } else {
      alert("Por favor, preencha corretamente os campos obrigatórios sinalizados em vermelho.");
    }
  });
});