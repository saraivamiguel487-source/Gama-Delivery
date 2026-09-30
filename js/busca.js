document.addEventListener("DOMContentLoaded", () => {
    const campoBusca = document.querySelector(".busca__campo");
    const formBusca = document.querySelector(".busca");
    
    const categorias = [
        { elemento: document.getElementById("Campo-dos-restaurantes"), termo: "restaurantes" },
        { elemento: document.getElementById("Campo-das-cafeterias"), termo: "cafeterias" },
        { elemento: document.getElementById("Campo-das-padarias"), termo: "padarias" }
    ];

   
    const filtrarCategorias = () => {
       
        const textoUsuario = campoBusca.value.toLowerCase().trim();

        categorias.forEach(cat => {
            
            if (cat.elemento) {
              
                if (cat.termo.includes(textoUsuario) || textoUsuario === "") {
                    cat.elemento.style.display = "block";
                } else {
                    cat.elemento.style.display = "none";
                }
            }
        });
    };

    if (campoBusca) {
        campoBusca.addEventListener("input", filtrarCategorias);
    }

    if (formBusca) {
        formBusca.addEventListener("submit", (e) => {
            e.preventDefault();
            filtrarCategorias();
        });
    }
});
