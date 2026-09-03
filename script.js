console.log("script cargado correctamente");

// saque la vola de aca porque molesta 
var productos = [];

const section = document.getElementById("productos");

if (section) {
    const contenedorCards = document.createElement("div");
    contenedorCards.className = "contenedor-cards";
    section.appendChild(contenedorCards);
}

const LLAVE = "carrito";

function guardar(producto) {
    var storageActual = localStorage.getItem(LLAVE);
    var lista = [];
    if (storageActual != null) {
        var storageParse = JSON.parse(storageActual);
        storageParse.push(producto);
        localStorage.setItem(LLAVE, JSON.stringify(storageParse));
    } else {
        lista.push(producto);
        localStorage.setItem(LLAVE, JSON.stringify(lista));
    }
}