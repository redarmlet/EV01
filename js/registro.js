document.addEventListener('DOMContentLoaded', function() {
    if (estaLogueado()) {
        var s = obtenerSesion();
        window.location.href = s.tipo === 'admin' ? 'admin.html' : 'perfil.html';
        return;
    }

    var selectComuna = document.getElementById('reg-comuna');
    if (selectComuna && typeof COMUNAS_SANTIAGO !== 'undefined') {
        COMUNAS_SANTIAGO.forEach(function(c) {
            var opt = document.createElement('option');
            opt.value = c;
            opt.textContent = c;
            selectComuna.appendChild(opt);
        });
        if (typeof M !== 'undefined') {
            M.FormSelect.init(selectComuna);
        }
    }

    var btnRegistrar = document.getElementById('btn-registrar');
    if (btnRegistrar) {
        btnRegistrar.addEventListener('click', procesarRegistro);
    }
});

function mostrarMensajeRegistro(texto, tipo) {
    var el = document.getElementById('auth-mensaje');
    if (el) {
        el.textContent = texto;
        el.className = 'auth-mensaje ' + (tipo === 'error' ? 'auth-error' : 'auth-exito');
    }
}

function procesarRegistro() {
    var nombre = document.getElementById('reg-nombre').value.trim();
    var apellido = document.getElementById('reg-apellido').value.trim();
    var nacimiento = document.getElementById('reg-nacimiento').value;
    var correo = document.getElementById('reg-correo').value.trim().toLowerCase();
    var password = document.getElementById('reg-password').value;
    var confirmar = document.getElementById('reg-confirmar').value;
    var comuna = document.getElementById('reg-comuna').value;
    var calle = document.getElementById('reg-calle').value.trim();
    var numero = document.getElementById('reg-numero').value.trim();
    var codigo = document.getElementById('reg-codigo').value.trim().toUpperCase();

    if (!nombre || !apellido || !nacimiento || !correo || !password || !confirmar || !comuna || !calle || !numero) {
        mostrarMensajeRegistro('Por favor completa todos los campos obligatorios.', 'error');
        return;
    }

    if (password !== confirmar) {
        mostrarMensajeRegistro('Las contraseñas no coinciden.', 'error');
        return;
    }

    if (password.length < 6) {
        mostrarMensajeRegistro('La contraseña debe tener al menos 6 caracteres.', 'error');
        return;
    }

    if (codigo && codigo !== 'FELICES50') {
        mostrarMensajeRegistro('El código de referencia no es válido.', 'error');
        return;
    }

    var usuarios = obtenerUsuarios();
    if (usuarios.find(function(u) { return u.correo === correo; })) {
        mostrarMensajeRegistro('Ya existe una cuenta con ese correo electrónico.', 'error');
        return;
    }

    var nuevoUsuario = {
        id: 'USR' + Date.now(),
        tipo: 'cliente',
        nombre: nombre,
        apellido: apellido,
        correo: correo,
        password: password,
        fechaNacimiento: nacimiento,
        direccion: { comuna: comuna, calle: calle, numero: numero },
        codigoReferencia: codigo,
        fechaRegistro: new Date().toISOString().split('T')[0]
    };

    guardarUsuario(nuevoUsuario);

    var beneficios = [];
    if (esMayorDe50(nuevoUsuario)) beneficios.push('50% de descuento por ser mayor de 50 años');
    if (codigo === 'FELICES50') beneficios.push('10% de descuento de por vida');
    if (esDuoc(nuevoUsuario)) beneficios.push('torta gratis en tu cumpleaños');

    var msj = '¡Cuenta creada con éxito!';
    if (beneficios.length) msj += ' Beneficios activados: ' + beneficios.join(', ') + '.';
    
    mostrarMensajeRegistro(msj, 'exito');
    setTimeout(function() { window.location.href = 'login.html'; }, 2500);
}