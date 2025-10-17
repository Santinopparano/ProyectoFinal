const contenedor = document.getElementById('contenedorProductos');
let productosCarrito = JSON.parse(localStorage.getItem("productos"))
console.log(productosCarrito);
productosCarrito.forEach(termo => {
    
        let div = document.createElement('div')
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${termo.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
        <h3 class="card-title">${termo.nombre}</h3>
        <p class="card-text">Total: $${termo.precio * termo.cantidad}</p>
        <button class="btn btn-primary">+</button>
        <span>${termo.cantidad}</span>
        <button class="btn btn-primary">-</button> 
         </div>
         </div> `;
         contenedor.appendChild(div);
});


