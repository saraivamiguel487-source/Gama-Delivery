document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastrar");
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
    } else {
      campo.classList.remove("sucesso-input");
      campo.classList.add("erro-input");
    }
    
    // Se for o campo de email, gerencia o texto de erro
    if (campo === email && erroEmail) {
      erroEmail.textContent = mensagemErro;
      erroEmail.style.color = "#FF4444";
    }
  };

  // Validar Email
  const validarEmail = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.value.trim() === "") {
      definirStatus(email, false, "O e-mail do restaurante é obrigatório.");
      return false;
    } else if (!regexEmail.test(email.value.trim())) {
      definirStatus(email, false, "Digite um e-mail válido.");
      return false;
    } else {
      definirStatus(email, true);
      return true;
    }
  };

  // Validar Campos Obrigatórios Comuns
  const validarCampoObrigatorio = (campo) => {
    if (campo.value.trim() === "") {
      definirStatus(campo, false);
      return false;
    } else {
      definirStatus(campo, true);
      return true;
    }
  };

  // Máscara e Validação Simples de Telefone (Ex: (11) 99999-9999)
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

  // Máscara de CNPJ (Ex: 00.000.000/0000-00)
  cnpj.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 14) value = value.slice(0, 14);
    
    value = value.replace(/^(\d{2})(\d)/, "$1.$2");
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
    value = value.replace(/(\d{4})(\d)/, "$1-$2");
    
    e.target.value = value;
  });

  // Ouvintes de evento para validação em tempo real ao perder o foco (blur)
  nome.addEventListener("blur", () => validarCampoObrigatorio(nome));
  email.addEventListener("blur", validarEmail);
  telefone.addEventListener("blur", () => validarCampoObrigatorio(telefone));

  // Validação no envio do formulário
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o envio padrão do formulário

    const nomeValido = validarCampoObrigatorio(nome);
    const emailValido = validarEmail();
    const telefoneValido = validarCampoObrigatorio(telefone);
    // Endereço e CNPJ não possuem atributo 'required' no seu HTML, validação opcional:
    const enderecoValido = endereco.value.trim() !== "" ? (definirStatus(endereco, true), true) : true;

    if (nomeValido && emailValido && telefoneValido && enderecoValido) {
      alert("Restaurante realizado com sucesso! (Simulação)");
      form.reset();
      
      // Remove as classes de sucesso após limpar o formulário
      [nome, email, telefone, cnpj, endereco].forEach(campo => {
        campo.classList.remove("sucesso-input");
      });
    } else {
      alert("Por favor, preencha corretamente os campos obrigatórios em vermelho.");
    }
  });
});