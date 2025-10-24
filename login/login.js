
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

// DATOS PARA EL LOGIN -----
const USER = 'admin';
const PASS = '12345';

// Agregamos un evento al formulario para manejar el envío
loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); 

  //valores ingresados por el usuario
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Validamos las credenciales
  if (username === USER && password === PASS) {
    localStorage.setItem("logueado", "true");// //guardo el estado de login ------------
    //si son correctas, redirigimos o mostramos un mensaje
    errorMessage.style.color = 'green';
    errorMessage.textContent = '¡Inicio de sesión exitoso!';
    setTimeout(() => {
  window.location.href = '../index.html';
}, 1000);
 
  } else {
    //si son incorrectas, mostramos un mensaje de error
    errorMessage.style.color = 'red';
    errorMessage.textContent = 'Usuario o contraseña incorrectos.';
  }

  // Limpiamos los datos del formulario
  loginForm.reset();
});