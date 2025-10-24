const contenedor = document.getElementById('contenedorProductos');
let productosCarrito = JSON.parse(localStorage.getItem("productos")) || [];

// contador de carrito
const carritoNumero = document.getElementById("carritoNumero");
carritoNumero.textContent = productosCarrito.length;

// elementos de acción (fuera del forEach)
const btnVaciar = document.getElementById("vaciarCarrito");
const btnConfirmar = document.getElementById("confirmarCompra");
const totalCarrito = document.getElementById("totalCarrito");

// función para calcular y mostrar total
function actualizarTotal() {
  const total = productosCarrito.reduce((acc, termo) => acc + termo.precio * termo.cantidad, 0);
  totalCarrito.textContent = `Total: $${total}`;
}

// función para actualizar vista y localStorage
function actualizarVistaYLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productosCarrito));
  carritoNumero.textContent = productosCarrito.length;
  actualizarTotal();
}

// recorrer productos y crear tarjetas
productosCarrito.forEach((termo, index) => {
  let div = document.createElement('div');
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

  // botones individuales
  const btnSumar = document.getElementById(`sumar-${index}`);
  const btnRestar = document.getElementById(`restar-${index}`);
  const spanCantidad = document.getElementById(`cantidad-${index}`);
  const pSubtotal = document.getElementById(`subtotal-${index}`);

  btnSumar.addEventListener('click', () => {
    termo.cantidad++;
    spanCantidad.textContent = termo.cantidad;
    pSubtotal.textContent = `Total: $${termo.precio * termo.cantidad}`;
    actualizarVistaYLocalStorage();
  });

  btnRestar.addEventListener('click', () => {
    if (termo.cantidad > 1) {
      termo.cantidad--;
      spanCantidad.textContent = termo.cantidad;
      pSubtotal.textContent = `Total: $${termo.precio * termo.cantidad}`;
    } else {
      productosCarrito.splice(index, 1);
      div.remove();
    }
    actualizarVistaYLocalStorage();
  });
});

// botón vaciar carrito
btnVaciar.addEventListener("click", () => {
  Swal.fire({
    title: "¿Vaciar carrito?",
    text: "Se eliminarán todos los productos.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, vaciar carrito",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      productosCarrito = [];
      localStorage.removeItem("productos");
      contenedor.innerHTML = "";
      carritoNumero.textContent = 0;
      actualizarTotal();

      Swal.fire({
        title: "Carrito vaciado",
        text: "Se han eliminado todos los productos.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      });
    }
  });
});

// actualizar total al iniciar
actualizarTotal();


