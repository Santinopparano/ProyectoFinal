
const logueado = localStorage.getItem("logueado");
// verif si no esta logueado 
if (logueado !== "true") {
  
  window.location.href = "/login/login.html";
}
let productosArray = JSON.parse(localStorage.getItem("productos")) || [];
const contenedor = document.getElementById('contenedorProductos');

//contador de carrito
const carritoNumero = document.getElementById("carritoNumero");
carritoNumero.textContent = productosArray.length;


fetch('termos.json')
.then((response)=>response.json())
.then(termos => {
    termos.forEach(termo => {
        let div = document.createElement('div')
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
        <img src="${termo.imagen}" class="card-img-top" alt="...">
        <div class="card-body">
        <h3 class="card-title">${termo.nombre}</h3>
        <p class="card-text">$${termo.precio}</p>
        <button id = "boton" class="btn btn-primary">Agregar al carrito</button> 
         </div>
         </div> `

         let boton = div.querySelector('.btn-primary')
         boton.addEventListener("click",() => {
            const productoExiste = productosArray.find( t => t.id === termo.id)
            if(productoExiste){
                productoExiste.cantidad += 1;
            }else{
            productosArray.push({id:termo.id, nombre:termo.nombre,precio:termo.precio,cantidad:1,imagen:termo.imagen})
            }
            
            cargarLocal();
            carritoNumero.textContent = productosArray.length;
             Toastify({
                text: "Producto agregado a tu carrito!",
                duration: 2000
            }).showToast();
        })
        contenedor.appendChild(div);

        
        
    }) 
})

.catch(error => {
    console.error('Error:', error);
});

function cargarLocal(){
    localStorage.setItem("productos",JSON.stringify(productosArray))
}

