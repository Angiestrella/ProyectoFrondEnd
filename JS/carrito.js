// JS exclusivo del Carrito (carrito.html): dibuja la tabla con los
// productos guardados y conecta los botones de cantidad, quitar y vaciar.
// Usa obtenerCarrito(), cambiarCantidad(), quitarDelCarrito(), vaciarCarrito()
// y formatearPrecio(), todas definidas en JS/global.js, que se carga antes
// que este archivo.

// Dibuja la tabla del carrito a partir de lo guardado en localStorage.
// (No hace falta comprobar si "listaCarrito" existe: este archivo solo se
// carga en carrito.html, así que ese elemento siempre está ahí.)
function renderizarCarrito() {
  const contenedor = document.getElementById('listaCarrito');
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

document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrito();

  const botonVaciar = document.getElementById('vaciarCarrito');
  if (botonVaciar !== null) {
    botonVaciar.addEventListener('click', vaciarCarrito);
  }
});
