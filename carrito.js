const contenedor = document.getElementById('contenedorProductos');
let productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

//contador de carrito
const carritoNumero = document.getElementById("carritoNumero");
carritoNumero.textContent = productosCarrito.length;

productosCarrito.forEach((termo, index) => {
let div = document.createElement('div')
div.innerHTML = `
    <div class="card" style="width: 18rem;">
      <img src="${termo.imagen}" class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title">${termo.nombre}</h3>
        <p id="subtotal-${index}" class="card-text">Total: $${termo.precio * termo.cantidad}</p>
        <button id="sumar-${index}" class="btn btn-primary">+</button>
        <span id="cantidad-${index}">${termo.cantidad}</span>
        <button id="restar-${index}" class="btn btn-primary">-</button> 
      </div>
    </div>`;
  
  contenedor.appendChild(div);

  // Botones
  const btnSumar = document.getElementById(`sumar-${index}`);
  const btnRestar = document.getElementById(`restar-${index}`);
  const spanCantidad = document.getElementById(`cantidad-${index}`);
  const pSubtotal = document.getElementById(`subtotal-${index}`);

  btnSumar.addEventListener('click', () => {
    termo.cantidad++;
    actualizarVistaYLocalStorage();
  });

  btnRestar.addEventListener('click', () => {
    if (termo.cantidad > 1) {
      termo.cantidad--;
    } else {
      productosCarrito.splice(index, 1);
      div.remove(); // elimina la card
    }
    actualizarVistaYLocalStorage();
    
  });
  const btnVaciar = document.getElementById("vaciarCarrito");

btnVaciar.addEventListener("click", () => {


    // Vaciar array y localStorage
    productosCarrito = [];
    localStorage.removeItem("productos"); // o localStorage.setItem("productos", "[]");

    // Limpiar el contenedor de productos
    contenedor.innerHTML = "";

    // Actualizar contador
    carritoNumero.textContent = 0;
});



  function actualizarVistaYLocalStorage() {
    // actualizar localStorage
    localStorage.setItem("productos", JSON.stringify(productosCarrito));
    carritoNumero.textContent = productosCarrito.length;
    // refrescar cantidad y total
    if (document.body.contains(spanCantidad)) {
      spanCantidad.textContent = termo.cantidad;
      pSubtotal.textContent = `Total: $${termo.precio * termo.cantidad}`;
    }
  }

});
/*
  Swal.fire({
    title: "Estas seguro que quieres eliminar el carrito?",
    text: "No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, vaciar el carrito!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Carrito Vacio!",
        text: "Sus productos han sido eliminados",
        icon: "success"
      });
    }
  });
*/