var contenedor = document.getElementById("detalle-producto");

function obtenerIdDesdeURL() {
    var params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function dibujarDetalle() {
    var id = obtenerIdDesdeURL();
    var producto = productos.find(function(p) { return p.id === id; });

    if (!producto){
        contenedor.innerHTML =
            '<div class="detalle-no-encontrado">' +
                '<h3>No encontramos ese producto</h3>' +
                '<p>Puede que el enlace esté mal escrito o el producto ya no exista.</p>' +
                '<a href="productos.html" class="btn">Volver a productos</a>' +
            '</div>';
        return;
    }

    document.title = producto.titulo + " · Pastelería Mil Sabores";

    contenedor.innerHTML =
        '<a href="productos.html" class="detalle-volver">' +
            '<i class="material-icons">arrow_back</i> Volver a productos' +
        '</a>' +
        '<div class="detalle-grid">' +
            '<div class="detalle-imagen-contenedor">' +
                '<img src="' + producto.imagen + '" alt="' + producto.titulo + '" class="detalle-imagen">' +
            '</div>' +
            '<div class="detalle-info">' +
                '<span class="detalle-categoria">' + (NOMBRES_CATEGORIA[producto.categoria] || producto.categoria) + '</span>' +
                '<h1 class="detalle-titulo">' + producto.titulo + '</h1>' +
                '<p class="detalle-precio">$ ' + producto.precio + '</p>' +
                '<p class="detalle-descripcion">' + producto.descripcion + '</p>' +
                (producto.permiteMensaje ?
                    '<div class="detalle-mensaje">' +
                        '<label for="detalle-mensaje-texto">Mensaje personalizado (opcional)</label>' +
                        '<textarea id="detalle-mensaje-texto" class="materialize-textarea" placeholder="Ej: ¡Feliz cumpleaños Ana!"></textarea>' +
                    '</div>'
                    : '') +
                '<div class="detalle-cantidad">' +
                    '<span>Cantidad</span>' +
                    '<div class="detalle-cantidad-control">' +
                        '<button id="restar-cantidad" class="btn-cantidad" aria-label="Restar cantidad">-</button>' +
                        '<span id="cantidad-seleccionada">1</span>' +
                        '<button id="sumar-cantidad" class="btn-cantidad" aria-label="Sumar cantidad">+</button>' +
                    '</div>' +
                '</div>' +
                '<button id="detalle-agregar-carro" class="btn detalle-boton-agregar">🛒 Agregar al carro</button>' +
            '</div>' +
        '</div>';

    var cantidad = 1;
    var spanCantidad = document.getElementById("cantidad-seleccionada");
    var areaMensaje = document.getElementById("detalle-mensaje-texto");
    if (areaMensaje) M.textareaAutoResize(areaMensaje);

    document.getElementById("restar-cantidad").addEventListener("click", function() {
        if (cantidad > 1){
            cantidad--;
            spanCantidad.textContent = cantidad;
        }
    });

    document.getElementById("sumar-cantidad").addEventListener("click", function() {
        cantidad++;
        spanCantidad.textContent = cantidad;
    });

    document.getElementById("detalle-agregar-carro").addEventListener("click", function() {
        var mensaje = areaMensaje ? areaMensaje.value.trim() : "";
        guardar(producto, cantidad, mensaje);
        M.toast({html: cantidad + " x " + producto.titulo + " agregado al carro"});
    });
}

dibujarDetalle();