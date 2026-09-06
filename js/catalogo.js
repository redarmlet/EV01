document.addEventListener('DOMContentLoaded', function() {
    const section = document.getElementById("productos");
    const filtrosContenedor = document.getElementById("filtros-categoria");

    if (section) {
        var listaProductos = obtenerProductosLS();
        const categorias = [...new Set(listaProductos.map(function(p) { return p.categoria; }))];
        var categoriasActivas = new Set();
        var verTodoActivo = true;
        var checkboxesCategoria = [];
        var modalMensajeElem = document.getElementById("modal-mensaje");
        var modalMensajeInstancia = modalMensajeElem ? M.Modal.init(modalMensajeElem) : null;
        var productoParaModal = null;

        function abrirModalMensaje(producto) {
            productoParaModal = producto;
            document.getElementById("modal-mensaje-texto").value = "";
            modalMensajeInstancia.open();
        }

        var botonModalAgregar = document.getElementById("modal-mensaje-agregar");
        if (botonModalAgregar) {
            botonModalAgregar.addEventListener("click", function() {
                var mensaje = document.getElementById("modal-mensaje-texto").value.trim();
                guardar(productoParaModal, 1, mensaje);
                M.toast({html: productoParaModal.titulo + " agregado al carro"});
                modalMensajeInstancia.close();
            });
        }

        function crearFiltros() {
            const labelTodo = document.createElement("label");
            labelTodo.className = "filtro-categoria filtro-ver-todo";
            const checkTodo = document.createElement("input");
            checkTodo.type = "checkbox";
            checkTodo.checked = true;
            const spanTodo = document.createElement("span");
            spanTodo.textContent = "Ver Todo";
            
            checkTodo.addEventListener("change", function() {
                if (checkTodo.checked) {
                    verTodoActivo = true;
                    categoriasActivas.clear();
                    checkboxesCategoria.forEach(function(chk) { chk.checked = false; });
                } else {
                    verTodoActivo = false;
                }
                dibujarProductos();
            });
            
            labelTodo.appendChild(checkTodo);
            labelTodo.appendChild(spanTodo);
            filtrosContenedor.appendChild(labelTodo);

            categorias.forEach(function(categoria) {
                const label = document.createElement("label");
                label.className = "filtro-categoria";
                const input = document.createElement("input");
                input.type = "checkbox";
                input.checked = false;
                input.value = categoria;
                const span = document.createElement("span");
                span.textContent = NOMBRES_CATEGORIA[categoria] || categoria;
                
                input.addEventListener("change", function() {
                    if (input.checked) {
                        categoriasActivas.add(categoria);
                        verTodoActivo = false;
                        checkTodo.checked = false;
                    } else {
                        categoriasActivas.delete(categoria);
                    }
                    dibujarProductos();
                });
                
                checkboxesCategoria.push(input);
                label.appendChild(input);
                label.appendChild(span);
                filtrosContenedor.appendChild(label);
            });
        }

        function dibujarProductos() {
            section.innerHTML = "";
            const contenedorCards = document.createElement("div");
            contenedorCards.className = "contenedor-cards";
            section.appendChild(contenedorCards);
            
            const visibles = verTodoActivo ? listaProductos : listaProductos.filter(function(p) {
                return categoriasActivas.has(p.categoria);
            });
            
            if (visibles.length === 0) {
                const vacio = document.createElement("p");
                vacio.className = "sin-resultados";
                vacio.textContent = "No hay productos para las categorías seleccionadas.";
                contenedorCards.appendChild(vacio);
                return;
            }
            
            for (const i of visibles) {
                const carta = document.createElement("div");
                carta.className = "carta";
                carta.addEventListener("click", function() {
                    window.location.href = "producto.html?id=" + i.id;
                });
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
                botonAgregarCarro.textContent = "  Agregar al carro";
                botonAgregarCarro.className = "btn";
                botonAgregarCarro.addEventListener("click", function(evento) {
                    evento.stopPropagation();
                    if (i.permiteMensaje) {
                        abrirModalMensaje(i);
                    } else {
                        guardar(i, 1, "");
                        M.toast({html: i.titulo + " agregado al carro"});
                    }
                });
                contendorBoton.appendChild(botonAgregarCarro);
            }
        }

        crearFiltros();
        dibujarProductos();
    }
});