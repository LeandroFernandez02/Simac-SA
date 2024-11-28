//Importamos la funcion renderizar
import { renderizarProductos, renderizarProductosCarro,asignarEventoBotones } from "./funciones.js";

//Referenciamos contenedor
const contProductos = document.getElementById('contenedorProductos')

//Invocamos Funcion renderizar
renderizarProductos(contProductos)

// Referenciamos el elemento boton abrir popup
const botonAbrirPopup = document.getElementById('abrir-popup-carro')

botonAbrirPopup.addEventListener("click", () => {
    const popupCarro = document.getElementById('popup-carro')
    if(popupCarro.open){
        popupCarro.close()
    }else{
        popupCarro.showModal()
    }
})

// Poner a escuchar los botones de los productos "Agregar carrito"
const productosEnCarro = []
const botonesProductos = document.querySelectorAll('[data-btn-carro]')

botonesProductos.forEach(boton => {
    // console.log(boton)
    boton.addEventListener('click',()=>{
        const idProducto = parseInt(boton.dataset.id)
        // const produtoElegido = {
        //     id: idProducto,
        //     cantidad: 1
        // }
        // console.log(idProducto)
        // Arreglo
        // productosEnCarro.push(produtoElegido)
        productosEnCarro.push(idProducto)
        // console.log(productosEnCarro)

        // Renderizar el carro
        const contenedorCarro = document.getElementById("contenedor-carro")
        renderizarProductosCarro(productos, productosEnCarro, contenedorCarro)

        // Renderizar el contador cantidad
        // Referenciar el contenedor cantidad items (span)
        const contadorItems = document.getElementById('carro-cantidad-items')
        contadorItems.textContent = productosEnCarro.length
    })
})





//FILTRO
const campoFiltro = document.getElementById("select-categoria")//Cambiar
const botonBuscar = document.getElementById("btn-buscar")

botonBuscar.addEventListener('click', () => {
    fetch('/recursos/datos/productos.json')
        // Espero y luego convierto a objeto JS
        .then((respuesta) => {
            //console.log(respuesta)
            return respuesta.json()
        }).then(objetoDatos => {

            
            console.log(objetoDatos.productos)
            
            console.log(campoFiltro.value)
            const productosFiltrados = objetoDatos.productos.filter((producto) => {
                const nombreMinusculas = producto.categoria.toLowerCase()//cambiar
                const textoMinusculas = campoFiltro.value.toLowerCase()//Cambiar

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
                </article>
                    `
            })
            contProductos.innerHTML = contenidoFiltradoHTML
            asignarEventoBotones(objetoDatos.productos)
            
        })
})


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