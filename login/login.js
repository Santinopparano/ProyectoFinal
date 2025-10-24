// Obtenemos referencias a los elementos del DOM
const loginForm = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

// Credenciales correctas (para efectos del ejemplo)
const USER = 'admin';
const PASS = '12345';

// Agregamos un evento al formulario para manejar el envío
loginForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Previene el envío del formulario

  // Obtenemos los valores ingresados por el usuario
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Validamos las credenciales
  if (username === USER && password === PASS) {
    localStorage.setItem("logueado", "true");// // Guardamos el estado de login ------------
    // Si son correctas, redirigimos o mostramos un mensaje
    errorMessage.style.color = 'green';
    errorMessage.textContent = '¡Inicio de sesión exitoso!';
    setTimeout(() => {
  window.location.href = '../index.html';
}, 1000);
    // Redireccionar a otra página (descomentar para usar)
    // window.location.href = 'dashboard.html';
  } else {
    // Si son incorrectas, mostramos un mensaje de error
    errorMessage.style.color = 'red';
    errorMessage.textContent = 'Usuario o contraseña incorrectos.';
  }

  // Limpiamos los campos del formulario
  loginForm.reset();
});