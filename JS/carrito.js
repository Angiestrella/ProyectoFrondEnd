// Este archivo se carga en las 5 páginas. Guarda el carrito en localStorage
// (una "caja" del navegador que no se borra al cambiar de página) para que
// lo que agregues en Productos siga ahí cuando entres a Carrito.

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
// en vez de duplicarlo.
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

// Dibuja la tabla del carrito. Solo hace algo si estamos en carrito.html
// (si el elemento "listaCarrito" no existe en la página, no hace nada).
function renderizarCarrito() {
  const contenedor = document.getElementById('listaCarrito');
  if (contenedor === null) {
    return;
  }

  const carrito = obtenerCarrito();
  const mensajeVacio = document.getElementById('carritoVacio');
  const resumen = document.getElementById('resumenCarrito');

  if (carrito.length === 0) {
    contenedor.innerHTML = '';
    mensajeVacio.classList.remove('d-none');
    resumen.classList.add('d-none');
    return;
  }

  mensajeVacio.classList.add('d-none');
  resumen.classList.remove('d-none');

  let filasHtml = '';
  let total = 0;

  for (let i = 0; i < carrito.length; i++) {
    const producto = carrito[i];
    const subtotal = producto.precio * producto.cantidad;
    total = total + subtotal;

    filasHtml = filasHtml + `
      <tr>
        <td>${producto.nombre}</td>
        <td class="text-center">
          <button class="btn btn-sm btn--cantidad" data-id="${producto.id}" data-delta="-1">−</button>
          <span class="mx-2">${producto.cantidad}</span>
          <button class="btn btn-sm btn--cantidad" data-id="${producto.id}" data-delta="1">+</button>
        </td>
        <td class="text-end">${formatearPrecio(subtotal)}</td>
        <td class="text-end">
          <button class="btn btn-sm btn--quitar" data-id="${producto.id}">Quitar</button>
        </td>
      </tr>
    `;
  }

  contenedor.innerHTML = filasHtml;
  document.getElementById('totalCarrito').textContent = formatearPrecio(total);

  // Los botones +, − y "Quitar" se acaban de crear, así que hay que
  // conectarles su evento de click recién ahora que ya existen en el DOM.
  const botonesCantidad = contenedor.querySelectorAll('.btn--cantidad');
  botonesCantidad.forEach((boton) => {
    boton.addEventListener('click', () => {
      cambiarCantidad(boton.dataset.id, Number(boton.dataset.delta));
    });
  });

  const botonesQuitar = contenedor.querySelectorAll('.btn--quitar');
  botonesQuitar.forEach((boton) => {
    boton.addEventListener('click', () => {
      quitarDelCarrito(boton.dataset.id);
    });
  });
}

// Punto de entrada: esto corre en cuanto el HTML de la página termina de cargar.
document.addEventListener('DOMContentLoaded', () => {
  actualizarContador();
  renderizarCarrito();

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

  const botonVaciar = document.getElementById('vaciarCarrito');
  if (botonVaciar !== null) {
    botonVaciar.addEventListener('click', vaciarCarrito);
  }
});
