document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form-cadastrar");
  const nome = document.getElementById("nome");
  const email = document.getElementById("email");
  const telefone = document.getElementById("telefone");
  const cnpj = document.getElementById("CNPJ");
  const endereco = document.getElementById("endereco");
  const erroEmail = document.getElementById("erro-email");

  const definirStatus = (campo, valido, mensagemErro = "") => {
    if (valido) {
      campo.classList.remove("erro-input");
      campo.classList.add("sucesso-input");
    } else {
      campo.classList.remove("sucesso-input");
      campo.classList.add("erro-input");
    }
    
    if (campo === email && erroEmail) {
      erroEmail.textContent = mensagemErro;
      erroEmail.style.color = "#FF4444";
    }
  };

  const validarEmail = () => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valor = email.value.trim();

    if (valor === "") {
      definirStatus(email, false, "O e-mail da pastelaria é obrigatório.");
      return false;
    } else if (!regexEmail.test(valor)) {
      definirStatus(email, false, "Digite um e-mail válido.");
      return false;
    } else {
      definirStatus(email, true);
      return true;
    }
  };

  const validarCampoObrigatorio = (campo) => {
    if (campo.value.trim() === "") {
      definirStatus(campo, false);
      return false;
    } else {
      definirStatus(campo, true);
      return true;
    }
  };

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

  // CORREÇÃO 1: Nova máscara de CNPJ baseada no tamanho incremental do texto
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

  // Ouvintes de perda de foco (blur) incluídos para monitorar todos os inputs
  nome.addEventListener("blur", () => validarCampoObrigatorio(nome));
  email.addEventListener("blur", validarEmail);
  telefone.addEventListener("blur", () => validarCampoObrigatorio(telefone));
  cnpj.addEventListener("blur", () => validarCampoObrigatorio(cnpj));
  endereco.addEventListener("blur", () => validarCampoObrigatorio(endereco));

  form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    
    // CORREÇÃO 2: Validando obrigatoriamente TODOS os 5 campos antes do envio
    const nomeValido = validarCampoObrigatorio(nome);
    const emailValido = validarEmail();
    const telefoneValido = validarCampoObrigatorio(telefone);
    const cnpjValido = validarCampoObrigatorio(cnpj);
    const enderecoValido = validarCampoObrigatorio(endereco);
    
    // O envio só é concluído se todas as variáveis retornarem true
    if (nomeValido && emailValido && telefoneValido && cnpjValido && enderecoValido) {
      alert("Pastelaria cadastrada com sucesso!");
      form.reset(); 
      
      [nome, email, telefone, cnpj, endereco].forEach(campo => {
        campo.classList.remove("sucesso-input", "erro-input");
      });
    } else {
      alert("Por favor, preencha corretamente os campos obrigatórios indicados em vermelho.");
    }
  });
});
