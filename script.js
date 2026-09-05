console.log("hola");


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(elems);
});


var productos = [
    {
        "id": "TC001",
        "categoria": "Tortas_cuadradas",
        "titulo": "Torta Cuadrada de Chocolate",
        "imagen": "img/pasteles/TC001.png",
        "precio": "45,000"
    },
    {
        "id": "TC002",
        "categoria": "Tortas_cuadradas",
        "titulo": "Torta Cuadrada de Frutas",
        "imagen": "img/pasteles/TC002.png",
        "precio": "50,000"
    },
    {
        "id": "TT001",
        "categoria": "Tortas_circulares",
        "titulo": "Torta Circular de Vainilla",
        "imagen": "img/pasteles/TT001.png",
        "precio": "40000"
    },
    {
        "id": "TT002",
        "categoria": "Tortas_circulares",
        "titulo": "Torta Circular de Manjar",
        "imagen": "img/pasteles/TT002.png",
        "precio": "42000"
    },
    {
        "id": "PI001",
        "categoria": "Postres_individuales",
        "titulo": "Mousse de Chocolate",
        "imagen": "img/pasteles/PI001.png",
        "precio": "5000"
    },
    {
        "id": "PI002",
        "categoria": "Postres_individuales",
        "titulo": "Tiramisú Clásico",
        "imagen": "img/pasteles/PI002.png",
        "precio": "5,500"
    },
    {
        "id": "PSA001",
        "categoria": "Postres_sin_azucar",
        "titulo": "Torta Sin Azúcar de Naranja",
        "imagen": "img/pasteles/PSA001.png",
        "precio": "48,000"
    },
    {
        "id": "PSA002",
        "categoria": "Postres_sin_azucar",
        "titulo": "Cheesecake Sin Azúcar",
        "imagen": "img/pasteles/PSA002.png",
        "precio": "47,000"
    },
    {
        "id": "PT001",
        "categoria": "Pasteleria_tradicional",
        "titulo": "Empanada de Manzana",
        "imagen": "img/pasteles/PT001.png",
        "precio": "3,000"
    },
    {
        "id": "PT002",
        "categoria": "Pasteleria_tradicional",
        "titulo": "Tarta de Santiago",
        "imagen": "img/pasteles/PT002.png",
        "precio": "6,000"
    },
    {
        "id": "PG001",
        "categoria": "Producto_sin_gluten",
        "titulo": "Brownie Sin Gluten",
        "imagen": "img/pasteles/PG001.png",
        "precio": "4,000"
    },
    {
        "id": "PG002",
        "categoria": "Producto_sin_gluten",
        "titulo": "Pan Sin Gluten",
        "imagen": "img/pasteles/PG002.png",
        "precio": "3,500"
    },
    {
        "id": "PV001",
        "categoria": "Producto_vegano",
        "titulo": "Torta Vegana de Chocolate",
        "imagen": "img/pasteles/PV001.png",
        "precio": "50,000"
    },
    {
        "id": "PV002",
        "categoria": "Producto_vegano",
        "titulo": "Galletas Veganas de Avena",
        "imagen": "img/pasteles/PV002.png",
        "precio": "4,500"
    },
    {
        "id": "TE001",
        "categoria": "Tortas_especiales",
        "titulo": "Torta Especial de Cumpleaños",
        "imagen": "img/pasteles/TE001.png",
        "precio": "55,000"
    },
    {
        "id": "TE002",
        "categoria": "Tortas_especiales",
        "titulo": "Torta Especial de Boda",
        "imagen": "img/pasteles/TE002.png",
        "precio": "60,000"
    }
];


const section = document.getElementById("productos");
console.log(section);

const contenedorCards = document.createElement("div");
contenedorCards.className = "contenedor-cards";

section.appendChild(contenedorCards);

for (const i of productos) {
    const carta = document.createElement("div");
    carta.className = "carta";
    contenedorCards.appendChild(carta);

    const contendorBoton = document.createElement("div");
    contendorBoton.className = "contenedor-imagen";
    carta.appendChild(contendorBoton);

    const imagenProducto = document.createElement("img");
    imagenProducto.src = i.imagen;
    imagenProducto.className = "imagen-producto";
    contendorBoton.appendChild(imagenProducto);

    const tituloProducto = document.createElement("h3");
    tituloProducto.classList.add("h3-producto");
    tituloProducto.textContent = i.titulo.toUpperCase();
    carta.appendChild(tituloProducto);

    const precioProducto = document.createElement("p");
    precioProducto.className = "precio-producto";
    precioProducto.textContent = "$ " + i.precio;
    tituloProducto.appendChild(precioProducto);

    const botonAgregarCarro = document.createElement("button");
    botonAgregarCarro.textContent = "  🛒 Agregar al carro  ";
    botonAgregarCarro.className = "btn";
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