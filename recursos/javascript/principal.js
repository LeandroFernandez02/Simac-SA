// IMPORTAR FUNCIONES ********************************************************
import { renderizarProductos, renderizarProductosCarro,cargarCarroEnMemoria,abrirCerrarPopUp,barraFiltro } from "./funciones.js"; // Importamos funciones desde "funciones.js"


// RENDERIZAR PRODUCTOS *****************************************************
//Invocamos Funcion renderizar
const contProductos = document.getElementById('contenedorProductos') //Referenciamos el contenedor
renderizarProductos(contProductos) // Llamamos la funcion


// POP-UP *******************************************************************
// Abrir o cerrar el pop-up del carrito
const botonAbrirPopup = document.getElementById('abrir-popup-carro') // Referenciamos el elemento boton abrir popup
abrirCerrarPopUp(botonAbrirPopup); // LLamamos la funcion


// AÑADIR A CARRITO **********************************************************
// Poner a escuchar los botones de los productos "Agregar carrito"
const productosEnCarro = [] // Array de productos
const botonesProductos = document.querySelectorAll('[data-btn-carro]') // Referenciamos el boton del renderizado

botonesProductos.forEach(boton => {
    boton.addEventListener('click',()=>{ // Agregamos evento de click para el boton
        const idProducto = parseInt(boton.dataset.id) // Obtenemos el id de cada producto seleccionado

        productosEnCarro.push(idProducto) // Agregamos al array de productos el producto seleccionado por su id

        const contenedorCarro = document.getElementById("contenedor-carro") // Referenciamos el contenedor del carro
        renderizarProductosCarro(productosEnCarro, contenedorCarro) // Llamamos a la funcion para renderizar los productos en el carro      
        
        const contadorItems = document.getElementById('carro-cantidad-items') // Referenciar el contenedor cantidad items (span)
        contadorItems.textContent = productosEnCarro.length // Renderizar el contador cantidad
    })
})

// BARRA DE FILTRO ***********************************************************************************
// Filtra por los distintos productos del catalogo
barraFiltro(); // Llamamos la funcion

// CARRO EN MEMORIA ********************************************************
// Carga los productos en carro en la memoria local del usuario
cargarCarroEnMemoria(); // Llamamos la funcion