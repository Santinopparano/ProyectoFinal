let productosArray = JSON.parse(localStorage.getItem("productos")) || [];
const contenedor = document.getElementById('contenedorProductos');

//contador de carrito
const carritoNumero = document.getElementById("carritoNumero");
carritoNumero.textContent = productosArray.length;

const resumenCarrito = document.getElementById('resumenCarrito');
const formCompra = document.getElementById('formCompra');
const mensajeCompra = document.getElementById('mensajeCompra');

let productosCarrito = JSON.parse(localStorage.getItem('productos')) || [];

function mostrarResumen() {
    resumenCarrito.innerHTML = '';
    if (productosCarrito.length === 0) {
        resumenCarrito.innerHTML = '<p>No hay productos en el carrito.</p>';
        formCompra.style.display = 'none';
        return;
    }

    productosCarrito.forEach(producto => {
        const div = document.createElement('div');
        div.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - Precio: $${producto.precio}`;
        resumenCarrito.appendChild(div);
    });

    const total = productosCarrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
    const totalDiv = document.createElement('div');
    totalDiv.style.fontWeight = 'bold';
    totalDiv.style.marginTop = '10px';
    totalDiv.textContent = `Total: $${total}`;
    resumenCarrito.appendChild(totalDiv);
}

mostrarResumen();

formCompra.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log("Formulario enviado correctamente");

    // Validar los campos de tarjeta
    const tarjeta = formCompra.tarjeta.value;
    const vencimiento = formCompra.vencimiento.value;
    const codigo = formCompra.codigo.value;

    if (tarjeta.length !== 16 || vencimiento.length !== 5 || codigo.length !== 3) {
        alert('Por favor, completa correctamente los datos de la tarjeta.');
        return;
    }

    const datosUsuario = Object.fromEntries(new FormData(formCompra).entries());
    const total = productosCarrito.reduce((acc, p) => acc + (p.precio * p.cantidad), 0);

    // Crear el resumen en texto para el mail
    const resumen = productosCarrito.map(p => 
        `${p.nombre} (x${p.cantidad}) - $${p.precio * p.cantidad}`
    ).join('\n');

// 📩 Enviar email con EmailJS (usando tu plantilla con {{#orders}})
const templateParams = {
    nombre: datosUsuario.nombre,
    email: datosUsuario.email,
    cost: {
        total: total
    },
    orders: productosCarrito.map(p => ({
        name: p.nombre,
        units: p.cantidad,
        price: p.precio * p.cantidad
    }))
};

emailjs.send('service_aeu4bxt', 'template_rz13ofd', templateParams)
    .then(() => {
        console.log("Correo enviado correctamente");
    })
    .catch((error) => {
        console.error("Error al enviar el correo:", error);
    });

    // Mostrar mensaje de éxito
    Swal.fire({
        title: `¡Compra realizada con éxito, ${datosUsuario.nombre}!`,
        text: `Total abonado: $${total}`,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        draggable: true
    }).then(() => {
        localStorage.removeItem('productos');
        productosCarrito = [];
        mostrarResumen();
        formCompra.reset();
        window.location.href = '../index.html';
    });
});

