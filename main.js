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
        <a href="#" class="btn btn-primary">Comprar ahora</a>
         </div>
</div>
        `
       
         document.body.appendChild(div);
    }) 
})

.catch(error => {
    console.error('Error:', error);
});

/*
  let div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML = `
        
        <img src = ${termo.imagen}>
        <h3> ${termo.nombre} </h3>
        <p> ${termo.precio} </p>
        `
         document.body.appendChild(div);
    }) 
*/