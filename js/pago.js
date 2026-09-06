var estado = {
    sesion: null,
    carrito: [],
    subtotal: 0,
    descuentoPorcentaje: 0,
    descuentoDescripcion: '',
    total: 0,
    usarDireccionGuardada: true,
    direccionFinal: null,
    fechaEnvio: '',
    tarjeta: {}
};

function numPrecio(p) { return parseInt(String(p).replace(/[^0-9]/g, ''), 10) || 0; }
function clp(n) { return '$ ' + n.toLocaleString('es-CL'); }

document.addEventListener('DOMContentLoaded', function() {
    estado.sesion  = obtenerSesion();
    estado.carrito = obtenerCarrito();
    
    if (estado.carrito.length === 0) { 
        window.location.href = 'productos.html'; 
        return; 
    }

    var manana = new Date();
    manana.setDate(manana.getDate() + 1);
    var minFecha = manana.toISOString().split('T')[0];
    
    var inputFecha = document.getElementById('pago-fecha-envio');
    if (inputFecha) {
        inputFecha.min = minFecha;
        inputFecha.value = minFecha;
    }

    var selComuna = document.getElementById('pago-comuna');
    if (selComuna && typeof COMUNAS_SANTIAGO !== 'undefined') {
        COMUNAS_SANTIAGO.forEach(function(c) {
            var o = document.createElement('option');
            o.value = c; 
            o.textContent = c;
            selComuna.appendChild(o);
        });
        if (typeof M !== 'undefined') M.FormSelect.init(selComuna);
    }

    if (estado.sesion) {
        document.getElementById('bloque-invitado').classList.add('oculto');
        var bloqueGuardada = document.getElementById('bloque-dir-guardada');
        bloqueGuardada.classList.remove('oculto');
        
        var dir = estado.sesion.direccion;
        document.getElementById('dir-guardada-texto').textContent = dir.calle + ' ' + dir.numero + ', ' + dir.comuna;
        document.getElementById('bloque-dir-nueva').classList.add('oculto');
        
        document.querySelectorAll('input[name="tipo-dir"]').forEach(function(r) {
            r.addEventListener('change', function() {
                estado.usarDireccionGuardada = r.value === 'guardada';
                document.getElementById('bloque-dir-nueva').classList.toggle('oculto', estado.usarDireccionGuardada);
                if (!estado.usarDireccionGuardada && typeof M !== 'undefined') {
                    M.FormSelect.init(document.getElementById('pago-comuna'));
                }
            });
        });

        var desc = obtenerDescuento(estado.sesion);
        estado.descuentoPorcentaje  = desc.porcentaje;
        estado.descuentoDescripcion = desc.descripcion;
        
        if (desc.porcentaje === 0) {
            document.getElementById('bloque-codigo').classList.remove('oculto');
        }
    } else {
        document.getElementById('bloque-invitado').classList.remove('oculto');
        document.getElementById('bloque-dir-guardada').classList.add('oculto');
        document.getElementById('bloque-dir-nueva').classList.remove('oculto');
        document.getElementById('bloque-codigo').classList.remove('oculto');
    }

    renderResumen();

    var btnAplicarCodigo = document.getElementById('btn-aplicar-codigo');
    if (btnAplicarCodigo) btnAplicarCodigo.addEventListener('click', aplicarCodigo);

    var tarjetaNum = document.getElementById('tarjeta-numero');
    if (tarjetaNum) {
        tarjetaNum.addEventListener('input', function() {
            var v = this.value.replace(/\D/g,'').substring(0,16);
            this.value = (v.match(/.{1,4}/g) || []).join(' ');
            document.getElementById('tv-numero').textContent = this.value || '**** **** **** ****';
        });
    }

    var tarjetaNom = document.getElementById('tarjeta-nombre');
    if (tarjetaNom) {
        tarjetaNom.addEventListener('input', function() {
            document.getElementById('tv-nombre').textContent = this.value.toUpperCase() || 'NOMBRE APELLIDO';
        });
    }

    var tarjetaVen = document.getElementById('tarjeta-vence');
    if (tarjetaVen) {
        tarjetaVen.addEventListener('input', function() {
            var v = this.value.replace(/\D/g,'').substring(0,4);
            if (v.length > 2) v = v.slice(0,2) + '/' + v.slice(2);
            this.value = v;
            document.getElementById('tv-vence').textContent = this.value || 'MM/AA';
        });
    }

    document.getElementById('btn-paso1').addEventListener('click', irPaso2);
    document.getElementById('btn-volver-1').addEventListener('click', function() { irPaso(1); });
    document.getElementById('btn-paso2').addEventListener('click', irPaso3);
    document.getElementById('btn-volver-2').addEventListener('click', function() { irPaso(2); });
    document.getElementById('btn-confirmar').addEventListener('click', confirmarCompra);
});

function calcularTotales() {
    estado.subtotal = estado.carrito.reduce(function(t, i) {
        return t + numPrecio(i.precio) * i.cantidad;
    }, 0);
    estado.total = estado.subtotal - Math.round(estado.subtotal * estado.descuentoPorcentaje / 100);
}

function renderResumen() {
    calcularTotales();
    var cont = document.getElementById('resumen-items');
    if (!cont) return;
    cont.innerHTML = '';
    
    estado.carrito.forEach(function(i) {
        var div = document.createElement('div');
        div.className = 'pago-resumen-item';
        div.innerHTML = '<span>' + i.cantidad + 'x ' + i.titulo + '</span><span>' + clp(numPrecio(i.precio) * i.cantidad) + '</span>';
        cont.appendChild(div);
    });
    
    document.getElementById('resumen-subtotal').textContent = clp(estado.subtotal);
    document.getElementById('resumen-total').textContent = clp(estado.total);
    
    var filaDesc = document.getElementById('resumen-descuento-fila');
    if (estado.descuentoPorcentaje > 0) {
        filaDesc.classList.remove('oculto');
        document.getElementById('resumen-descuento-label').textContent = estado.descuentoDescripcion || ('Descuento ' + estado.descuentoPorcentaje + '%');
        document.getElementById('resumen-descuento-valor').textContent = '- ' + clp(Math.round(estado.subtotal * estado.descuentoPorcentaje / 100));
    } else {
        filaDesc.classList.add('oculto');
    }
}

function aplicarCodigo() {
    var codigo = document.getElementById('pago-codigo').value.trim().toUpperCase();
    var resultado = document.getElementById('codigo-resultado');
    resultado.classList.remove('oculto', 'auth-error', 'auth-exito');
    
    if (codigo === 'FELICES50') {
        if (estado.descuentoPorcentaje < 10) {
            estado.descuentoPorcentaje = 10;
            estado.descuentoDescripcion = 'Descuento 10% (código FELICES50)';
            resultado.textContent = 'Código aplicado: 10% de descuento';
            resultado.classList.add('auth-exito');
            if (estado.sesion && !tieneCodigo(estado.sesion)) {
                estado.sesion.codigoReferencia = 'FELICES50';
                actualizarUsuario(estado.sesion);
                iniciarSesion(estado.sesion);
            }
        } else {
            resultado.textContent = 'Ya tienes un descuento mayor activo.';
            resultado.classList.add('auth-exito');
        }
    } else {
        resultado.textContent = 'Código no válido.';
        resultado.classList.add('auth-error');
    }
    resultado.classList.remove('oculto');
    renderResumen();
}

function irPaso(n) {
    ['1','2','3'].forEach(function(i) {
        document.getElementById('paso-' + i).classList.add('oculto');
        var ind = document.getElementById('paso-ind-' + i);
        ind.classList.remove('activo','completado');
    });
    document.getElementById('paso-' + n).classList.remove('oculto');
    for (var i = 1; i < n; i++) document.getElementById('paso-ind-' + i).classList.add('completado');
    document.getElementById('paso-ind-' + n).classList.add('activo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function irPaso2() {
    if (!estado.sesion) {
        var nombre = document.getElementById('inv-nombre').value.trim();
        var apellido = document.getElementById('inv-apellido').value.trim();
        var correo = document.getElementById('inv-correo').value.trim();
        var nac = document.getElementById('inv-nacimiento').value;
        var pass = document.getElementById('inv-password').value;
        var conf = document.getElementById('inv-confirmar').value;
        
        if (!nombre || !apellido || !correo || !nac || !pass || !conf) {
            if (typeof M !== 'undefined') M.toast({ html: 'Completa todos los datos personales' }); 
            return;
        }
        if (pass !== conf) { 
            if (typeof M !== 'undefined') M.toast({ html: 'Las contraseñas no coinciden' }); 
            return; 
        }
    }
    
    if (!estado.sesion || !estado.usarDireccionGuardada) {
        var comuna = document.getElementById('pago-comuna').value;
        var calle = document.getElementById('pago-calle').value.trim();
        var numero = document.getElementById('pago-numero').value.trim();
        if (!comuna || !calle || !numero) { 
            if (typeof M !== 'undefined') M.toast({ html: 'Completa la dirección de entrega' }); 
            return; 
        }
        estado.direccionFinal = { comuna: comuna, calle: calle, numero: numero };
    } else {
        estado.direccionFinal = estado.sesion.direccion;
    }
    
    var fecha = document.getElementById('pago-fecha-envio').value;
    if (!fecha) { 
        if (typeof M !== 'undefined') M.toast({ html: 'Selecciona una fecha de entrega' }); 
        return; 
    }
    estado.fechaEnvio = fecha;
    irPaso(2);
}

function irPaso3() {
    var num = document.getElementById('tarjeta-numero').value.replace(/\s/g,'');
    var nombre = document.getElementById('tarjeta-nombre').value.trim();
    var vence = document.getElementById('tarjeta-vence').value;
    var cvv = document.getElementById('tarjeta-cvv').value;
    
    if (num.length < 16 || !nombre || vence.length < 5 || cvv.length < 3) {
        if (typeof M !== 'undefined') M.toast({ html: 'Completa los datos de la tarjeta' }); 
        return;
    }
    
    estado.tarjeta = { numero: '**** **** **** ' + num.slice(-4), nombre: nombre, vence: vence };
    
    document.getElementById('conf-direccion').innerHTML =
        '<i class="material-icons tiny">home</i> ' + estado.direccionFinal.calle + ' ' + estado.direccionFinal.numero + ', ' + estado.direccionFinal.comuna;
    document.getElementById('conf-fecha').innerHTML =
        '<i class="material-icons tiny">event</i> Entrega estimada: ' + estado.fechaEnvio;
    document.getElementById('conf-tarjeta').innerHTML =
        '<i class="material-icons tiny">credit_card</i> ' + estado.tarjeta.numero + '   vence ' + estado.tarjeta.vence;
        
    var html = estado.carrito.map(function(i) {
        return '<div class="conf-producto"><span>' + i.cantidad + 'x ' + i.titulo + '</span><span>' + clp(numPrecio(i.precio) * i.cantidad) + '</span></div>';
    }).join('');
    
    if (estado.descuentoPorcentaje > 0) {
        html += '<div class="conf-producto conf-descuento"><span>' + estado.descuentoDescripcion + '</span><span>- ' + clp(Math.round(estado.subtotal * estado.descuentoPorcentaje / 100)) + '</span></div>';
    }
    html += '<div class="conf-producto conf-total"><strong>Total</strong><strong>' + clp(estado.total) + '</strong></div>';
    
    document.getElementById('conf-productos').innerHTML = html;
    irPaso(3);
}

function confirmarCompra() {
    var usuarioId = null;
    var datosInvitado = null;
    
    if (estado.sesion) {
        usuarioId = estado.sesion.id;
    } else {
        var nombre = document.getElementById('inv-nombre').value.trim();
        var apellido = document.getElementById('inv-apellido').value.trim();
        var correo = document.getElementById('inv-correo').value.trim().toLowerCase();
        var nac = document.getElementById('inv-nacimiento').value;
        var pass = document.getElementById('inv-password').value;
        var codigo = document.getElementById('pago-codigo').value.trim().toUpperCase();
        
        var existente = obtenerUsuarios().find(function(u) { return u.correo === correo; });
        
        if (!existente) {
            var nuevaCuenta = {
                id: 'USR' + Date.now(),
                tipo: 'cliente',
                nombre: nombre, 
                apellido: apellido,
                correo: correo, 
                password: pass,
                fechaNacimiento: nac,
                direccion: estado.direccionFinal,
                codigoReferencia: codigo,
                fechaRegistro: new Date().toISOString().split('T')[0]
            };
            guardarUsuario(nuevaCuenta);
            iniciarSesion(nuevaCuenta);
            usuarioId = nuevaCuenta.id;
        } else {
            usuarioId = existente.id;
        }
        datosInvitado = { nombre: nombre, apellido: apellido, correo: correo };
    }
    
    var compra = {
        id: 'PED' + Date.now(),
        usuarioId: usuarioId,
        datosInvitado: datosInvitado,
        fecha: new Date().toLocaleDateString('es-CL'),
        items: estado.carrito.map(function(i) {
            return { id: i.id, titulo: i.titulo, cantidad: i.cantidad, precio: numPrecio(i.precio) };
        }),
        subtotal: estado.subtotal,
        descuento: estado.descuentoPorcentaje,
        total: estado.total,
        direccion: estado.direccionFinal,
        fechaEnvio: estado.fechaEnvio,
        tarjeta: estado.tarjeta.numero
    };
    
    guardarCompra(compra);
    localStorage.removeItem('carrito');
    
    ['1','2','3'].forEach(function(i) {
        document.getElementById('paso-' + i).classList.add('oculto');
        document.getElementById('paso-ind-' + i).classList.remove('activo');
        document.getElementById('paso-ind-' + i).classList.add('completado');
    });
    
    document.getElementById('paso-exito').classList.remove('oculto');
    var msj = '¡Gracias por tu compra! Tu pedido llegará el ' + estado.fechaEnvio + '.';
    if (datosInvitado) msj += ' Hemos creado tu cuenta con el correo ' + datosInvitado.correo + '.';
    document.getElementById('exito-mensaje').textContent = msj;
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}