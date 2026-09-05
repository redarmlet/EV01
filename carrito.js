var LLAVE = "carrito";


function obtenerCarrito() {
    var storageActual = localStorage.getItem(LLAVE);
    return storageActual != null ? JSON.parse(storageActual) : [];
}

function guardarCarrito(carrito) {
    localStorage.setItem(LLAVE, JSON.stringify(carrito));
}

function guardar(producto, cantidad, mensaje) {
    cantidad = cantidad || 1;
    mensaje = mensaje || "";
    var carrito = obtenerCarrito();
    var existente = carrito.find(function(item) { return item.id === producto.id && (item.mensaje || "") === mensaje; });

    if (existente){
        existente.cantidad += cantidad;
    }else{
        var copia = Object.assign({}, producto);
        copia.cantidad = cantidad;
        copia.mensaje = mensaje;
        carrito.push(copia);
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    renderizarCarrito();
}

function eliminarDelCarrito(id) {
    var carrito = obtenerCarrito().filter(function(item) { return item.id !== id; });
    guardarCarrito(carrito);
    actualizarContadorCarrito();
    renderizarCarrito();
}

function cambiarCantidad(id, delta) {
    var carrito = obtenerCarrito();
    var item = carrito.find(function(item) { return item.id === id; });
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0){
        carrito = carrito.filter(function(i) { return i.id !== id; });
    }

    guardarCarrito(carrito);
    actualizarContadorCarrito();
    renderizarCarrito();
}

function precioANumero(precio) {
    return parseInt(String(precio).replace(/[^0-9]/g, ""), 10) || 0;
}

function calcularTotal(carrito) {
    return carrito.reduce(function(total, item) {
        return total + precioANumero(item.precio) * item.cantidad;
    }, 0);
}

function actualizarContadorCarrito() {
    var carrito = obtenerCarrito();
    var totalItems = carrito.reduce(function(t, item) { return t + item.cantidad; }, 0);
    var badge = document.getElementById("carrito-contador");
    if (!badge) return;

    if (totalItems > 0){
        badge.textContent = totalItems;
        badge.classList.remove("oculto");
    }else{
        badge.classList.add("oculto");
    }
}

function renderizarCarrito() {
    var lista = document.getElementById("carrito-lista");
    var totalTexto = document.getElementById("carrito-total");
    if (!lista || !totalTexto) return;

    var carrito = obtenerCarrito();
    lista.innerHTML = "";

    if (carrito.length === 0){
        var vacio = document.createElement("p");
        vacio.className = "carrito-vacio";
        vacio.textContent = "Tu carro está vacío. ¡Agrega alguna delicia!";
        lista.appendChild(vacio);
    }else{
        carrito.forEach(function(item) {
            var fila = document.createElement("div");
            fila.className = "carrito-item";

            fila.innerHTML =
                '<img src="' + item.imagen + '" alt="' + item.titulo + '" class="carrito-item-imagen">' +
                '<div class="carrito-item-info">' +
                    '<p class="carrito-item-titulo">' + item.titulo + '</p>' +
                    '<p class="carrito-item-precio">$ ' + item.precio + '</p>' +
                    (item.permiteMensaje ? '<p class="carrito-item-mensaje">Mensaje: ' + (item.mensaje ? item.mensaje : "Ninguno") + '</p>' : '') +
                    '<div class="carrito-item-cantidad">' +
                        '<button class="btn-cantidad" data-accion="restar" aria-label="Restar cantidad">-</button>' +
                        '<span>' + item.cantidad + '</span>' +
                        '<button class="btn-cantidad" data-accion="sumar" aria-label="Sumar cantidad">+</button>' +
                    '</div>' +
                '</div>' +
                '<button class="carrito-item-eliminar material-icons" aria-label="Eliminar producto">close</button>';

            fila.querySelector('[data-accion="restar"]').addEventListener("click", function() {
                cambiarCantidad(item.id, -1);
            });
            fila.querySelector('[data-accion="sumar"]').addEventListener("click", function() {
                cambiarCantidad(item.id, 1);
            });
            fila.querySelector(".carrito-item-eliminar").addEventListener("click", function() {
                eliminarDelCarrito(item.id);
            });

            lista.appendChild(fila);
        });
    }

    totalTexto.textContent = "$ " + calcularTotal(carrito).toLocaleString("es-CL");
}

function abrirCarrito() {
    document.getElementById("carrito-panel").classList.add("abierto");
    document.getElementById("carrito-overlay").classList.add("visible");
    renderizarCarrito();
}

function cerrarCarrito() {
    document.getElementById("carrito-panel").classList.remove("abierto");
    document.getElementById("carrito-overlay").classList.remove("visible");
}

document.addEventListener('DOMContentLoaded', function() {
    var botonAbrir = document.getElementById("carrito-boton");
    var botonCerrar = document.getElementById("carrito-cerrar");
    var overlay = document.getElementById("carrito-overlay");
    var botonFinalizar = document.getElementById("carrito-finalizar");

    if (botonAbrir) botonAbrir.addEventListener("click", abrirCarrito);
    if (botonCerrar) botonCerrar.addEventListener("click", cerrarCarrito);
    if (overlay) overlay.addEventListener("click", cerrarCarrito);

    if (botonFinalizar){
        botonFinalizar.addEventListener("click", function() {
            M.toast({html: "Próximamente: esta función se activará junto con el sistema de pedidos."});
        });
    }

    actualizarContadorCarrito();
});