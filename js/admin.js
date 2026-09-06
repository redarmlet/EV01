document.addEventListener('DOMContentLoaded', function() {
    var sesion = obtenerSesion();
    
    if (!sesion || sesion.tipo !== 'admin') {
        window.location.href = 'login.html';
        return;
    }
    
    var bienvenida = document.getElementById('admin-bienvenida');
    if (bienvenida) {
        bienvenida.textContent = 'Hola, ' + sesion.nombre + '.';
    }

    var formProductos = document.getElementById('admin-formulario');
    var formUsuarios = document.getElementById('admin-formulario-usuarios');
    var formPedidos = document.getElementById('admin-formulario-pedidos');

    function ocultarFormularios() {
        if (formProductos) formProductos.classList.add('oculto');
        if (formUsuarios) formUsuarios.classList.add('oculto');
        if (formPedidos) formPedidos.classList.add('oculto');
    }

    function actualizarResumen() {
        var usuarios = obtenerUsuarios();
        var compras = obtenerCompras();
        var recaudado = compras.reduce(function(t, c) { return t + (c.total || 0); }, 0);
        
        document.getElementById('admin-total-usuarios').textContent = usuarios.length;
        document.getElementById('admin-total-compras').textContent = compras.length;
        document.getElementById('admin-total-recaudado').textContent = '$ ' + recaudado.toLocaleString('es-CL');
    }

    function renderizarPedidos() {
        var tbodyCompras = document.getElementById('admin-tabla-compras');
        if (!tbodyCompras) return;
        tbodyCompras.innerHTML = '';
        var compras = obtenerCompras();
        var usuarios = obtenerUsuarios();

        if (compras.length === 0) {
            tbodyCompras.innerHTML = '<tr><td colspan="7" style="text-align:center">Sin pedidos aún</td></tr>';
        } else {
            compras.forEach(function(c) {
                var usuario = usuarios.find(function(u) { return u.id === c.usuarioId; });
                var nombreCliente = usuario ? usuario.nombre + ' ' + usuario.apellido : (c.datosInvitado ? c.datosInvitado.nombre : 'Invitado');
                
                var tr = document.createElement('tr');
                tr.innerHTML =
                    '<td>#' + c.id + '</td>' +
                    '<td>' + nombreCliente + '</td>' +
                    '<td>' + c.fecha + '</td>' +
                    '<td>' + (c.fechaEnvio || '-') + '</td>' +
                    '<td>' + (c.descuento > 0 ? c.descuento + '%' : '-') + '</td>' +
                    '<td>$ ' + (c.total || 0).toLocaleString('es-CL') + '</td>' +
                    '<td><a href="#!" class="btn-editar-pedido" data-id="' + c.id + '">[Editar]</a></td>';
                tbodyCompras.appendChild(tr);
            });

            document.querySelectorAll('.btn-editar-pedido').forEach(function(btn) {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    var id = this.getAttribute('data-id');
                    var ped = obtenerCompras().find(function(item) { return item.id === id; });
                    if (ped) {
                        document.getElementById('form-pedido-id').value = ped.id;
                        document.getElementById('form-pedido-fechaenvio').value = ped.fechaEnvio || '';
                        ocultarFormularios();
                        formPedidos.classList.remove('oculto');
                    }
                });
            });
        }
        actualizarResumen();
    }

    function renderizarUsuarios() {
        var tbodyUsuarios = document.getElementById('admin-tabla-usuarios');
        if (!tbodyUsuarios) return;
        tbodyUsuarios.innerHTML = '';
        var usuarios = obtenerUsuarios();

        usuarios.forEach(function(u) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + u.nombre + ' ' + u.apellido + '</td>' +
                '<td>' + u.correo + '</td>' +
                '<td>' + u.tipo + '</td>' +
                '<td>' + (u.fechaRegistro || '-') + '</td>' +
                '<td><a href="#!" class="btn-editar-usuario" data-id="' + u.id + '">[Editar]</a></td>';
            tbodyUsuarios.appendChild(tr);
        });

        document.querySelectorAll('.btn-editar-usuario').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var id = this.getAttribute('data-id');
                var usr = obtenerUsuarios().find(function(item) { return item.id === id; });
                if (usr) {
                    document.getElementById('form-titulo-user').textContent = 'Editar Usuario';
                    document.getElementById('form-user-id').value = usr.id;
                    document.getElementById('form-user-nombre').value = usr.nombre;
                    document.getElementById('form-user-apellido').value = usr.apellido;
                    document.getElementById('form-user-correo').value = usr.correo;
                    document.getElementById('form-user-pass').value = usr.password;
                    document.getElementById('form-user-tipo').value = usr.tipo;
                    ocultarFormularios();
                    formUsuarios.classList.remove('oculto');
                }
            });
        });
        actualizarResumen();
    }

    function renderizarProductos() {
        var tbodyProductos = document.getElementById('admin-tabla-productos');
        if (!tbodyProductos) return;
        tbodyProductos.innerHTML = '';
        var productosLista = obtenerProductosLS();
        
        productosLista.forEach(function(p) {
            var tr = document.createElement('tr');
            tr.innerHTML =
                '<td>' + p.id + '</td>' +
                '<td>' + p.titulo + '</td>' +
                '<td>' + p.categoria + '</td>' +
                '<td>$ ' + p.precio + '</td>' +
                '<td><a href="#!" class="btn-editar-prod" data-id="' + p.id + '">[Editar]</a></td>';
            tbodyProductos.appendChild(tr);
        });

        document.querySelectorAll('.btn-editar-prod').forEach(function(btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                var id = this.getAttribute('data-id');
                var prod = obtenerProductosLS().find(function(item) { return item.id === id; });
                if (prod) {
                    document.getElementById('form-titulo').textContent = 'Editar Producto';
                    document.getElementById('form-id').value = prod.id;
                    document.getElementById('form-campo1').value = prod.titulo;
                    document.getElementById('form-campo2').value = prod.categoria;
                    document.getElementById('form-campo3').value = prod.precio;
                    document.getElementById('form-campo4').value = prod.imagen;
                    document.getElementById('form-campo5').value = prod.descripcion;
                    ocultarFormularios();
                    formProductos.classList.remove('oculto');
                }
            });
        });
    }

    renderizarPedidos();
    renderizarUsuarios();
    renderizarProductos();

    var btnNuevoProd = document.getElementById('btn-nuevo-producto');
    if (btnNuevoProd) {
        btnNuevoProd.addEventListener('click', function() {
            document.getElementById('form-titulo').textContent = 'Nuevo Producto';
            document.getElementById('form-id').value = '';
            document.getElementById('form-campo1').value = '';
            document.getElementById('form-campo2').value = '';
            document.getElementById('form-campo3').value = '';
            document.getElementById('form-campo4').value = '';
            document.getElementById('form-campo5').value = '';
            ocultarFormularios();
            formProductos.classList.remove('oculto');
        });
    }

    var btnNuevoUser = document.getElementById('btn-nuevo-usuario');
    if (btnNuevoUser) {
        btnNuevoUser.addEventListener('click', function() {
            document.getElementById('form-titulo-user').textContent = 'Nuevo Usuario';
            document.getElementById('form-user-id').value = 'USR' + Date.now();
            document.getElementById('form-user-nombre').value = '';
            document.getElementById('form-user-apellido').value = '';
            document.getElementById('form-user-correo').value = '';
            document.getElementById('form-user-pass').value = '';
            document.getElementById('form-user-tipo').value = 'cliente';
            ocultarFormularios();
            formUsuarios.classList.remove('oculto');
        });
    }

    document.getElementById('btn-cancelar-admin').addEventListener('click', ocultarFormularios);
    document.getElementById('btn-cancelar-user').addEventListener('click', ocultarFormularios);
    document.getElementById('btn-cancelar-pedido').addEventListener('click', ocultarFormularios);

    document.getElementById('btn-guardar-admin').addEventListener('click', function() {
        var id = document.getElementById('form-id').value;
        var titulo = document.getElementById('form-campo1').value.trim();
        var categoria = document.getElementById('form-campo2').value.trim();
        var precio = document.getElementById('form-campo3').value.trim();
        var imagen = document.getElementById('form-campo4').value.trim();
        var descripcion = document.getElementById('form-campo5').value.trim();

        if (!titulo || !precio) return;

        var prodData = {
            id: id,
            categoria: categoria,
            titulo: titulo,
            imagen: imagen,
            precio: precio,
            descripcion: descripcion,
            permiteMensaje: true
        };

        var lista = obtenerProductosLS();
        var existe = lista.find(function(p) { return p.id === id; });

        if (existe) {
            actualizarProducto(prodData);
        } else {
            guardarProducto(prodData);
        }

        ocultarFormularios();
        renderizarProductos();
    });

    document.getElementById('btn-guardar-user').addEventListener('click', function() {
        var id = document.getElementById('form-user-id').value;
        var nombre = document.getElementById('form-user-nombre').value.trim();
        var apellido = document.getElementById('form-user-apellido').value.trim();
        var correo = document.getElementById('form-user-correo').value.trim();
        var pass = document.getElementById('form-user-pass').value.trim();
        var tipo = document.getElementById('form-user-tipo').value.trim();

        if (!nombre || !correo || !pass) return;

        var lista = obtenerUsuarios();
        var existente = lista.find(function(u) { return u.id === id; });

        var userData = existente || {
            id: id,
            fechaNacimiento: '2000-01-01',
            direccion: { comuna: '', calle: '', numero: '' },
            codigoReferencia: '',
            fechaRegistro: new Date().toISOString().split('T')[0]
        };

        userData.nombre = nombre;
        userData.apellido = apellido;
        userData.correo = correo;
        userData.password = pass;
        userData.tipo = tipo;

        if (existente) {
            actualizarUsuario(userData);
        } else {
            guardarUsuario(userData);
        }

        ocultarFormularios();
        renderizarUsuarios();
    });

    document.getElementById('btn-guardar-pedido').addEventListener('click', function() {
        var id = document.getElementById('form-pedido-id').value;
        var fechaEnvio = document.getElementById('form-pedido-fechaenvio').value.trim();
        
        var ped = obtenerCompras().find(function(item) { return item.id === id; });
        if (ped) {
            ped.fechaEnvio = fechaEnvio;
            actualizarCompra(ped);
        }

        ocultarFormularios();
        renderizarPedidos();
    });
});