let productosArray = [];

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
            console.log(`Producto Agregado: ${termo.nombre}`)
         })
        document.body.appendChild(div);
        
        
    }) 
})

.catch(error => {
    console.error('Error:', error);
});



//1.crear el array vacio, y cada vez que agregue algo(push)
//2.despues del push, setItem
//3.
/* 
document.getElementById('boton')[0].addEventListener(() => {
            productosArray.push(`id:${div.id}, nombre:${div.nombre},precio: ${div.precio} `)
            cargarLocal();

        })
function cargarLocal(){
    localStorage.setItem("productos",JSON.stringify(productosArray))
}
    */
   