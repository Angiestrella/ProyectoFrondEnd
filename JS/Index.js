// Menú hamburguesa para pantallas pequeñas
const botonMenu = document.getElementById('menu-toggle');
const nav = document.getElementById('nav');

botonMenu.addEventListener('click', () => {
  const abierto = nav.classList.toggle('activa');
  botonMenu.setAttribute('aria-expanded', abierto);
});
