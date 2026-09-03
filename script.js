console.log("hola");


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
});


var productos = [
    {
        "id":1,
        "marca":"Corsair®",
        "titulo":"Teclado Gamer Inalámbrico Mecánico K70 Core TKL RGB ",
        "imagen":"img/teclado.jpg",
        "precio":"129.990"
    },
    {
        "id":2,
        "marca":"Msi®",
        "titulo":" Tarjeta de Video NVIDIA Geforce RTX 5060 SHADOW 2X OC060 8G ",
        "imagen":"img/gpu.jpg",
        "precio":"459.990"
    }
]


const section = document.getElementById("productos");
console.log(section);

const contenedorCards = document.createElement("div");
contenedorCards.className = "contenedor-cards";

section.appendChild(contenedorCards);

for (const i of productos) {
    const card = document.createElement("div");
    card.className = "card";
    contenedorCards.appendChild(card);

    const marcaProducto = document.createElement("h5");
    marcaProducto.textContent = i.marca;
    card.appendChild(marcaProducto);

    const tituloProducto = document.createElement("h3");
    tituloProducto.textContent = i.titulo;
    card.appendChild(tituloProducto);

    const imagenProducto = document.createElement("img");
    imagenProducto.src = i.imagen;
    imagenProducto.className = "imagen-producto";
    card.appendChild(imagenProducto);

    const precioProducto = document.createElement("p");
    precioProducto.className = "precio-producto";
    precioProducto.textContent = "$ " + i.precio;
    card.appendChild(precioProducto);

    const tdProducto = document.createElement("small");
    tdProducto.className = "td";
    tdProducto.textContent = "Transferencia/Débito";
    precioProducto.appendChild(tdProducto);

    const contendorBoton = document.createElement("div");
    contendorBoton.className = "contenedor-boton";
    card.appendChild(contendorBoton);

    const botonAgregarCarro = document.createElement("button");
    botonAgregarCarro.textContent = "🛒 Agregar al carro";
    botonAgregarCarro.className = "btn btn-primary";
    botonAgregarCarro.addEventListener("click", function(){
        guardar(i);
    })
    contendorBoton.appendChild(botonAgregarCarro);

}


const LLAVE = "carrito";


function guardar(producto) {
    var storageActual = localStorage.getItem(LLAVE);
    if (storageActual != null){
        var storageParse = JSON.parse(storageActual);
        storageParse.push(producto);
        localStorage.setItem(LLAVE,JSON.stringify(storageParse));
    }else{
        var lista = [];
        lista.push(producto);
        localStorage.setItem(LLAVE,JSON.stringify(lista));
    }
}