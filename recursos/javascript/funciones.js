//Traer productos del json
export function renderizarProductos(_contenedor) {
    // Levantar y leer un Json
    // Asincronicidad

    // Solicito datos
    fetch('/recursos/datos/productos.json')
        // Espero y luego convierto a objeto JS
        .then((respuesta) => {
            return respuesta.json()
        }).then(objetoDatos => {
            renderizado(objetoDatos.productos, _contenedor)//Llamamos a los procedimientos
            asignarEventoBotones(objetoDatos.productos)
        })
}

//Renderizar productos del json
function renderizado(arregloProductos, contenedor) {
    let contenidoHTML = ''
    arregloProductos.forEach((producto) => {
        contenidoHTML += `<article class="contenido-productos">
                    <img src="${producto.imagen}" alt="" height="377" width="377 ">
                    <section>
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <a>
                            <button class="productos_boton" data-btn-carro data-id="${producto.id}">
                            Agregar al Presupuesto
                            </button>
                        </a>
                    </section>
                </article>      
        `
    })
    contenedor.innerHTML = contenidoHTML
}

export function asignarEventoBotones(productos) {
    // Inicializar el carrito con los datos de localStorage o un array vacío
    const productosEnCarro = JSON.parse(localStorage.getItem('carro')) || [];
    const botonesProductos = document.querySelectorAll('[data-btn-carro]');

    botonesProductos.forEach(boton => {
        boton.addEventListener('click', () => {
            const idProducto = parseInt(boton.dataset.id);

            // Verificar si el producto ya está en el carrito
            if (!productosEnCarro.includes(idProducto)) {
                productosEnCarro.push(idProducto);
                localStorage.setItem('carro', JSON.stringify(productosEnCarro));

                const contenedorCarro = document.getElementById("contenedor-carro");
                renderizarProductosCarro(productos, productosEnCarro, contenedorCarro);

                const contadorItems = document.getElementById('carro-cantidad-items');
                contadorItems.textContent = productosEnCarro.length;
            } else {
                alert("Este producto ya está en el carrito.");
                const contenedorCarro = document.getElementById("contenedor-carro");
                renderizarProductosCarro(productos, productosEnCarro, contenedorCarro);
                const contadorItems = document.getElementById('carro-cantidad-items');
                contadorItems.textContent = productosEnCarro.length;
            }
        });
    });
}

export function renderizarProductosCarro(_productos, _productosCarro, _contenedor) {
    // Filtrar arreglo original con el arreglo de los ID
    const productosAgregados = _productos.filter((productoActual) => {
        return _productosCarro.includes(productoActual.id);
    })
    // Variable vacia que contendra el HTML (formato string)
    let contenidoHTML = ''
    productosAgregados.forEach((producto) => {
        contenidoHTML += `
         <article>
            <ul>
                <li class="li-nombre">${producto.nombre}</li>
                <li class="li-categoria">${producto.categoria}</li>              
            </ul>
                <button class="eliminar-producto" data-id="${producto.id}">
                    <img src="recursos/imagenes/catalogo/eliminar.png" alt="Eliminar" height="21" width="21">
                </button>  
        </article>
        `
    })
    // Insertamos el contenido en el contenedor
    _contenedor.innerHTML = contenidoHTML

    eliminarProductoCarro(_productos, _productosCarro, _contenedor);
}

function eliminarProductoCarro(_productos, _productosCarro, _contenedor) {
    // Asignar eventos de eliminación
    const botonesEliminar = document.querySelectorAll('.eliminar-producto');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', () => {
            const idProducto = parseInt(boton.dataset.id);
            const index = _productosCarro.indexOf(idProducto);
            if (index > -1) {
                _productosCarro.splice(index, 1);
                localStorage.setItem('carro', JSON.stringify(_productosCarro));

                renderizarProductosCarro(_productos, _productosCarro, _contenedor);

                const contadorItems = document.getElementById('carro-cantidad-items');
                contadorItems.textContent = _productosCarro.length;
            }
        });
    });
}

export function cargarCarroEnMemoria() {
    document.addEventListener("DOMContentLoaded", () => {
        // Obtén el contenedor del carrito
        const contenedorCarro = document.getElementById("contenedor-carro");

        // Carga el carrito desde el localStorage o inicializa un array vacío si no hay nada
        const productosEnCarro = JSON.parse(localStorage.getItem('carro')) || [];

        // Llama a renderizarProductosCarro para mostrar los productos en el carrito
        fetch('/recursos/datos/productos.json')
            .then((respuesta) => respuesta.json())
            .then((objetoDatos) => {
                renderizarProductosCarro(objetoDatos.productos, productosEnCarro, contenedorCarro);

                // Actualiza el contador de cantidad de items en el carrito
                const contadorItems = document.getElementById('carro-cantidad-items');
                contadorItems.textContent = productosEnCarro.length;
            });
    });
}
//Escuchamos al menu desplegable
document.querySelector('.menu-icon').addEventListener('click', toggleMenu);
//abrimos/cerramos el menu desplegable
export function toggleMenu() {
    const menu = document.querySelector('.menu');
    const menuIcon = document.querySelector('.menu-icon');

    menu.classList.toggle("hidden");
    menu.classList.toggle("show");
}

export function abrirCerrarPopUp(botonAbrirPopup) {
    botonAbrirPopup.addEventListener("click", () => { // Le agregamos un procedimiento al evento de click en el boton
        const popupCarro = document.getElementById('popup-carro') // Referenciamos el pop-up o dialog 
        if (popupCarro.open) {
            popupCarro.close()
        } else {
            popupCarro.showModal()
        }
    })
}

//FILTRO BARRA  

export function barraFiltro() {

    const campoFiltro = document.getElementById("select-categoria")//Cambiar
    const botonBuscar = document.getElementById("btn-buscar")
    const contProductos = document.getElementById("contenedorProductos");

    // Verifica que el contenedor de productos exista
    if (!contProductos) {
        console.error("El contenedor con ID 'contProductos' no existe en el DOM.");
        return;
    }

    botonBuscar.addEventListener('click', () => {
        fetch('/recursos/datos/productos.json')
            // Espero y luego convierto a objeto JS
            .then((respuesta) => {
                return respuesta.json()
            }).then(objetoDatos => {
                    const productosFiltrados = objetoDatos.productos.filter((producto) => {
                    const nombreMinusculas = producto.categoria.toLowerCase()
                    const textoMinusculas = campoFiltro.value.toLowerCase()

                    return nombreMinusculas.includes(textoMinusculas)
                })

                let contenidoFiltradoHTML = ''
                productosFiltrados.forEach((producto) => {
                    contenidoFiltradoHTML +=
                        `<article class="contenido-productos">
                    <img src="${producto.imagen}" alt="" height="377" width="377 ">
                    <section>
                        <h2>${producto.nombre}</h2>
                        <p>${producto.descripcion}</p>
                        <a>
                            <button class="productos_boton" data-btn-carro data-id="${producto.id}">
                            Agregar al Presupuesto
                            </button>
                        </a>
                    </section>
                </article>`;
                });
                contProductos.innerHTML = contenidoFiltradoHTML
                asignarEventoBotones(objetoDatos.productos)
            })
            .catch(error =>{
                console.error("Error al cargar el archvo JSON:", error);
            })
    })
}













