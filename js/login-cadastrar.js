document.addEventListener("DOMContentLoaded", () => {
    const formLogin = document.getElementById("form-login");
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("senha");
    const erroEmail = document.getElementById("erro-email");
    const erroSenha = document.getElementById("erro-senha");

    const definirStatus = (campo, valido, elementoErro = null, mensagemErro = "") => {
        if (valido) {
            campo.classList.remove("erro-input");
            campo.classList.add("sucesso-input");
            if (elementoErro) {
                elementoErro.textContent = "";
                elementoErro.style.display = "none";
            }
        } else {
            campo.classList.remove("sucesso-input");
            campo.classList.add("erro-input");
            if (elementoErro) {
                elementoErro.textContent = mensagemErro;
                elementoErro.style.color = "#FF4444";
                elementoErro.style.fontSize = "0.85rem";
                elementoErro.style.marginTop = "4px";
                elementoErro.style.display = "block";
            }
        }
    };

    // Validar Formato do E-mail
    const validarEmail = () => {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const valor = emailInput.value.trim();

        if (valor === "") {
            definirStatus(emailInput, false, erroEmail, "O e-mail é obrigatório.");
            return false;
        } else if (!regexEmail.test(valor)) {
            definirStatus(emailInput, false, erroEmail, "Por favor, insira um e-mail válido.");
            return false;
        } else {
            definirStatus(emailInput, true, erroEmail);
            return true;
        }
    };

    const validarSenha = () => {
        const valor = senhaInput.value;

        if (valor === "") {
            definirStatus(senhaInput, false, erroSenha, "A senha é obrigatória.");
            return false;
        } else if (valor.length < 6) {
            definirStatus(senhaInput, false, erroSenha, "A senha deve conter pelo menos 6 caracteres.");
            return false;
        } else {
            definirStatus(senhaInput, true, erroSenha);
            return true;
        }
    };
    if (emailInput) emailInput.addEventListener("blur", validarEmail);
    if (senhaInput) senhaInput.addEventListener("blur", validarSenha);

    if (formLogin) {
        formLogin.addEventListener("submit", (e) => {
            e.preventDefault(); 

            const emailValido = validarEmail();
            const senhavalido = validarSenha();

            if (emailValido && senhavalido) {
                alert("Login realizado com sucesso! Redirecionando...");
                
                formLogin.reset();
                
                emailInput.classList.remove("sucesso-input");
                senhaInput.classList.remove("sucesso-input");
            } else {
                alert("Por favor, preencha as suas credenciais corretamente.");
            }
        });
    }
});
