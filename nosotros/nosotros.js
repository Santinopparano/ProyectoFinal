let productosArray = JSON.parse(localStorage.getItem("productos")) || [];
const contenedor = document.getElementById('contenedorProductos');

//contador de carrito
const carritoNumero = document.getElementById("carritoNumero");
carritoNumero.textContent = productosArray.length;