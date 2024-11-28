//Traer productos del json

export function renderizarProductos(_contenedor) {
    // Levantar y leer un Json
    // fetch('./recursos/datos/tienda.json')
    // fetch('../datos/tienda.json')
    // Asincronicidad

    // Solicito datos
    fetch('/recursos/datos/productos.json')
        // Espero y luego convierto a objeto JS
        .then((respuesta) => {
            //console.log(respuesta)
            return respuesta.json()
        }).then(objetoDatos => {
            // console.log(objetoDatos)
            // JSON.parse / JSON.stringify
            // Variable vacia q ue contendra el HTML (formato string)
            renderizado(objetoDatos.productos, _contenedor)
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
    const productosEnCarro = JSON.parse(localStorage.getItem('carro')) || [];//solucion error filtro
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
                //Solucion error filtro
                const contenedorCarro = document.getElementById("contenedor-carro");
                renderizarProductosCarro(productos, productosEnCarro, contenedorCarro);
                const contadorItems = document.getElementById('carro-cantidad-items');
                contadorItems.textContent = productosEnCarro.length;
            }
        });
    });
}

// export function asignarEventoBotones(productos) {
//     // botones
//     // Poner a escuchar los botones de los productos "Agregar carrito"
//     const productosEnCarro = []
//     const botonesProductos = document.querySelectorAll('[data-btn-carro]')

//     botonesProductos.forEach(boton => {
//         // console.log(boton)
//         boton.addEventListener('click', () => {
//             const idProducto = parseInt(boton.dataset.id)

//             // Verificar si el producto ya está en el carrito
//             if (!productosEnCarro.includes(idProducto)) {
//                 productosEnCarro.push(idProducto);
//                 localStorage.setItem('carro', JSON.stringify(productosEnCarro));

//                 const contenedorCarro = document.getElementById("contenedor-carro");
//                 renderizarProductosCarro(productos, productosEnCarro, contenedorCarro);

//                 const contadorItems = document.getElementById('carro-cantidad-items');
//                 contadorItems.textContent = productosEnCarro.length;
//             } else {
//                 alert("Este producto ya está en el carrito.");
//             }
//         })
//     })
// }

export function renderizarProductosCarro(_productos, _productosCarro, _contenedor) {
    // Filtrar arreglo original  con el arreglo de los ID
    const productosAgregados = _productos.filter((productoActual) => {
        return _productosCarro.includes(productoActual.id);
    })
    // Variable vacia q ue contendra el HTML (formato string)
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
    // Insertamos el contenido
    _contenedor.innerHTML = contenidoHTML

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













