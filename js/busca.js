document.addEventListener("DOMContentLoaded", () => {
    const campoBusca = document.querySelector(".busca__campo");
    const formBusca = document.querySelector(".busca");
    
    const categorias = [
        { elemento: document.getElementById("Campo-dos-restaurantes"), termo: "restaurantes" },
        { elemento: document.getElementById("Campo-das-cafeterias"), termo: "cafeterias" },
        { elemento: document.getElementById("Campo-das-padarias"), termo: "padarias" },
        { elemento: document.getElementById("Campo-das-pizzarias"), termo: "pizzarias" },
        { elemento: document.getElementById("Campo-dos-hamburguerias"), termo: "hamburguerias" },
        { elemento: document.getElementById("Campo-dos-churrascarias"), termo: "churrascarias" },
        { elemento: document.getElementById("Campo-dos-Food-Trucks"), termo: "food trucks" },
        { elemento: document.getElementById("Campo-dos-pastelarias"), termo: "pastelarias" },
        { elemento: document.getElementById("Campo-dos-quiosques"), termo: "quiosques" }
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
