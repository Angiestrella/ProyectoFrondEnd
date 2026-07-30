// Este archivo se carga en las 3 páginas: es el "motor" del carrito, la
// parte que necesitan compartir todas (leer/guardar los datos en el
// navegador y mantener actualizado el numerito del carrito en la navbar).
// Cada página tiene ADEMÁS su propio JS (inicio.js, productos.js o
// carrito.js) con lo que le pertenece solo a ella — el mismo patrón que ya
// usamos en CSS: global.css + un CSS por página. Este archivo se carga
// PRIMERO en el HTML, para que las funciones de aquí ya existan cuando el
// JS de cada página las use.

const CLAVE_CARRITO = 'carritoFresasBlessd';

// Lee el carrito guardado. Si todavía no hay nada guardado, devuelve un array vacío.
function obtenerCarrito() {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  if (guardado === null) {
    return [];
  }
  return JSON.parse(guardado);
}

// Guarda el carrito (un array de productos) en localStorage.
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// Convierte un número como 12000 en el texto "$12.000"
function formatearPrecio(precio) {
  return '$' + precio.toLocaleString('es-CO');
}

// Actualiza el numerito rojo del carrito en la navbar, en TODAS las páginas.
function actualizarContador() {
  const carrito = obtenerCarrito();
  let totalUnidades = 0;

  carrito.forEach((producto) => {
    totalUnidades = totalUnidades + producto.cantidad;
  });

  const contador = document.getElementById('contadorCarrito');
  if (contador === null) {
    return;
  }

  contador.textContent = totalUnidades;
  contador.classList.toggle('d-none', totalUnidades === 0);
}

// Agrega un producto al carrito. Si ya estaba, le suma 1 a la cantidad
// en vez de duplicarlo. La usan inicio.js y productos.js.
function agregarAlCarrito(id, nombre, precio) {
  const carrito = obtenerCarrito();
  let yaExiste = false;

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      carrito[i].cantidad = carrito[i].cantidad + 1;
      yaExiste = true;
    }
  }

  if (!yaExiste) {
    carrito.push({ id: id, nombre: nombre, precio: precio, cantidad: 1 });
  }

  guardarCarrito(carrito);
  actualizarContador();
}

// Suma o resta 1 a la cantidad de un producto (delta es 1 o -1).
// Si la cantidad llega a 0, el producto se quita del carrito.
// Al final llama a renderizarCarrito(), una función que vive en
// JS/carrito.js: solo existe cuando estamos en carrito.html, que es el
// único lugar desde donde se puede llamar a cambiarCantidad (los botones
// +/- solo existen ahí).
function cambiarCantidad(id, delta) {
  const carrito = obtenerCarrito();

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id === id) {
      carrito[i].cantidad = carrito[i].cantidad + delta;
    }
  }

  const carritoFiltrado = [];
  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].cantidad > 0) {
      carritoFiltrado.push(carrito[i]);
    }
  }

  guardarCarrito(carritoFiltrado);
  renderizarCarrito();
  actualizarContador();
}

// Quita un producto del carrito por completo, sin importar la cantidad.
function quitarDelCarrito(id) {
  const carrito = obtenerCarrito();
  const carritoFiltrado = [];

  for (let i = 0; i < carrito.length; i++) {
    if (carrito[i].id !== id) {
      carritoFiltrado.push(carrito[i]);
    }
  }

  guardarCarrito(carritoFiltrado);
  renderizarCarrito();
  actualizarContador();
}

// Deja el carrito completamente vacío.
function vaciarCarrito() {
  guardarCarrito([]);
  renderizarCarrito();
  actualizarContador();
}

// Esto corre en las 3 páginas en cuanto el HTML termina de cargar.
document.addEventListener('DOMContentLoaded', () => {
  actualizarContador();
});
