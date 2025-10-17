let productosArray = [];
const contenedor = document.getElementById('contenedorProductos');

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
            const productoExiste =productosArray.find( t => t.id === termo.id)
            if(productoExiste){
                productoExiste.cantidad += 1;
            }else{
            productosArray.push({id:termo.id, nombre:termo.nombre,precio:termo.precio,cantidad:1,imagen:termo.imagen})
            }
            cargarLocal();
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

