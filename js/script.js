document.addEventListener('DOMContentLoaded', function() {
    inyectarEstructura();
});

function inyectarEstructura() {
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');
    
    if (!document.getElementById('carrito-panel')) {
        var cartHTML = '<div id="carrito-overlay" class="carrito-overlay"></div>' +
                       '<aside id="carrito-panel" class="carrito-panel">' +
                           '<div class="carrito-panel-header">' +
                               '<h4>Tu carro</h4>' +
                               '<button id="carrito-cerrar" class="material-icons carrito-cerrar" aria-label="Cerrar carrito">close</button>' +
                           '</div>' +
                           '<div id="carrito-lista" class="carrito-lista"></div>' +
                           '<div class="carrito-panel-footer">' +
                               '<div class="carrito-total-fila"><span>Total</span><span id="carrito-total">$ 0</span></div>' +
                               '<button id="carrito-finalizar" class="btn carrito-finalizar">Finalizar compra</button>' +
                           '</div>' +
                       '</aside>';
        document.body.insertAdjacentHTML('beforeend', cartHTML);
    }

    var sesion = null;
    if (typeof obtenerSesion === 'function') {
        sesion = obtenerSesion();
    }
    
    if (header) {
        var enlacesAuth = '';
        var dropdownContent = '';
        
        if (sesion) {
            var rutaDestino = sesion.tipo === 'admin' ? 'admin.html' : 'perfil.html';
            enlacesAuth = '<li><a class="dropdown-trigger nav-usuario" href="#!" data-target="dropdown1">' +
                          '<i class="material-icons">account_circle</i><span>' + sesion.nombre + '</span><i class="material-icons right">arrow_drop_down</i></a></li>';
            dropdownContent = '<li><a href="' + rutaDestino + '">Panel</a></li>' +
                              '<li class="divider"></li>' +
                              '<li><a href="#!" id="btn-logout-global">Cerrar Sesión</a></li>';
        } else {
            enlacesAuth = '<li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Iniciar Sesión<i class="material-icons right">arrow_drop_down</i></a></li>';
            dropdownContent = '<li><a href="registro.html">Registrarse</a></li>' +
                              '<li class="divider"></li>' +
                              '<li><a href="login.html">Iniciar Sesión</a></li>';
        }

        header.innerHTML = 
            '<ul id="dropdown1" class="dropdown-content">' + dropdownContent + '</ul>' +
            '<nav>' +
                '<div class="nav-wrapper">' +
                    '<a href="index.html" class="brand-logo"><img src="img/logo01.webp" alt="Pastelería Mil Sabores" class="logo"></a>' +
                    '<ul id="nav-mobile" class="right hide-on-med-and-down">' +
                        '<li><a href="nosotros.html">Nosotros</a></li>' +
                        '<li><a href="Blog.html">Blogs</a></li>' +
                        '<li><a href="productos.html">Productos</a></li>' +
                        '<li><a id="carrito-boton" href="#!" aria-label="Abrir carrito"><i class="material-icons">shopping_cart</i><span id="carrito-contador" class="carrito-contador oculto">0</span></a></li>' +
                        enlacesAuth +
                    '</ul>' +
                '</div>' +
            '</nav>';
            
        var dropdowns = document.querySelectorAll('.dropdown-trigger');
        if (typeof M !== 'undefined' && dropdowns.length > 0) {
            M.Dropdown.init(dropdowns);
        }

        var btnLogoutGlobal = document.getElementById('btn-logout-global');
        if (btnLogoutGlobal) {
            btnLogoutGlobal.addEventListener('click', function(e) {
                e.preventDefault();
                if (typeof cerrarSesion === 'function') cerrarSesion();
                window.location.href = 'index.html';
            });
        }
    }

    if (footer) {
        footer.innerHTML = 
            '<div class="container">' +
                '<div class="row">' +
                    '<div class="col l6 s12">' +
                        '<h5 class="white-text">Pastelería 1000 Sabores</h5>' +
                        '<p class="grey-text text-lighten-4">Celebrando 50 años de la repostería más dulce y tradicional.</p>' +
                    '</div>' +
                    '<div class="col l4 offset-l2 s12">' +
                        '<h5 class="white-text">Links</h5>' +
                        '<ul><li><a class="grey-text text-lighten-3" href="contacto.html">Contacto</a></li></ul>' +
                    '</div>' +
                '</div>' +
            '</div>' +
            '<div class="footer-copyright">' +
                '<div class="container">' +
                    '© 2026 - todos los derechos reservados' +
                '</div>' +
            '</div>';
    }

    if (typeof inicializarCarrito === 'function') {
        inicializarCarrito();
    }
}