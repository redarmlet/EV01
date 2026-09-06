document.addEventListener('DOMContentLoaded', function() {
    if (estaLogueado()) {
        var s = obtenerSesion();
        window.location.href = s.tipo === 'admin' ? 'admin.html' : 'perfil.html';
        return;
    }
    
    var btnLogin = document.getElementById('btn-login');
    var inputPassword = document.getElementById('login-password');
    
    if (btnLogin) btnLogin.addEventListener('click', procesarLogin);
    
    if (inputPassword) {
        inputPassword.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') procesarLogin();
        });
    }
});

function mostrarMensajeLogin(texto, tipo) {
    var el = document.getElementById('auth-mensaje');
    if(el) {
        el.textContent = texto;
        el.className = 'auth-mensaje ' + (tipo === 'error' ? 'auth-error' : 'auth-exito');
    }
}

function procesarLogin() {
    var correoInput = document.getElementById('login-correo');
    var passwordInput = document.getElementById('login-password');
    
    if (!correoInput || !passwordInput) return;
    
    var correo = correoInput.value.trim().toLowerCase();
    var password = passwordInput.value;
    
    if (!correo || !password) {
        mostrarMensajeLogin('Completa todos los campos.', 'error');
        return;
    }
    
    var usuario = obtenerUsuarios().find(function(u) {
        return u.correo === correo && u.password === password;
    });
    
    if (!usuario) {
        mostrarMensajeLogin('Correo o contraseña incorrectos.', 'error');
        return;
    }
    
    iniciarSesion(usuario);
    
    var redirect = sessionStorage.getItem('pms_redirect');
    if (redirect) {
        sessionStorage.removeItem('pms_redirect');
        window.location.href = redirect;
        return;
    }
    
    window.location.href = usuario.tipo === 'admin' ? 'admin.html' : 'perfil.html';
}