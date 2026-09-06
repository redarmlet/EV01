document.addEventListener('DOMContentLoaded', function() {
    var sesion = obtenerSesion();
    
    if (!sesion) { 
        window.location.href = 'login.html'; 
        return; 
    }
    if (sesion.tipo === 'admin') { 
        window.location.href = 'admin.html'; 
        return; 
    }
    
    document.getElementById('perfil-nombre-completo').textContent = sesion.nombre + ' ' + sesion.apellido;
    document.getElementById('perfil-correo').textContent = sesion.correo;
    document.getElementById('pd-nombre').textContent = sesion.nombre;
    document.getElementById('pd-apellido').textContent = sesion.apellido;
    document.getElementById('pd-nacimiento').textContent = sesion.fechaNacimiento;
    document.getElementById('pd-edad').textContent = calcularEdad(sesion.fechaNacimiento) + ' años';
    document.getElementById('pd-comuna').textContent = sesion.direccion.comuna;
    document.getElementById('pd-calle').textContent = sesion.direccion.calle;
    document.getElementById('pd-numero').textContent = sesion.direccion.numero;
    
    var badges = document.getElementById('perfil-badges');
    if (esDuoc(sesion)) {
        var bDuoc = document.createElement('span');
        bDuoc.className = 'perfil-badge perfil-badge-duoc';
        bDuoc.textContent = 'Estudiante Duoc';
        badges.appendChild(bDuoc);
    }
    if (esMayorDe50(sesion)) {
        var bSenior = document.createElement('span');
        bSenior.className = 'perfil-badge perfil-badge-senior';
        bSenior.textContent = '+50 años';
        badges.appendChild(bSenior);
    }
    
    var descuento = obtenerDescuento(sesion);
    if (descuento.porcentaje > 0) {
        var banner = document.getElementById('perfil-descuento-banner');
        banner.textContent = '¡' + descuento.descripcion + ' activo en todas tus compras!';
        banner.classList.remove('oculto');
    }
    
    if (tieneTortaGratis(sesion)) {
        document.getElementById('perfil-torta-banner').classList.remove('oculto');
    }
    
    var contenedorBeneficios = document.getElementById('pd-beneficios');
    var listaBeneficios = [];
    if (esMayorDe50(sesion)) listaBeneficios.push({texto: '50% de descuento en todos los productos' });
    if (tieneCodigo(sesion)) listaBeneficios.push({texto: '10% de descuento (código FELICES50)' });
    if (esDuoc(sesion)) listaBeneficios.push({texto: 'Torta gratis en tu cumpleaños' });
    
    if (listaBeneficios.length === 0) {
        contenedorBeneficios.innerHTML = '<p class="perfil-sin-datos">No tienes beneficios activos aún.</p>';
    } else {
        listaBeneficios.forEach(function(b) {
            var div = document.createElement('div');
            div.className = 'perfil-beneficio';
            div.innerHTML = '<i class="material-icons">' + b.icono + '</i><span>' + b.texto + '</span>';
            contenedorBeneficios.appendChild(div);
        });
    }
    
    var compras = obtenerCompras().filter(function(c) { return c.usuarioId === sesion.id; });
    var contenedorCompras = document.getElementById('pd-compras');
    
    if (compras.length === 0) {
        contenedorCompras.innerHTML = '<p class="perfil-sin-datos">Aún no tienes compras registradas.</p>';
    } else {
        compras.forEach(function(c) {
            var div = document.createElement('div');
            div.className = 'perfil-compra';
            div.innerHTML =
                '<div class="perfil-compra-header">' +
                    '<span class="perfil-compra-id">Pedido #' + c.id + '</span>' +
                    '<span class="perfil-compra-fecha">' + c.fecha + '</span>' +
                    '<span class="perfil-compra-total">$ ' + c.total.toLocaleString('es-CL') + '</span>' +
                '</div>' +
                '<div class="perfil-compra-items">' +
                    c.items.map(function(i) { return i.cantidad + 'x ' + i.titulo; }).join(' | ') +
                '</div>';
            contenedorCompras.appendChild(div);
        });
    }
    
    var btnCerrar = document.getElementById('btn-cerrar-sesion');
    if (btnCerrar) {
        btnCerrar.addEventListener('click', function() {
            cerrarSesion();
            window.location.href = 'index.html';
        });
    }
});