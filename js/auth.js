var LLAVE_USUARIOS = "pms_usuarios";
var LLAVE_SESION   = "pms_sesion";
var LLAVE_COMPRAS  = "pms_compras";
var LLAVE_PRODUCTOS = "pms_productos";

function inicializarUsuarios() {
    var guardados = JSON.parse(localStorage.getItem(LLAVE_USUARIOS) || "[]");
    if (typeof CUENTAS_INICIALES !== 'undefined') {
        CUENTAS_INICIALES.forEach(function(cuenta) {
            var existe = guardados.find(function(u) { return u.id === cuenta.id; });
            if (!existe) guardados.unshift(cuenta);
        });
    }
    localStorage.setItem(LLAVE_USUARIOS, JSON.stringify(guardados));
    return guardados;
}

function obtenerUsuarios() {
    return inicializarUsuarios();
}

function guardarUsuario(usuario) {
    var lista = obtenerUsuarios();
    lista.push(usuario);
    localStorage.setItem(LLAVE_USUARIOS, JSON.stringify(lista));
}

function actualizarUsuario(usuarioActualizado) {
    var lista = obtenerUsuarios();
    var indice = lista.findIndex(function(u) { return u.id === usuarioActualizado.id; });
    if (indice !== -1) lista[indice] = usuarioActualizado;
    localStorage.setItem(LLAVE_USUARIOS, JSON.stringify(lista));
}

function obtenerSesion() {
    var datos = localStorage.getItem(LLAVE_SESION);
    return datos ? JSON.parse(datos) : null;
}

function iniciarSesion(usuario) {
    localStorage.setItem(LLAVE_SESION, JSON.stringify(usuario));
}

function cerrarSesion() {
    localStorage.removeItem(LLAVE_SESION);
}

function estaLogueado() {
    return obtenerSesion() !== null;
}

function calcularEdad(fechaNacimiento) {
    var hoy = new Date();
    var nac = new Date(fechaNacimiento);
    var edad = hoy.getFullYear() - nac.getFullYear();
    var m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad;
}

function esMayorDe50(usuario) {
    if (!usuario || !usuario.fechaNacimiento) return false;
    return calcularEdad(usuario.fechaNacimiento) >= 50;
}

function tieneCodigo(usuario) {
    return usuario && (usuario.codigoReferencia || "").toUpperCase() === "FELICES50";
}

function esDuoc(usuario) {
    return usuario && usuario.correo && usuario.correo.toLowerCase().endsWith("@duocuc.cl");
}

function esCumpleaniosHoy(usuario) {
    if (!usuario || !usuario.fechaNacimiento) return false;
    var hoy = new Date();
    var nac = new Date(usuario.fechaNacimiento);
    return hoy.getMonth() === nac.getMonth() && hoy.getDate() === nac.getDate();
}

function obtenerDescuento(usuario) {
    if (!usuario) return { porcentaje: 0, descripcion: "" };
    if (esMayorDe50(usuario)) {
        return { porcentaje: 50, descripcion: "Descuento 50% (mayor de 50 años)" };
    }
    if (tieneCodigo(usuario)) {
        return { porcentaje: 10, descripcion: "Descuento 10% (código FELICES50)" };
    }
    return { porcentaje: 0, descripcion: "" };
}

function tieneTortaGratis(usuario) {
    return esDuoc(usuario) && esCumpleaniosHoy(usuario);
}

function obtenerCompras() {
    return JSON.parse(localStorage.getItem(LLAVE_COMPRAS) || "[]");
}

function guardarCompra(compra) {
    var lista = obtenerCompras();
    lista.push(compra);
    localStorage.setItem(LLAVE_COMPRAS, JSON.stringify(lista));
}

function inicializarProductos() {
    var guardados = JSON.parse(localStorage.getItem(LLAVE_PRODUCTOS) || "[]");
    
    if (guardados.length === 0 && typeof productos !== 'undefined') {
        guardados = productos;
        localStorage.setItem(LLAVE_PRODUCTOS, JSON.stringify(guardados));
    }
    return guardados;
}

function obtenerProductosLS() {
    return inicializarProductos();
}

function guardarProducto(producto) {
    var lista = obtenerProductosLS();
    lista.push(producto);
    localStorage.setItem(LLAVE_PRODUCTOS, JSON.stringify(lista));
}

function actualizarProducto(productoActualizado) {
    var lista = obtenerProductosLS();
    var indice = lista.findIndex(function(p) { return p.id === productoActualizado.id; });
    if (indice !== -1) lista[indice] = productoActualizado;
    localStorage.setItem(LLAVE_PRODUCTOS, JSON.stringify(lista));
}

function actualizarCompra(compraActualizada) {
    var lista = obtenerCompras();
    var indice = lista.findIndex(function(c) { return c.id === compraActualizada.id; });
    if (indice !== -1) lista[indice] = compraActualizada;
    localStorage.setItem(LLAVE_COMPRAS, JSON.stringify(lista));
}