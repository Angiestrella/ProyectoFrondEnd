// JS exclusivo de Inicio (index.html): conecta los botones "Agregar al
// carrito" del destacado de "La Bendición" y de la vitrina de productos.
// Usa agregarAlCarrito(), definida en JS/global.js, que se carga antes que
// este archivo.

document.addEventListener('DOMContentLoaded', () => {
  const botonesAgregar = document.querySelectorAll('.agregar-carrito');

  botonesAgregar.forEach((boton) => {
    boton.addEventListener('click', () => {
      agregarAlCarrito(boton.dataset.id, boton.dataset.nombre, Number(boton.dataset.precio));
      boton.textContent = 'Agregado ✓';
      setTimeout(() => {
        boton.textContent = 'Agregar al carrito';
      }, 1000);
    });
  });
});
