document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------
    // BLOCO 1: Validação do Formulário de Login
    // -------------------------------------------------------------
    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (event) => {
            let valido = true;
            const email = document.getElementById('email');
            const senha = document.getElementById('senha');
            
            limparErro(email, 'erro-email');
            limparErro(senha, 'erro-senha');

            if (!validarEmailRegEx(email.value.trim())) {
                exibirErro(email, 'erro-email', 'Insira um e-mail válido.');
                valido = false;
            }
            if (senha.value.length < 6) {
                exibirErro(senha, 'erro-senha', 'A senha deve conter ao menos 6 dígitos.');
                valido = false;
            }
            if (!valido) event.preventDefault();
        });
    }

    // -------------------------------------------------------------
    // BLOCO 2: Validação do Formulário de Cadastro
    // -------------------------------------------------------------
    const formCadastrar = document.getElementById('form-cadastrar');
    if (formCadastrar) {
        formCadastrar.addEventListener('submit', (event) => {
            let valido = true;
            
            const nome = document.getElementById('nome');
            const cpf = document.getElementById('CPF');
            const email = document.getElementById('email');
            const senha = document.getElementById('senha');
            const ddd = document.getElementById('ddd');
            const telefone = document.getElementById('telefone');
            const cep = document.getElementById('cep');

            // Limpa estados de erro anteriores
            [nome, cpf, email, senha, ddd, telefone, cep].forEach(input => {
                if(input) limparErro(input, `erro-${input.id.toLowerCase()}`);
            });

            // Validações individuais
            if (nome.value.trim().split(' ').length < 2) {
                exibirErro(nome, 'erro-nome', 'Insira seu nome completo.');
                valido = false;
            }
            if (cpf.value.replace(/\D/g, '').length !== 11) {
                exibirErro(cpf, 'erro-cpf', 'O CPF deve possuir 11 números.');
                valido = false;
            }
            if (!validarEmailRegEx(email.value.trim())) {
                exibirErro(email, 'erro-email', 'Formato de e-mail inválido.');
                valido = false;
            }
            if (senha.value.length < 6) {
                exibirErro(senha, 'erro-senha', 'Crie uma senha de no mínimo 6 caracteres.');
                valido = false;
            }
            if (ddd.value.replace(/\D/g, '').length !== 2) {
                exibirErro(ddd, 'erro-ddd', 'DDD inválido.');
                valido = false;
            }

            if (!valido) event.preventDefault();
        });
    }

    // -------------------------------------------------------------
    // Funções Auxiliares de Tratamento Visual
    // -------------------------------------------------------------
    function exibirErro(inputElement, idErroElemento, mensagem) {
        const spanErro = document.getElementById(idErroElemento);
        if (spanErro) {
            spanErro.textContent = mensaje || mensagem;
            spanErro.style.display = 'block';
        }
        inputElement.style.borderColor = '#dc3545';
    }

    function limparErro(inputElement, idErroElemento) {
        const spanErro = document.getElementById(idErroElemento);
        if (spanErro) {
            spanErro.textContent = '';
            spanErro.style.display = 'none';
        }
        inputElement.style.borderColor = '#ced4da';
    }

    function validarEmailRegEx(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+\$/.test(email);
    }
});
