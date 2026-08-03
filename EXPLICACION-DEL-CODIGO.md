# Explicación completa del proyecto "Fresas La Crespa x Blessd"

> Este documento explica **absolutamente todo** el código del proyecto: cada archivo, cada etiqueta, cada clase de CSS y cada línea de JavaScript. Está escrito para que lo puedan leer sin saber programar y, al terminar, puedan explicarle al profesor **por qué** existe cada cosa y **cómo** funciona.
>
> No son bobos: programar es puro vocabulario nuevo. Una vez se sabe qué significa cada palabra, el código dice exactamente lo que hace.

---

## Índice

1. [¿Qué es este proyecto y cómo está organizado?](#1-qué-es-este-proyecto-y-cómo-está-organizado)
2. [Conceptos base antes de leer código](#2-conceptos-base-antes-de-leer-código)
3. [HTML explicado completo](#3-html-explicado-completo)
4. [CSS explicado completo](#4-css-explicado-completo)
5. [JavaScript explicado línea por línea (global.js, inicio.js, productos.js, carrito.js)](#5-javascript-explicado-línea-por-línea-globaljs-iniciojs-productosjs-carritojs)
6. [Flujo completo: qué pasa cuando el usuario hace clic](#6-flujo-completo-qué-pasa-cuando-el-usuario-hace-clic)
7. [Glosario de términos](#7-glosario-de-términos)
8. [Posibles preguntas del profesor + respuestas](#8-posibles-preguntas-del-profesor--respuestas)

---

## 1. ¿Qué es este proyecto y cómo está organizado?

Es una página web (sitio de varias páginas) de una tienda ficticia de fresas con crema, con una temática de colaboración con el artista Blessd. Tiene **3 páginas HTML** conectadas entre sí, con un **carrito de compras que funciona de verdad** (se puede agregar productos, cambiar cantidades, quitar productos y ver el total).

Las carpetas del proyecto son:

```
ProyectoFrondEnd/
├── HTML/
│   ├── index.html        ← página de inicio
│   ├── productos.html    ← catálogo completo de productos
│   └── carrito.html      ← el carrito de compras
├── CSS/
│   ├── global.css        ← estilos que se repiten en TODAS las páginas
│   ├── inicio.css        ← estilos SOLO de index.html
│   ├── productos.css     ← estilos SOLO de productos.html
│   └── carrito.css       ← estilos SOLO de carrito.html
├── JS/
│   ├── global.js         ← el "motor" del carrito: se carga en las 3 páginas
│   ├── inicio.js         ← conecta los botones "Agregar al carrito" SOLO de index.html
│   ├── productos.js      ← conecta los botones "Agregar al carrito" SOLO de productos.html
│   └── carrito.js        ← dibuja la tabla y conecta sus botones, SOLO en carrito.html
└── IMG/
    ├── banner.png
    ├── bendicion.png
    ├── merengoblessd.png
    ├── clasica.png
    └── combobendito.png
```

**¿Por qué está separado así y no todo en un solo archivo gigante?**

Es una regla básica de organización en desarrollo web, y es justamente lo que un profesor de Desarrollo Front End espera ver:

- **HTML** = el **contenido y la estructura** (qué elementos hay: títulos, botones, imágenes, tablas).
- **CSS** = la **apariencia** (colores, tamaños, posiciones, tipografías).
- **JavaScript** = el **comportamiento** (qué pasa cuando el usuario hace clic, cómo se guardan datos, cómo se actualiza la pantalla sin recargar la página).

Esto se llama **separación de responsabilidades**: cada archivo tiene un único trabajo. Si mañana quieren cambiar el color rojo por morado, van al CSS y no tocan el HTML ni el JavaScript. Si quieren cambiar el texto de un botón, van al HTML y no tocan nada más.

Además, dentro del CSS hay una segunda separación: `global.css` tiene lo que se repite en todas las páginas (la barra de menú y el pie de página), y cada página tiene su propio archivo para lo que le pertenece solo a ella. Así evitan copiar y pegar el mismo estilo tres veces.

El JavaScript sigue **exactamente el mismo patrón**: `global.js` tiene el "motor" del carrito (guardar/leer datos, el numerito de la navbar), compartido por las 3 páginas, y cada página tiene su propio archivo (`inicio.js`, `productos.js` o `carrito.js`) con lo que solo a ella le pertenece — en vez de un único archivo gigante con `if` por todos lados para adivinar en qué página está corriendo.

---

## 2. Conceptos base antes de leer código

### 2.1 ¿Qué hace el navegador?

Cuando abren `index.html` en Chrome (o cualquier navegador), el navegador:

1. Lee el archivo HTML de arriba hacia abajo.
2. Cuando encuentra un `<link>` que apunta a un CSS, va y lo descarga/lee, y aplica esos estilos.
3. Cuando encuentra un `<script>`, descarga/lee ese JavaScript y lo ejecuta.
4. Con todo eso arma una estructura en memoria llamada **DOM** (Document Object Model): es como un árbol genealógico de todos los elementos de la página (el `<body>` es padre de `<header>`, `<main>` y `<footer>`; `<main>` es padre de las `<section>`, etc.).

El **JavaScript puede leer y modificar ese árbol (el DOM) en cualquier momento**, incluso después de que la página ya cargó. Por ejemplo, puede crear filas nuevas en una tabla, cambiar el texto de un botón, o mostrar/ocultar un bloque. Eso es exactamente lo que hacen los 4 archivos JS del proyecto.

### 2.2 Front end vs. back end (por qué no hay base de datos)

Este proyecto es **100% front end**: no hay un servidor propio, ni base de datos, ni backend. Todo corre **dentro del navegador del usuario**. Por eso el carrito no se guarda "en internet" ni en una base de datos: se guarda en una cajita especial que el navegador le da a cada página web, llamada `localStorage` (la explicamos a fondo en la sección 5).

### 2.3 ¿Qué es Bootstrap?

Bootstrap es una **librería de CSS y JavaScript ya hecha** que otras personas programaron y publicaron gratis para que cualquiera la use. Trae clases CSS con nombres como `row`, `col-lg-6`, `navbar`, `container`, `btn`, etc., que ya tienen estilos y comportamientos definidos (por ejemplo, el sistema de columnas responsive, o el menú hamburguesa que se abre en celular).

**¿Por qué se usa?** Para no tener que programar desde cero cosas que ya son un problema resuelto, como que la página se vea bien tanto en el celular como en el computador (esto se llama **diseño responsive**).

Se "instala" simplemente pegando un `<link>` (para el CSS) y un `<script>` (para el JavaScript) que apuntan a una **CDN** (un servidor externo que aloja el archivo). No hay que descargar nada a mano:

```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
...
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

Si el profesor pregunta *"¿por qué el link de Bootstrap va en el `<head>` y el script va casi al final del `<body>`?"*: el CSS se necesita **antes** de que el navegador empiece a pintar la página (por eso va en el `<head>`, se descarga primero). El JavaScript, en cambio, conviene cargarlo **al final**, después de todo el HTML, para que cuando el script se ejecute los elementos ya existan en el DOM y no falle buscando algo que aún no se ha cargado.

---

## 3. HTML explicado completo

Las 3 páginas comparten exactamente la misma estructura general. La explicamos una sola vez a fondo y luego solo señalamos lo que cambia en cada página.

### 3.1 El encabezado del documento (`<head>`)

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fresas La Crespa x Blessd — Inicio</title>
```

- `<!DOCTYPE html>`: le dice al navegador "este archivo es HTML5, la versión moderna del lenguaje". Siempre va en la primera línea. Sin esto, algunos navegadores interpretan la página en "modo raro" (quirks mode) y los estilos se pueden ver mal.
- `<html lang="es">`: la etiqueta raíz de todo el documento. `lang="es"` le dice al navegador y a los lectores de pantalla (accesibilidad) que el contenido está en español — por ejemplo, para que el corrector ortográfico o un traductor automático sepan qué idioma detectar.
- `<head>`: la sección que **no se ve** en la página, pero configura cosas: el título de la pestaña, las fuentes, los estilos, metadatos.
- `<meta charset="UTF-8">`: define la codificación de caracteres. Gracias a esto las tildes (á, é, í) y la "ñ" se muestran bien. Sin esto, a veces aparecen símbolos raros donde debería haber una tilde.
- `<meta name="viewport" ...>`: **esta línea es la que hace que el sitio sea responsive**. `width=device-width` le dice al navegador que use el ancho real del dispositivo (no simule un ancho de computador en el celular), e `initial-scale=1.0` dice que empiece sin zoom. Sin esta línea, en celular la página se vería como una versión de escritorio diminuta.
- `<title>`: el texto que aparece en la pestaña del navegador. Cada página tiene un título distinto (Inicio / Productos / Carrito) para que el usuario sepa en qué pestaña está si tiene varias abiertas.

```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

- Estas dos líneas cargan **Google Fonts**, un servicio gratuito de Google con tipografías. `preconnect` es una optimización: le avisa al navegador "en un momento vas a necesitar conectarte a este servidor", así ya deja la conexión medio lista y la fuente carga más rápido.
- Se cargan dos fuentes: **Anton** (una fuente gruesa tipo cartel, para los títulos "urbanos") y **Poppins** (una fuente redondeada más suave, para el texto normal). El `:wght@400;500;600;700` dice qué grosores (pesos) de Poppins se necesitan: normal (400), medio (500), semi-negrita (600) y negrita (700).

```html
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <link rel="stylesheet" href="../CSS/global.css">
  <link rel="stylesheet" href="../CSS/inicio.css">
```

- El orden de estos tres `<link>` **importa**. CSS se aplica de arriba hacia abajo, y si dos reglas compiten por el mismo elemento, gana la que está más abajo. Por eso Bootstrap va primero (los estilos "genéricos" de la librería), luego `global.css` (los estilos propios que se repiten siempre) y al final el CSS propio de la página (`inicio.css`, `productos.css` o `carrito.css` según el archivo). Así, si el proyecto necesita "pisar" algún estilo de Bootstrap, lo puede hacer porque va después.
- `../CSS/global.css`: el `../` significa "sube una carpeta". Como el HTML está dentro de la carpeta `HTML/`, tiene que subir un nivel y entrar a `CSS/` para encontrar el archivo. Esto es una **ruta relativa**.

### 3.2 La barra de navegación (navbar) — igual en las 3 páginas

```html
<header>
  <nav class="navbar navbar-expand-lg navbar-marca">
    <div class="container">
      <a class="navbar-brand" href="index.html">
        <span class="logo__fresas">Fresas La Crespa</span>
        <span class="logo__x">x</span>
        <span class="logo__blessd">BLESSD</span>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-lg-auto align-items-lg-center gap-3 gap-lg-4">
          <li class="nav-item"><a class="nav-link active" href="index.html">Inicio</a></li>
          <li class="nav-item"><a class="nav-link" href="productos.html">Productos</a></li>
          <li class="nav-item">
            <a class="nav-link nav-link--carrito" href="carrito.html">
              🛒 <span id="contadorCarrito" class="badge rounded-pill carrito__contador d-none">0</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</header>
```

Elemento por elemento:

- `<header>`: etiqueta **semántica** de HTML5. "Semántica" quiere decir que su nombre describe su significado, no solo su apariencia. Un `<header>` le dice al navegador (y a un lector de pantalla, y a Google) "esto es la cabecera de la página", en lugar de usar un `<div>` genérico que no dice nada sobre su contenido.
- `<nav>`: otra etiqueta semántica: "aquí hay navegación" (enlaces para moverse por el sitio).
- `class="navbar navbar-expand-lg navbar-marca"`: aquí hay **tres clases** puestas una al lado de la otra (separadas por espacio), y un elemento puede tener todas las que necesite:
  - `navbar`: clase de Bootstrap, aplica todo el comportamiento base de una barra de navegación.
  - `navbar-expand-lg`: le dice a Bootstrap "en pantallas grandes (`lg` = large, ≥992px) muestra el menú expandido en línea; en pantallas más chicas, conviértelo en menú hamburguesa". Ese es el mecanismo completo detrás del comportamiento responsive del menú.
  - `navbar-marca`: clase **propia** del proyecto (no es de Bootstrap), definida en `global.css`, para el fondo color crema, el efecto de vidrio esmerilado y que quede pegada arriba al hacer scroll.
- `<div class="container">`: clase de Bootstrap que centra el contenido y le pone un ancho máximo con márgenes a los lados, para que en pantallas muy anchas el contenido no quede pegado a los bordes de la ventana.
- `<a class="navbar-brand" href="index.html">`: el logo/nombre de la marca, que además es un link que devuelve a inicio. `navbar-brand` es la clase que Bootstrap espera para el logo dentro de una navbar.
- Los tres `<span>` (`logo__fresas`, `logo__x`, `logo__blessd`) están ahí para poder darle **un color y una fuente distinta a cada palabra del logo** ("Fresas La Crespa" en rojo cursiva, la "x" en gris, "BLESSD" en azul con la fuente urbana). Un `<span>` es una etiqueta genérica **en línea** (no salta de línea), se usa cuando se necesita "envolver" un pedacito de texto para darle estilo aparte, sin romper el flujo del párrafo/línea.

**El botón hamburguesa (menú en celular):**

```html
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
```

- `type="button"`: evita que, si algún día este botón quedara dentro de un `<form>`, se comporte como botón de "enviar formulario" por accidente. Es buena práctica ponerlo siempre en botones que no envían nada.
- `data-bs-toggle="collapse"` y `data-bs-target="#navbarNav"`: estos son **atributos de datos** (`data-*`) que **Bootstrap JS lee** para saber qué hacer. Le dicen: "cuando hagan clic en este botón, activa el comportamiento `collapse` (mostrar/ocultar) sobre el elemento cuyo `id` es `navbarNav`". El `#` antes de `navbarNav` es la misma sintaxis que en CSS para "seleccionar por id". Estos dos son los únicos atributos que hacen falta para que el botón funcione — no se agregaron atributos `aria-*` de accesibilidad porque no es algo que pida la rúbrica de esta entrega.
- El `<span class="navbar-toggler-icon">` de adentro es el ícono de las 3 rayitas (☰); ese ícono lo dibuja Bootstrap con CSS, la etiqueta solo es el "gancho" donde se dibuja.

**El menú de enlaces:**

```html
<div class="collapse navbar-collapse" id="navbarNav">
  <ul class="navbar-nav ms-lg-auto align-items-lg-center gap-3 gap-lg-4">
    <li class="nav-item"><a class="nav-link active" href="index.html">Inicio</a></li>
    ...
```

- `class="collapse navbar-collapse"`: `collapse` es la clase de Bootstrap que hace que el `<div>` empiece **oculto** y se pueda mostrar/ocultar con una animación; `navbar-collapse` es la que aplica el estilo específico para menús de navbar.
- `id="navbarNav"`: el `id` es un identificador **único** dentro de la página (a diferencia de `class`, que se puede repetir en muchos elementos). Sirve como "nombre propio" para que el botón hamburguesa (con `data-bs-target="#navbarNav"`) sepa exactamente a cuál elemento se refiere.
- `<ul>` / `<li>`: lista no ordenada / elemento de lista. Semánticamente, un menú de navegación **es** una lista de enlaces, así que se marca como tal aunque visualmente Bootstrap le quite las viñetas (bolitas) con CSS.
- `ms-lg-auto`: clase de utilidad de Bootstrap = "margin-start auto, solo desde el tamaño `lg` hacia arriba". Esto empuja el menú hacia la derecha en pantallas grandes (en celular, como está apilado, no hace falta).
- `gap-3 gap-lg-4`: separación entre los elementos del menú (más separación en pantallas grandes que en chicas).
- `class="nav-link active"`: `active` es la clase que marca visualmente cuál página es la actual (en `index.html` está en el link "Inicio"; en `productos.html` está en "Productos"; en `carrito.html` está en el ícono del carrito).
- El ícono 🛒 es un **emoji**, se usa directamente como texto, no como imagen. Al lado va: `<span id="contadorCarrito" class="badge rounded-pill carrito__contador d-none">0</span>`
  - `id="contadorCarrito"`: **este id es clave**, porque es el gancho que usa `global.js` para encontrar este elemento y escribir ahí el número de productos en el carrito (lo vemos a fondo en la sección 5).
  - `badge rounded-pill`: clases de Bootstrap para la forma de "pastillita" numerada.
  - `d-none`: clase de utilidad de Bootstrap que significa `display: none` (oculto). Empieza oculto porque al cargar la página el carrito puede estar vacío; `global.js` se lo quita cuando hay al menos un producto.

### 3.3 `index.html` — sección por sección

**El hero (la franja grande de arriba, dividida en dos mitades):**

```html
<section class="hero">
  <div class="row g-0 hero__fila">
    <div class="col-12 col-lg-6 hero__lado hero__lado--urbano">
      <p class="hero__pretitulo">BLESSD PRESENTA</p>
      <h1 class="hero__titulo">DURO EN LA CALLE</h1>
      <a href="productos.html" class="btn btn--urbano">Ver el menú</a>
    </div>
    <div class="col-12 col-lg-6 hero__lado hero__lado--dulce">
      ...
    </div>
  </div>
</section>
```

- `<section>`: etiqueta semántica para "un bloque de contenido con un tema propio" (a diferencia de `<div>`, que no dice nada sobre el contenido). Cada bloque grande de la página (hero, colab, bendición, vitrina) es una `<section>` distinta. Ninguna de estas secciones lleva un `id` porque ningún link del sitio salta a ellas con `href="#..."` — un `id` que nadie usa es código de más, así que se quitó (la única excepción es `id="colab"`, que sí recibe un salto real desde el botón "Conoce la colab" del hero).
- `class="row g-0 hero__fila"`: aquí está el **sistema de grillas (grid) de Bootstrap**, que es de las cosas más importantes para entender todo el proyecto:
  - `row`: define una **fila**. Dentro de una `row` siempre van elementos con clases `col-*`.
  - Bootstrap divide el ancho disponible en **12 columnas invisibles**. `col-12` significa "ocupa las 12 (o sea, el 100% del ancho, una columna sola por fila)". `col-lg-6` significa "desde el tamaño `lg` (≥992px) para arriba, ocupa solo 6 de las 12 (la mitad)".
  - **Por eso en celular las dos mitades del hero se ven una encima de la otra** (porque `col-12` = ancho completo cada una) **y en computador se ven lado a lado** (porque `col-lg-6` = mitad cada una). Esto es responsive sin escribir ni una sola media query a mano: lo resuelve Bootstrap solo con las clases.
  - `g-0`: "gutter 0", o sea sin espacio (padding) entre columnas — para que las dos mitades del hero queden totalmente pegadas, sin una franja blanca en el medio.
  - `hero__fila`: clase propia, define en CSS la altura y el fondo con la imagen (ver sección 4).
- `hero__lado--urbano` / `hero__lado--dulce`: son **modificadores** (lo explicamos en la sección de CSS, en "convención BEM"): la clase base `hero__lado` define el layout común de las dos mitades, y el modificador (`--urbano` o `--dulce`) cambia detalles específicos de cada una si hiciera falta.
- `<h1>`: título de nivel 1, el más importante de toda la página (para SEO y accesibilidad debería haber solo un `<h1>` real por página — aquí hay dos porque son dos "titulares" igual de protagonistas dentro del hero, una decisión de diseño más que estrictamente técnica).
- `<a href="productos.html" class="btn btn--urbano">Ver el menú</a>`: un link (`<a>`) que además tiene pinta de botón gracias a las clases CSS `btn` y `btn--urbano`. **Importante**: sigue siendo un `<a>` (un enlace de navegación, lleva a otra página), no un `<button>` (que ejecuta una acción con JavaScript sin cambiar de página). Se elige uno u otro según lo que realmente hace: si navega, `<a>`; si dispara una acción en la misma página (como "Agregar al carrito"), `<button>`.

**La sección "La Colab":**

```html
<section class="colab" id="colab">
  <div class="container">
    <span class="etiqueta">🍓 + 🎤 la mezcla</span>
    <h2 class="colab__titulo">¿Qué es esta colab?</h2>
    <p class="colab__texto">...</p>

    <div class="row g-4 text-start">
      <div class="col-12 col-md-6">
        <div class="colab__marca colab__marca--urbano">
          <h3 class="colab__marca-titulo">🎤 Blessd</h3>
          <p class="colab__marca-texto">...</p>
        </div>
      </div>
      <div class="col-12 col-md-6"> ... </div>
    </div>
  </div>
</section>
```

- `<h2>`, luego más abajo `<h3>`: los encabezados van en **orden jerárquico** (como un esquema/outline): `<h1>` es el título general de la página, `<h2>` los títulos de cada sección grande, `<h3>` subtítulos dentro de esa sección. No es solo estético: los lectores de pantalla y buscadores usan esa jerarquía para entender la estructura del contenido.
- `col-12 col-md-6`: igual que antes pero con el punto de quiebre `md` (≥768px, tabletas) en vez de `lg`. Aquí las dos tarjetas (Blessd / Fresas La Crespa) se apilan en celular y quedan lado a lado desde tablet en adelante.
- `g-4`: gutter (espacio) de nivel 4 entre columnas — al contrario del `g-0` del hero, aquí sí quieren separación visual entre las dos tarjetas.
- `text-start`: utilidad de Bootstrap = alinear el texto a la izquierda (se pone explícito porque el contenedor `.container` padre tiene `text-center` heredado de otra sección, así que aquí se "corrige" para este bloque).

**La sección producto estrella "La Bendición":**

```html
<section class="bendicion">
  <div class="container">
    <div class="row align-items-center g-5">
      <div class="col-12 col-lg-6">
        <img src="../IMG/bendicion.png" alt="Copa de fresas con crema y frutos rojos, La Bendición" class="bendicion__imagen">
      </div>
      <div class="col-12 col-lg-6">
        <span class="etiqueta">⭐ Producto estrella</span>
        <h2 class="bendicion__titulo">La Bendición</h2>
        <p class="bendicion__texto">...</p>
        <p class="bendicion__precio">$18.000</p>
        <button class="btn btn--dulce agregar-carrito" data-id="bendicion" data-nombre="La Bendición" data-precio="18000">Agregar al carrito</button>
      </div>
    </div>
  </div>
</section>
```

- `<img src="..." alt="...">`: la etiqueta de imagen. `src` (source) es la ruta del archivo. `alt` es el **texto alternativo**: lo que describe la imagen para (a) alguien con lector de pantalla, (b) si la imagen no carga, (c) buscadores como Google Imágenes. Nunca debe faltar, y debe describir lo que se ve, no repetir el nombre del archivo.
- `align-items-center`: utilidad de Bootstrap (flexbox) que centra verticalmente el contenido de la fila, para que la imagen y el bloque de texto queden alineados al centro aunque tengan alturas distintas.
- **El botón "Agregar al carrito" es la pieza más importante de todo el HTML para entender cómo funciona el carrito:**
  - `class="btn btn--dulce agregar-carrito"`: la clase `agregar-carrito` **no tiene ningún estilo CSS asociado**; es un "gancho" puramente para JavaScript. Tanto `inicio.js` como `productos.js` tienen una línea que busca **todos** los elementos con esta clase (`document.querySelectorAll('.agregar-carrito')`) y les conecta la función de agregar al carrito, cada uno en su propia página. Es una práctica común: usar una clase dedicada solo para "engancharse" desde JS, separada de las clases que dan estilo.
  - `data-id="bendicion"`, `data-nombre="La Bendición"`, `data-precio="18000"`: estos son **atributos de datos personalizados** (`data-*`). HTML permite inventar cualquier atributo que empiece por `data-` para guardar información propia del proyecto directamente en la etiqueta. Aquí se usa para que, **sin tener que escribir una lista de productos duplicada en JavaScript**, cada botón "sepa" qué producto representa. JavaScript los lee así: `boton.dataset.id`, `boton.dataset.nombre`, `boton.dataset.precio` (el atributo `data-nombre` se convierte automáticamente en `dataset.nombre`, `data-precio` en `dataset.precio`, etc. — ese es el mapeo automático que hace el navegador).
  - Este mismo patrón (`class="agregar-carrito"` + los tres `data-*`) se repite **en cada botón "Agregar al carrito"** de Inicio y Productos (en `carrito.html` no hay botones de este tipo, ahí los botones son de cantidad/quitar/vaciar). Por eso una sola función de JavaScript (`agregarAlCarrito`, en `global.js`) sirve para todos esos botones, sin importar cuántos productos haya.

**La vitrina (tarjetas de otros productos), en `index.html`:**

```html
<section class="vitrina">
  <div class="container">
    <h2 class="vitrina__titulo">También te va a gustar</h2>
    <div class="row g-4 text-start">
      <div class="col-12 col-md-6 col-lg-4">
        <article class="card producto h-100">
          <img src="../IMG/clasica.png" alt="Copa de fresas con crema clásica" class="producto__imagen">
          <div class="card-body">
            <h3 class="producto__nombre">Clásica con crema</h3>
            <p class="producto__precio">$12.000</p>
            <button class="btn btn--producto agregar-carrito" data-id="clasica" data-nombre="Clásica con crema" data-precio="12000">Agregar al carrito</button>
          </div>
        </article>
      </div>
      ... (2 tarjetas más, mismo patrón: Merengoblessd y Combo bendito)
    </div>
    <a href="productos.html" class="btn btn--nav mt-5">Ver todos los productos</a>
  </div>
</section>
```

- `<div class="container">` **sin** `text-center`: la sección `.vitrina` ya tiene `text-align: center` en su CSS (sección 4), y `text-align` es una propiedad que **se hereda** de padres a hijos en CSS. Como este `container` está dentro de `.vitrina`, ya queda centrado sin necesidad de repetir la clase — ponerla ahí sería una duplicación inútil que no cambia nada.
- `col-12 col-md-6 col-lg-4`: **tres puntos de quiebre en una sola clase combinada**: 1 columna por fila en celular, 2 columnas por fila en tablet (`md`, 6/12 = mitad), y 3 columnas por fila en escritorio (`lg`, 4/12 = un tercio). Así se arma la grilla de productos totalmente responsive.
- `<article class="card producto h-100">`: `<article>` es semántico: cada tarjeta de producto es contenido "autocontenido" que tendría sentido incluso si se sacara de aquí y se mostrara en otro lado (por ejemplo, en una red social). `card` es la clase de Bootstrap para tarjetas con borde/sombra; `producto` es la clase propia del proyecto que define su estilo particular; `h-100` es una utilidad de Bootstrap = "height: 100%", para que todas las tarjetas de una misma fila queden con la misma altura aunque el texto tenga largos distintos.
- `<img src="../IMG/clasica.png" ... class="producto__imagen">`: los 4 productos ya tienen foto real, así que las 4 tarjetas usan `<img>` (antes, mientras no había fotos de todos, los productos sin foto usaban un `<div>` vacío con un degradado de color de fondo como placeholder — ya no queda ninguno).
- `<h3 class="producto__nombre">` y `<p class="producto__precio">`, **sin** las clases `card-title`/`card-text` de Bootstrap: esas clases existen y se podrían usar, pero acá no aportan nada — `card-title` solo pone un `margin-bottom`, que ya se sobreescribe con el de `producto__nombre` (que se carga después); y `card-text` solo actúa si el elemento es el **último hijo** de su contenedor, y aquí no lo es (el botón va después). Como ninguna de las dos termina afectando nada visualmente, se quitaron: tener una clase que no hace nada es más confuso que no tenerla.

### 3.4 `productos.html` — qué cambia respecto a `index.html`

- El link "Productos" del menú tiene la clase `active` (en vez de "Inicio"), porque están parados en esta página.
- Tiene una sola `<section class="productos">` con **una grilla de 4 tarjetas**: "La Bendición", "Clásica con crema", "Merengoblessd" y "Combo bendito" (los mismos productos de la vitrina de inicio, más "La Bendición" que aquí también aparece como tarjeta, no solo en el destacado de inicio).
- La tarjeta de "La Bendición" tiene una clase extra `producto--estrella` y una etiqueta flotante `⭐ Estrella` (`producto__etiqueta-estrella`) para distinguirla visualmente de las demás.
- El resto del patrón (`<img>` con foto real + botón `agregar-carrito` + los 3 `data-*`) es idéntico al de `index.html`.

### 3.5 `carrito.html` — la página más distinta de las tres

Esta página **no muestra productos fijos escritos a mano**: su contenido central se genera dinámicamente con JavaScript, según lo que haya en el carrito en ese momento. Por eso el HTML aquí es más un "molde vacío" que JS llena.

```html
<section class="carrito">
  <div class="container">
    <h1 class="carrito__titulo">Tu carrito</h1>

    <div id="carritoVacio" class="carrito__vacio">
      <p>Tu carrito está vacío.</p>
      <a href="productos.html" class="btn btn--dulce mt-3">Ver productos</a>
    </div>

    <div id="resumenCarrito" class="d-none">
      <div class="table-responsive carrito__tabla mb-4">
        <table class="table align-middle mb-0">
          <thead>
            <tr>
              <th>Producto</th>
              <th class="text-center">Cantidad</th>
              <th class="text-end">Subtotal</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="listaCarrito"></tbody>
        </table>
      </div>

      <div class="row justify-content-end">
        <div class="col-12 col-md-5 col-lg-4">
          <div class="carrito__resumen text-center">
            <p>Total</p>
            <p class="carrito__total" id="totalCarrito">$0</p>
            <button id="vaciarCarrito" class="btn btn--vaciar w-100 mb-2">Vaciar carrito</button>
            <a href="productos.html" class="btn btn--dulce w-100">Seguir comprando</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
```

Puntos clave:

- Hay **dos bloques que se muestran de forma excluyente** (nunca los dos al tiempo): `#carritoVacio` (mensaje de "está vacío") y `#resumenCarrito` (la tabla con productos y el total). Cuál de los dos se ve depende de si hay o no productos, y **eso lo decide JavaScript** cambiando la clase `d-none` (mostrar/ocultar) de cada uno. Al cargar la página, `#resumenCarrito` ya arranca con `d-none` puesto en el HTML (por defecto se asume vacío) y JS lo corrige apenas sabe la verdad.
- `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`: son las etiquetas de **tablas HTML**. `<thead>` es el encabezado (nombres de columna: Producto, Cantidad, Subtotal), `<tbody>` es el cuerpo donde van las filas de datos reales. Aquí el `<tbody>` empieza **completamente vacío** en el HTML (`<tbody id="listaCarrito"></tbody>`) — es JavaScript quien construye cada `<tr>` (fila) con el nombre, cantidad, subtotal y botones de cada producto, y las inserta ahí. Por eso este `id="listaCarrito"` es otro gancho fundamental para el JS.
- `id="totalCarrito"`: el gancho donde JS escribe el precio total sumado.
- `id="vaciarCarrito"`: el botón que, al hacer clic, borra todo el carrito (JS le conecta el evento).
- `table-responsive`: clase de Bootstrap que agrega scroll horizontal a la tabla en pantallas angostas, para que no se rompa el diseño si la tabla es más ancha que el celular.

---

## 4. CSS explicado completo

### 4.1 La convención de nombres BEM (clave para entender TODAS las clases del proyecto)

Si se fijan, casi todas las clases propias del proyecto (no las de Bootstrap) siguen un patrón con guiones bajos dobles (`__`) y guiones medios dobles (`--`). Por ejemplo: `hero__lado--urbano`, `btn--dulce`, `carrito__total`. Esto se llama **BEM** (Block, Element, Modifier — Bloque, Elemento, Modificador), una convención muy usada en la industria para que, con solo leer el nombre de una clase, se sepa a qué pertenece:

- **Bloque**: el componente completo. Ej: `hero`, `producto`, `carrito`, `colab`.
- **Elemento** (`__`, doble guion bajo): una parte que **solo tiene sentido dentro de ese bloque**. Ej: `hero__titulo` (el título, pero específicamente el de dentro del hero), `producto__precio` (el precio, pero el de dentro de una tarjeta de producto).
- **Modificador** (`--`, doble guion medio): una **variación** de un bloque o elemento. Ej: `hero__lado--urbano` vs `hero__lado--dulce` (la misma "mitad del hero", pero con la variante urbana o la variante dulce); `btn--dulce` vs `btn--urbano` (mismo botón base, distinto color/estilo).

**¿Por qué usar esto en vez de nombres sueltos?** Evita choques de nombres entre secciones distintas (por ejemplo, `.producto__precio` de la vitrina de inicio no interfiere jamás con algo llamado solo `.precio` en otra parte) y hace que, leyendo el HTML, se entienda de inmediato la relación entre elementos sin tener que ir a mirar el CSS.

### 4.2 `:root` y las variables CSS — `global.css`

```css
:root {
  --azul-oscuro: #0b1b3f;
  --azul-blessd: #1e40d6;
  --azul-neon: #4fd1ff;
  --rojo-fresa: #e63950;
  --rosa-crema: #ffd1dc;
  --crema: #fff8f1;
  --blanco: #ffffff;
  --texto-oscuro: #1a1a1a;

  --fuente-urbana: 'Anton', sans-serif;
  --fuente-suave: 'Poppins', sans-serif;
}
```

- `:root` es un **selector CSS** que apunta al elemento raíz del documento (básicamente, el `<html>`). Se usa como el lugar convencional para declarar **variables CSS** (también llamadas *custom properties*).
- Cada línea `--nombre: valor;` define una variable. El doble guion medio al principio (`--`) es obligatorio, así es como CSS distingue "esto es una variable" de una propiedad normal.
- Después, en cualquier parte del CSS, se usan con `var(--nombre-de-la-variable)`. Por ejemplo `color: var(--rojo-fresa);` en vez de escribir `color: #e63950;` cada vez.
- **¿Por qué usar variables en vez de escribir el color directo cada vez?** Porque si mañana quieren cambiar el tono de rojo de toda la marca, lo cambian **en un solo lugar** (aquí, en `:root`) y se actualiza automáticamente en los más de 30 sitios del proyecto donde se usa ese color. Sin variables, tocaría buscar y reemplazar el color a mano en cada archivo CSS, con el riesgo de que quede alguno mal actualizado.
- También guardan las dos fuentes como variables (`--fuente-urbana`, `--fuente-suave`) por la misma razón: un solo lugar para decidir qué tipografía usa "lo urbano" (Anton) y qué tipografía usa "lo dulce" (Poppins).

### 4.3 El reset con `*`

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

- `*` es el **selector universal**: selecciona **todos** los elementos de la página, sin excepción.
- Cada navegador trae, por defecto, márgenes y rellenos distintos para etiquetas como `<h1>`, `<p>`, `<ul>`, etc. Esto pone todo en cero **a propósito**, como un lienzo en blanco, para que el diseño se vea igual en todos los navegadores y el equipo controle explícitamente cada espacio en vez de heredar valores impredecibles.
- `box-sizing: border-box`: cambia **cómo se calcula el tamaño de una caja**. Por defecto en CSS, si un elemento mide `width: 200px` y le agregan `padding: 20px`, termina midiendo 240px de ancho real (200 + 20 + 20), lo cual es confuso. Con `border-box`, el `padding` y el `border` se **descuentan de esos 200px** en vez de sumarse encima, así que el elemento mide exactamente 200px sin importar cuánto padding tenga. Esto hace que calcular tamaños (sobre todo en la grilla) sea mucho más predecible.

### 4.4 Estilos base del `<body>` y reutilizables

```css
body {
  font-family: var(--fuente-suave);
  color: var(--texto-oscuro);
  background-color: var(--crema);
  line-height: 1.6;
}
```
- Define la fuente, color de texto y fondo por defecto de **toda la página**, para no tener que repetirlo en cada elemento (los hijos heredan estas propiedades de texto automáticamente, es una de las pocas propiedades CSS que se heredan).
- `line-height: 1.6`: separación entre líneas de un párrafo (1.6 veces el tamaño de letra), para que los bloques de texto largo sean más fáciles de leer.

```css
img { max-width: 100%; display: block; }
a { text-decoration: none; color: inherit; }
ul { list-style: none; }
```
- `img { max-width: 100% }`: evita que una imagen se salga de su contenedor y rompa el diseño en pantallas angostas; la imagen nunca crece más allá del ancho disponible.
- `a { text-decoration: none }`: quita el subrayado azul por defecto de los links. `color: inherit`: hace que el link tome el color de texto de su elemento padre en vez del azul/morado por defecto del navegador (así los links se pueden re-estilizar libremente con otras clases).
- `ul { list-style: none }`: quita las viñetas (bolitas) por defecto de las listas, porque en este proyecto las listas (como el menú de navegación) se usan por su significado semántico, no porque se quieran ver como una lista con bolitas.

**La etiqueta "pill" reutilizable** (`⭐ Estrella`, `la mezcla`, etc.):

```css
.etiqueta {
  display: inline-block;
  background: var(--rosa-crema);
  color: var(--rojo-fresa);
  padding: 0.4rem 1.2rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.85rem;
  margin-bottom: 1.2rem;
}
```
- `display: inline-block`: se comporta como texto en línea (no ocupa la fila completa como un `<div>` normal) pero **sí acepta** ancho, alto, padding y márgenes verticales como una caja — lo mejor de los dos mundos, ideal para una "pastillita" de texto.
- `border-radius: 50px`: un radio de esquina tan grande que, combinado con lo bajita que es la caja, la hace ver totalmente redondeada en los extremos (forma de píldora).
- Nota importante: esta única clase `.etiqueta` se reutiliza en `index.html` (⭐ Producto estrella, 🍓+🎤 la mezcla) sin tener que crear una clase nueva cada vez — otro ejemplo de reutilización de CSS.

**Los botones (`.btn` y sus modificadores):**

```css
.btn {
  display: inline-block;
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.btn:hover { transform: translateY(-2px); }
```
- `cursor: pointer`: cuando el mouse pasa por encima, el ícono se convierte en la manito de "esto es clickeable" — importante también en el `<a>` con clase `.btn`, que visualmente no siempre se distingue de un botón normal.
- `transition: transform 0.2s ease, box-shadow 0.2s ease`: le dice al navegador "si `transform` o `box-shadow` cambian, no lo hagas de golpe, anímalo suavemente durante 0.2 segundos". Esto es lo que da el efecto de que el botón "flota" suavemente al pasar el mouse.
- `.btn:hover`: **pseudo-clase**: es un estado especial de un elemento, no algo que se escriba en el HTML. `:hover` se activa automáticamente mientras el mouse está encima del elemento. `transform: translateY(-2px)` mueve el botón 2 píxeles hacia arriba (`Y` negativo = hacia arriba), dando la sensación de que "se levanta" al pasar el mouse. Gracias a la `transition` de arriba, ese movimiento se ve animado y no instantáneo.
- Luego hay varios **modificadores** (siguiendo BEM): `.btn--urbano` (transparente, borde azul neón con resplandor, para el lado "Blessd"), `.btn--dulce` (fondo rojo fresa sólido), `.btn--producto` (ocupa el 100% del ancho de la tarjeta, para los botones "Agregar al carrito" de las tarjetas), `.btn--nav` (degradado azul→rojo, para el botón "Ver todos los productos"). Cada uno define solo lo que cambia respecto al `.btn` base; el resto (padding, radio, transición) ya viene heredado de `.btn`.

**La navbar y el footer** ya se explicaron en su estructura HTML (sección 3.2); en CSS lo importante para el profesor:

```css
.navbar-marca {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 248, 241, 0.92);
  backdrop-filter: blur(6px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
  padding: 1rem 0;
}
```
- `position: sticky; top: 0;`: hace que la barra de navegación **se quede pegada arriba de la pantalla** cuando el usuario hace scroll hacia abajo, en vez de desaparecer con el resto del contenido. `sticky` se comporta como normal hasta que, al hacer scroll, llega a `top: 0` (el borde superior de la ventana), y ahí "se pega".
- `z-index: 100`: controla el **orden de apilamiento** cuando elementos se superponen. Un `z-index` alto asegura que la navbar quede siempre **encima** del resto del contenido (por ejemplo, encima de las imágenes) y no se tape al hacer scroll.
- `rgba(255, 248, 241, 0.92)`: color en formato `rgba(rojo, verde, azul, opacidad)`. El último valor (0.92) es la opacidad: 92% opaco, o sea, ligeramente transparente — se alcanza a notar sutilmente el contenido pasando por debajo.
- `backdrop-filter: blur(6px)`: desenfoca **lo que hay detrás** del elemento (no el elemento mismo), creando ese efecto "vidrio esmerilado" tan común en interfaces modernas — se ve borroso lo que pasa por debajo de la navbar al hacer scroll.

```css
.navbar .nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 0;
  height: 2px;
  background: var(--rojo-fresa);
  transition: width 0.2s ease;
}
.navbar .nav-link:hover::after,
.navbar .nav-link.active::after {
  width: 100%;
}
```
- `.navbar .nav-link`: selector **descendiente** (con un espacio en medio): selecciona cualquier `.nav-link` que esté **dentro de** algún `.navbar`, sin importar cuántos niveles de anidamiento haya en medio.
- `::after` es un **pseudo-elemento**: crea un elemento "fantasma" extra, generado por CSS, justo después del contenido real del elemento, sin tener que agregar una etiqueta HTML nueva. Se usa muchísimo para detalles decorativos como esta línea que aparece debajo de los links.
- `content: ""`: obligatorio en cualquier pseudo-elemento `::after`/`::before`; sin esta línea, el pseudo-elemento ni siquiera se dibuja.
- La línea empieza con `width: 0` (invisible) y, al hacer `:hover` sobre el link (o si tiene la clase `.active`, o sea, es la página actual), crece a `width: 100%`. Gracias a la `transition`, ese crecimiento se ve como una animación de izquierda a derecha — es el subrayado animado que aparece debajo de "Inicio", "Productos", etc.

**El footer:**

```css
.footer { background: var(--azul-oscuro); color: var(--blanco); padding: 3rem 0; text-align: center; }
.footer__contenido { display: flex; flex-direction: column; gap: 0.6rem; align-items: center; }
```
- `display: flex`: convierte este contenedor en un **contenedor flexbox**, uno de los dos grandes sistemas de layout de CSS moderno (el otro es Grid, que aquí se usa indirectamente a través del sistema de columnas de Bootstrap). Flexbox permite alinear y distribuir a sus hijos fácilmente en una fila o columna.
- `flex-direction: column`: los hijos (el logo, el texto de contacto, el copyright) se acomodan en **columna** (uno debajo del otro) en vez de en fila.
- `align-items: center`: centra horizontalmente a los hijos dentro del eje transversal (como aquí la dirección es columna, "centrar en el eje transversal" es centrar horizontalmente).
- `gap: 0.6rem`: separación uniforme entre cada hijo, sin tener que ponerle `margin` manualmente a cada uno.

### 4.5 `inicio.css`

**El fondo del hero, con imagen y degradado combinados:**

```css
.hero__fila {
  min-height: 88vh;
  background:
    linear-gradient(90deg, rgba(11, 27, 63, 0.82) 0%, rgba(11, 27, 63, 0.35) 55%, rgba(230, 57, 80, 0.55) 100%),
    url('../IMG/banner.png') center 25% / cover no-repeat;
}
```
- `min-height: 88vh`: `vh` = "viewport height", unidad relativa a la altura de la pantalla visible. `88vh` significa "al menos el 88% de la altura de la ventana del navegador", así el hero siempre ocupa casi toda la pantalla al abrir la página, sin importar el tamaño del monitor.
- La propiedad `background` acepta **varias capas separadas por comas**: la primera que se escribe queda **arriba** (más cerca de quien mira) y la última queda **abajo del todo**. Aquí hay dos capas:
  1. Un `linear-gradient` (degradado) que va, en dirección `90deg` (de izquierda a derecha), de azul oscuro semitransparente (82% opaco) a la izquierda, pasando por azul más transparente (35%) a mitad de camino (`55%`), hasta rojo fresa semitransparente (55% opaco) a la derecha.
  2. La foto real (`url('../IMG/banner.png')`) **debajo** del degradado.
- **¿Para qué el degradado encima de la foto?** Para que el texto blanco de los títulos siga siendo legible sin importar qué tan clara u oscura sea la zona de la foto que quede detrás — es un truco de diseño muy común (oscurecer/tintar una foto de fondo para que el texto resalte).
- `center 25% / cover no-repeat`: esta es la posición y el modo de la imagen de fondo. `center 25%` es la posición (centrado horizontalmente, y verticalmente enfocado al 25% desde arriba, para priorizar la parte de arriba de la foto). `/ cover` (después del `/`) le dice que la imagen debe **cubrir** todo el espacio disponible, recortándose si hace falta pero sin deformarse ni dejar espacios vacíos. `no-repeat` evita que la imagen se repita en mosaico si es más chica que el contenedor.

**`clamp()` para tipografía responsive:**

```css
.hero__titulo {
  font-family: var(--fuente-urbana);
  font-size: clamp(2.2rem, 5vw, 3.6rem);
  ...
}
```
- `clamp(mínimo, preferido, máximo)`: una función de CSS que calcula un tamaño de letra que **se adapta fluidamente** al ancho de pantalla, sin necesitar media queries. Se traduce como: "usa `5vw` (5% del ancho de la ventana) como tamaño preferido, pero **nunca bajes de `2.2rem`** (en pantallas chicas) **ni subas de `3.6rem`** (en pantallas gigantes)". Así el título crece y se achica suavemente entre esos dos límites según el tamaño de pantalla, en vez de saltar bruscamente en un punto de quiebre fijo.

**La imagen del producto estrella — mostrarla completa, sin recortar:**

```css
.bendicion__imagen {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  max-height: 520px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.06);
  object-fit: contain;
  box-shadow: 0 0 30px rgba(230, 57, 80, 0.4);
}
```
- `aspect-ratio: 4 / 5`: le dice a la caja qué **proporción** de ancho contra alto debe mantener siempre (aquí, 4 de ancho por cada 5 de alto — un formato "retrato" suave), en vez de darle un alto fijo en píxeles. Como el ancho ya es `100%` del contenedor, el alto se calcula solo a partir de esa proporción, y se **adapta automáticamente** en cualquier tamaño de pantalla, sin necesitar un valor distinto por cada punto de quiebre.
- `max-height: 520px`: un límite de seguridad para que, en monitores muy anchos (donde el ancho del 50% de la página ya es grande de por sí), la caja no termine siendo excesivamente alta.
- `object-fit: contain`: a diferencia de `cover` (que **recorta** lo que sobra para llenar la caja), `contain` **encoge la imagen entera hasta que quepa completa** dentro de la caja, sin cortar nada — es justo lo que se necesitaba acá: antes, con `cover`, si la foto no tenía la misma proporción que la caja, se perdía una parte importante de la imagen (por ejemplo, el letrero o el producto quedaban cortados). Con `contain` nunca se pierde nada, aunque a veces quede un espacio libre a los costados si la foto no calza exacto con la proporción de la caja.
- `background: rgba(255, 255, 255, 0.06)`: un blanco casi transparente (6% de opacidad) que rellena ese espacio libre, si lo hay, para que no se vea como un hueco vacío sino como parte del diseño.
- `box-shadow: 0 0 30px rgba(230, 57, 80, 0.4)`: una sombra de color (no gris/negra como la sombra típica), con difuminado de 30px, en rojo fresa al 40% de opacidad — le da un resplandor rojizo alrededor de la imagen.

**Media query (diseño responsive escrito a mano):**

```css
@media (max-width: 991.98px) {
  .hero__lado { padding: 4rem 2rem; }
}
```
- `@media (max-width: 991.98px)`: un bloque de CSS que **solo se aplica cuando el ancho de la ventana es de 991.98px o menos**. El valor **991.98px no es al azar**: es exactamente el límite que usa Bootstrap para su punto de quiebre `lg` (Bootstrap considera "`lg` en adelante" desde 992px). Al usar 991.98px aquí, este ajuste se activa justo **antes** de que Bootstrap cambie de columna apilada a columna lado a lado.
- Este media query antes también tenía una línea para achicar `.bendicion__imagen` en pantallas chicas — ya no hace falta: como ahora esa caja usa `aspect-ratio` en vez de un alto fijo, se adapta sola a cualquier ancho de pantalla sin necesitar una regla aparte. Un ejemplo más de cómo una buena decisión de CSS (usar `aspect-ratio`) termina simplificando otras partes del código (un media query entero de menos).

### 4.6 `productos.css`

La mayoría de clases (`.productos__titulo`, `.producto`, `.producto__imagen`, etc.) siguen exactamente la misma lógica ya explicada en `inicio.css` (BEM, `aspect-ratio` + `object-fit: contain`, `clamp()`). Lo único distinto que vale la pena resaltar:

```css
.producto--estrella {
  border: 2px solid var(--rojo-fresa);
}

.producto__etiqueta-estrella {
  position: absolute;
  top: -0.8rem;
  left: 1.2rem;
  margin-bottom: 0;
}
```
- `.producto--estrella`: modificador BEM que le agrega un borde rojo a la tarjeta de "La Bendición" para distinguirla del resto.
- `position: absolute` combinado con `top: -0.8rem` (negativo): esto **saca la etiqueta "⭐ Estrella" de su posición normal en el flujo del documento** y la coloca de forma flotante, medio saliéndose por arriba del borde de la tarjeta (valor negativo = hacia arriba, fuera de la caja). Para que `position: absolute` funcione posicionándose **relativo a la tarjeta** (y no relativo a toda la página), la tarjeta padre (`.producto`) necesita `position: relative` — que efectivamente está declarado en la regla `.producto` de este mismo archivo. Esa pareja `relative` (en el padre) + `absolute` (en el hijo) es un patrón clásico de CSS que vale la pena saber explicar.

### 4.7 `carrito.css`

```css
.carrito__vacio { text-align: center; padding: 4rem 0; color: #777; }

.btn--cantidad {
  background: var(--rosa-crema);
  color: var(--rojo-fresa);
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  padding: 0;
  line-height: 1;
  font-weight: 700;
}
```
- `border-radius: 50%` sobre una caja **cuadrada** (mismo `width` y `height`, `2rem` x `2rem`) es la forma estándar de dibujar un **círculo perfecto** en CSS — usado en los botones redonditos "+" y "−" del carrito.

```css
.carrito__resumen {
  background: var(--azul-oscuro);
  color: var(--blanco);
  border-radius: 20px;
  padding: 2rem;
}
```
- El cuadro con el total resaltado en azul oscuro, para que sea lo primero que salte a la vista en la página del carrito (es la información más importante: cuánto va a pagar el cliente).

---

## 5. JavaScript explicado línea por línea (`global.js`, `inicio.js`, `productos.js`, `carrito.js`)

Esta es la parte que le da **vida** al sitio: sin estos archivos, los botones "Agregar al carrito" no harían nada, y la página `carrito.html` estaría siempre vacía.

Está repartido en **4 archivos**, siguiendo el mismo patrón que el CSS (sección 4):

- **`global.js`** — el "motor": todas las funciones que leen/escriben el carrito en `localStorage`, más el numerito rojo de la navbar. Se carga en **las 3 páginas**, siempre primero.
- **`inicio.js`** — solo conecta los botones "Agregar al carrito" que existen en `index.html`.
- **`productos.js`** — solo conecta los botones "Agregar al carrito" que existen en `productos.html`.
- **`carrito.js`** — solo dibuja la tabla del carrito y conecta sus botones (+, −, Quitar, Vaciar). Existe únicamente en `carrito.html`.

En cada página, el HTML carga `global.js` **antes** que el archivo propio de esa página:

```html
<script src="../JS/global.js"></script>
<script src="../JS/inicio.js"></script>
```

Esto importa porque `inicio.js`, `productos.js` y `carrito.js` **usan funciones que están definidas en `global.js`** (como `agregarAlCarrito`). En JavaScript, cuando se cargan varios `<script>` normales (sin `type="module"`) uno después del otro, todos comparten el mismo espacio de funciones globales — pero el orden importa: una función tiene que estar **definida** en algún script ya cargado antes de que otro script más abajo intente **usarla**. Por eso `global.js` siempre va primero.

### 5.1 Ideas base antes de leer el código

- **Variable**: una "cajita" con nombre donde se guarda un dato. Se declara con `const` (constante: una vez asignada, esa cajita no se puede reasignar a otro valor —aunque si guarda un array/objeto, su *contenido interno* sí se puede modificar) o `let` (variable normal, se puede reasignar). En este archivo no se usa `var` (la forma antigua de declarar variables en JS), que es lo correcto en código moderno.
- **Función**: un bloque de código con nombre que se puede "llamar" (ejecutar) cuantas veces se necesite, para no repetir el mismo código una y otra vez. Puede recibir **parámetros** (datos de entrada) y puede **devolver** (`return`) un resultado.
- **Array**: una lista ordenada de datos, escrita entre corchetes `[ ]`. Ej: `[]` es un array vacío; `[1, 2, 3]` tiene tres elementos.
- **Objeto**: una colección de datos con nombre, escrita entre llaves `{ }`, en pares `clave: valor`. Ej: `{ id: 'bendicion', nombre: 'La Bendición', precio: 18000, cantidad: 1 }` — así se representa **un producto dentro del carrito** en este proyecto: el carrito completo es un **array de objetos** como este.
- **DOM**: como se explicó en la sección 2, es el árbol de elementos de la página en memoria. `document.getElementById('algo')` es la forma más común de "ir a buscar" un elemento específico del HTML desde JavaScript, usando su `id`.
- **Evento**: algo que sucede en la página (un clic, que termine de cargar, etc.). Un **event listener** (`addEventListener`) es una función que queda "escuchando" a que ese evento suceda, y cuando sucede, ejecuta el código que le indiquemos.

### 5.2 `localStorage`: la "caja" donde vive el carrito — `global.js`

```js
const CLAVE_CARRITO = 'carritoFresasBlessd';
```
- `localStorage` es una función que **todos los navegadores modernos** traen incorporada: es un espacio de almacenamiento, propio de cada sitio web, que **sobrevive** aunque se cierre la pestaña, se cierre el navegador, o se apague el computador (a diferencia de una variable de JavaScript normal, que se borra apenas se recarga la página). Es exactamente lo que permite que si agregan un producto en `productos.html` y luego entran a `carrito.html`, el producto siga ahí.
- Funciona como un diccionario de **texto → texto**: se guarda información bajo una "clave" (un nombre), y luego se recupera usando esa misma clave.
- `CLAVE_CARRITO` es el nombre elegido para guardar el carrito de este sitio específicamente (con un nombre bien específico como `'carritoFresasBlessd'` para no chocar por accidente con datos de otra página que el usuario tenga guardados en el mismo navegador).
- Se declara **una sola vez, arriba del archivo**, y se reutiliza en el resto del código en vez de escribir el texto `'carritoFresasBlessd'` a mano cada vez — así, si un día quisieran cambiar el nombre de la clave, solo lo cambian en un lugar.

```js
function obtenerCarrito() {
  const guardado = localStorage.getItem(CLAVE_CARRITO);
  if (guardado === null) {
    return [];
  }
  return JSON.parse(guardado);
}
```
- `localStorage.getItem(CLAVE_CARRITO)`: busca en la caja de almacenamiento el valor guardado bajo esa clave. Si nunca se ha guardado nada con esa clave (por ejemplo, la primera vez que alguien visita el sitio), devuelve `null` (un valor especial de JavaScript que representa "nada", "vacío", "no existe").
- `if (guardado === null)`: el `===` es el operador de **igualdad estricta**: compara valor **y** tipo de dato al mismo tiempo (a diferencia de `==`, que a veces "adivina" conversiones de tipo y puede dar resultados confusos). En JavaScript moderno siempre se prefiere `===`.
- Si no hay nada guardado, la función devuelve `[]` (un array vacío): "no hay ningún producto todavía".
- **`localStorage` solo puede guardar texto (strings), nunca arrays u objetos directamente.** Por eso, si sí hay algo guardado, hace falta `JSON.parse(guardado)`: **convierte un texto con formato JSON de vuelta en un array/objeto de JavaScript real**, para poder trabajar con él (recorrerlo con `for`, leer `producto.precio`, etc.).
- **JSON** (JavaScript Object Notation) es un formato de texto estándar para representar datos estructurados (arrays, objetos, números, texto) que se puede transportar o guardar fácilmente. Es básicamente la manera "universal" de escribir un array/objeto como si fuera texto plano.

```js
function guardarCarrito(carrito) {
  localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}
```
- Es la operación **inversa**: `JSON.stringify(carrito)` toma el array/objeto de JavaScript (`carrito`) y lo **convierte a texto** en formato JSON (porque, como dijimos, `localStorage` solo entiende texto).
- `localStorage.setItem(clave, valor)`: guarda ese texto bajo la clave `CLAVE_CARRITO`, sobrescribiendo lo que hubiera antes.
- Este patrón `obtenerCarrito()` (leer + convertir de texto a array) y `guardarCarrito()` (convertir de array a texto + guardar) es la base de **todo** el archivo: cada función que modifica el carrito, en el fondo, siempre hace: 1) leer el carrito actual con `obtenerCarrito()`, 2) modificar ese array en memoria, 3) guardarlo de nuevo con `guardarCarrito()`.

### 5.3 Formatear precios — `global.js`

```js
function formatearPrecio(precio) {
  return '$' + precio.toLocaleString('es-CO');
}
```
- Recibe un número (ej. `18000`) y devuelve un texto con formato de precio colombiano (ej. `"$18.000"`).
- `precio.toLocaleString('es-CO')`: `toLocaleString` es un método incorporado de JavaScript para números, que los formatea según las convenciones de una región/idioma (un "locale"). `'es-CO'` = español de Colombia, que usa el **punto** como separador de miles (18.000) en vez de la coma que se usa en, por ejemplo, inglés de Estados Unidos (18,000).
- `'$' + ...`: el operador `+` entre texto (strings) los **concatena** (los pega uno después del otro). Como `precio.toLocaleString(...)` ya devuelve texto, pegarle `'$'` adelante arma el texto final: `"$18.000"`.

### 5.4 El contador rojo de la navbar — `global.js`

```js
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
```
- Primero lee el carrito completo guardado.
- `let totalUnidades = 0;`: se declara con `let` (no `const`) porque **sí** se va a reasignar más abajo, dentro del bucle.
- `carrito.forEach((producto) => { ... })`: `forEach` es un método de los arrays que **recorre cada elemento uno por uno** y ejecuta, para cada uno, la función que se le pasa. Aquí, por cada `producto` del carrito, suma su `cantidad` al total acumulado.
  - `(producto) => { ... }` es una **función flecha** (*arrow function*), una forma más corta y moderna de escribir funciones en JavaScript, muy común cuando la función se pasa como argumento de otra (como aquí, dentro de `forEach`). Es equivalente a escribir `function(producto) { ... }`.
- `document.getElementById('contadorCarrito')`: busca en el DOM el elemento cuyo `id` es `contadorCarrito` — exactamente el `<span>` que vimos en el HTML de la navbar (sección 3.2), presente en **las 3 páginas**.
- ```js
  if (contador === null) { return; }
  ```
  Esta es una comprobación de seguridad importante: `global.js` se carga en las 3 páginas, y esta función no tiene forma de saber, solo con leer el código, si algún día se reutiliza en una página futura que no tenga un ícono de carrito en su navbar. Esta línea evita que el programa se rompa en ese caso (JavaScript lanzaría un error si se intenta usar `.textContent` sobre `null`). Hoy por hoy el elemento siempre existe (está en las 3 páginas), pero es buena práctica defensiva justo porque este archivo es compartido — es distinto del caso de `renderizarCarrito()` en `carrito.js` (sección 5.8), que **no** necesita esta comprobación porque ese archivo ya sabe que solo corre en `carrito.html`.
  - `return;` sin ningún valor después, dentro de una función, simplemente **corta la ejecución de la función ahí mismo** y no sigue con las líneas de abajo.
- `contador.textContent = totalUnidades;`: cambia el **texto visible** dentro de ese elemento del DOM al número total de unidades. Esto es manipulación directa del DOM: el HTML original decía `0` a mano, pero JavaScript lo sobreescribe en tiempo real.
- `contador.classList.toggle('d-none', totalUnidades === 0);`: `classList` es la propiedad que permite agregar/quitar/alternar clases CSS de un elemento desde JavaScript. `toggle(clase, condición)` es una versión con dos argumentos: si la condición es `true`, **agrega** esa clase; si es `false`, **la quita**. Aquí: "si el total de unidades es 0, agrega `d-none` (ocúltalo); si no, quítala (muéstralo)". Así el numerito rojo solo aparece cuando hay al menos un producto en el carrito.
- **¿Quién llama a `actualizarContador()`?** `global.js` tiene, al final de su propio archivo, su propio `DOMContentLoaded` (lo vemos en detalle en la sección 5.9): `document.addEventListener('DOMContentLoaded', () => { actualizarContador(); });`. Como `global.js` se carga en las 3 páginas, este numerito se refresca automáticamente apenas carga cualquiera de ellas, sin que `inicio.js`, `productos.js` ni `carrito.js` tengan que preocuparse de llamarlo.

### 5.5 Agregar un producto al carrito — `global.js`

```js
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
```
- Recibe tres **parámetros**: `id`, `nombre`, `precio` — exactamente los tres datos que vienen de los atributos `data-id`, `data-nombre`, `data-precio` del botón que se hizo clic (vistos en la sección 3).
- `let yaExiste = false;`: una **bandera** (flag): una variable booleana (`true`/`false`) que se usa para "recordar" si se cumplió algo, para poder decidir qué hacer después de terminar de revisar todo.
- ```js
  for (let i = 0; i < carrito.length; i++) {
  ```
  Este es un **bucle `for` clásico**, la forma más tradicional de recorrer un array en JavaScript (y en casi cualquier lenguaje de programación). Se lee así:
  - `let i = 0`: crea un contador llamado `i`, empezando en 0 (el índice del primer elemento de un array **siempre** empieza en 0, no en 1).
  - `i < carrito.length`: la condición que se revisa **antes de cada vuelta**; mientras sea verdadera, el bucle sigue. `carrito.length` es la cantidad de elementos que tiene el array.
  - `i++`: al final de cada vuelta, incrementa `i` en 1 (es una forma corta de escribir `i = i + 1`).
  - Entonces el bucle recorre `i = 0, 1, 2, ...` hasta justo antes de llegar a la cantidad total de elementos — es decir, visita **todos y cada uno de los productos del carrito**, uno por uno.
- `carrito[i]`: accede al elemento del array en la posición `i` (recordar: un array se puede "indexar" con corchetes y un número de posición).
- `if (carrito[i].id === id)`: compara el `id` de ese producto del array contra el `id` que llegó como parámetro (el del botón que se clickeó). Si coinciden, es el mismo producto.
  - Si coincide: `carrito[i].cantidad = carrito[i].cantidad + 1;` le suma 1 a la cantidad que ya tenía, y `yaExiste = true;` deja constancia de que sí se encontró.
- Después del bucle: `if (!yaExiste)` — el signo de exclamación `!` es el operador de **negación**: `!yaExiste` se lee "si NO existía ya". Si después de revisar todo el carrito nunca se encontró ese producto, entonces:
  - `carrito.push({ id: id, nombre: nombre, precio: precio, cantidad: 1 });`: `push` es el método que **agrega un elemento nuevo al final de un array**. Se agrega un objeto nuevo representando este producto, empezando con `cantidad: 1` (la primera unidad).
- Al final, siempre (haya sido un producto nuevo o uno que ya estaba): `guardarCarrito(carrito)` (persiste los cambios en `localStorage`) y `actualizarContador()` (refresca el numerito rojo de la navbar).

**En resumen, la lógica completa es**: "busca si el producto ya está en el carrito. Si está, súmale 1 a su cantidad. Si no está, agrégalo como nuevo con cantidad 1. Guarda el carrito actualizado y refresca el contador." — esto evita que el mismo producto aparezca duplicado como dos filas distintas si lo agregan varias veces.

### 5.6 Cambiar la cantidad (botones + y − dentro del carrito) — `global.js`

```js
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
```
- `delta` es un parámetro que vale `1` (si se hizo clic en "+") o `-1` (si se hizo clic en "−") — lo vemos de dónde sale en la sección 5.8.
- El primer bucle busca el producto por `id` (igual que en `agregarAlCarrito`) y le **suma el delta** a su cantidad (sumar `-1` es, en la práctica, restar 1).
- El segundo bucle es una **limpieza manual**: recorre el carrito de nuevo y arma un array nuevo (`carritoFiltrado`) que solo incluye los productos cuya `cantidad` sea mayor a 0. Así, si al restar la cantidad llegó a 0 (el usuario le dio "−" hasta llegar a cero unidades), ese producto **desaparece por completo** del carrito, en vez de quedar mostrando "0 unidades" en la tabla.
  - Esto es exactamente lo que hace un método como `.filter()` de forma automática, pero aquí está escrito "a mano" con un `for` y un `push`, para que quede explícito paso a paso qué está pasando (es válido resolverlo de las dos formas; ambas son código correcto en JavaScript).
- Al final: guarda el carrito ya filtrado, y llama a **dos** funciones: `renderizarCarrito()` (para que la tabla en pantalla se redibuje con los números actualizados) y `actualizarContador()` (para refrescar el numerito de la navbar).
- **Detalle importante sobre archivos:** `cambiarCantidad` vive en `global.js`, pero `renderizarCarrito` está definida en `carrito.js` (sección 5.8) — un archivo **distinto**. Esto funciona porque `cambiarCantidad` solo se puede llegar a ejecutar desde un botón "+/−" que **el propio `renderizarCarrito()` creó**, es decir, solo se puede hacer clic en "+/−" estando en `carrito.html`, que es justo la única página donde `carrito.js` (y por lo tanto `renderizarCarrito`) también está cargado. JavaScript revisa que una función exista recién **en el momento en que se llama**, no cuando se define — así que, aunque `global.js` se lea de arriba hacia abajo antes de que `carrito.js` exista, para cuando alguien realmente hace clic en "+/−" (después de que toda la página ya cargó), `renderizarCarrito` ya está definida y disponible.

### 5.7 Quitar un producto y vaciar el carrito — `global.js`

```js
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
```
- `!==` es el operador de **desigualdad estricta** (lo contrario de `===`): "diferente en valor o en tipo".
- La lógica es: recorrer el carrito y armar un array nuevo con **todos los productos, excepto** el que tenga ese `id` — sin importar cuántas unidades tuviera, se quita por completo con un solo clic en "Quitar".

```js
function vaciarCarrito() {
  guardarCarrito([]);
  renderizarCarrito();
  actualizarContador();
}
```
- La función más simple del archivo: sobreescribe directamente el carrito guardado con un array vacío `[]` — no hace falta revisar nada producto por producto, porque la idea es borrar todo de una vez.

### 5.8 Dibujar la tabla del carrito: `renderizarCarrito()` — `carrito.js`

Esta es la función más larga y la que más conceptos nuevos combina. La vamos por partes.

```js
function renderizarCarrito() {
  const contenedor = document.getElementById('listaCarrito');
  const carrito = obtenerCarrito();
  ...
```
- Busca el `<tbody id="listaCarrito">` que vimos en `carrito.html`. A diferencia de `actualizarContador()` (sección 5.4), aquí **no hace falta** comprobar si `contenedor` es `null`: esta función vive en `carrito.js`, un archivo que **solo se carga en `carrito.html`**, así que ese elemento siempre va a existir cuando esta función se ejecute. Es justamente la ventaja de haber separado el JS por página: cada archivo puede "confiar" en que los elementos de su propia página están ahí, sin tener que estar comprobando todo el tiempo.

```js
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
```
- Si el carrito está vacío (`carrito.length === 0`, es decir, cero elementos): limpia cualquier fila vieja que hubiera quedado en la tabla (`contenedor.innerHTML = ''`), **muestra** el mensaje "Tu carrito está vacío" quitándole `d-none` (`classList.remove`), **oculta** el resumen/tabla agregándole `d-none` (`classList.add`), y corta ahí con `return` — no hace falta ejecutar el resto de la función.
- Si sí hay productos, es al revés: oculta el mensaje de vacío y muestra el resumen. Esto es justo el mecanismo detrás de "solo se ve uno de los dos bloques a la vez" que mencionamos en la sección 3.5.

```js
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
```
- `filasHtml` empieza como un texto vacío `''`, y en cada vuelta del bucle se le va **concatenando** (pegando) el HTML de una fila más. Al final de todo el bucle, `filasHtml` contiene el HTML de la tabla completa, como un solo bloque de texto.
- Por cada producto: `const subtotal = producto.precio * producto.cantidad;` calcula el subtotal de esa fila (precio unitario × cantidad), y se va sumando al `total` general.
- ``` `<tr> ... </tr>` ```: esto es un **template literal** (plantilla de texto), se reconoce porque usa comillas invertidas (backticks, `` ` ``) en vez de comillas simples o dobles. Su superpoder es que permite **interpolar variables directamente dentro del texto** usando `${ }`. Por ejemplo, `${producto.nombre}` se reemplaza automáticamente por el valor real de `producto.nombre` en ese momento (ej. "La Bendición"). Sin template literals, tocaría concatenar todo a mano con `+`, mucho más difícil de leer.
- Fíjense que **cada botón que se genera** (+, −, Quitar) recibe sus propios atributos `data-id="${producto.id}"` (y `data-delta` en los de +/−) — exactamente el mismo patrón de "atributos de datos" que vimos en el HTML estático (sección 3), pero esta vez **generado dinámicamente por JavaScript**, uno distinto por cada producto del carrito.
- También se reutiliza `formatearPrecio(subtotal)` (la función de la sección 5.3) para que el subtotal de cada fila se vea con el formato `$12.000` en vez de un número plano `12000`.

```js
  contenedor.innerHTML = filasHtml;
  document.getElementById('totalCarrito').textContent = formatearPrecio(total);
```
- `contenedor.innerHTML = filasHtml;`: **esta es la línea que realmente "dibuja" la tabla.** `innerHTML` es una propiedad de cualquier elemento del DOM que representa **todo su contenido HTML interno**; asignarle un texto hace que el navegador **reemplace** ese contenido con el HTML nuevo (interpretándolo como HTML de verdad, no como texto plano — por eso las etiquetas `<tr>`, `<td>`, etc. se convierten en filas y celdas reales, no en texto visible con símbolos `<` `>`).
- La última línea escribe el total general (ya formateado como precio) en el elemento `<p id="totalCarrito">`.

```js
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
```
- **Este es uno de los puntos más importantes para entender, y algo que suelen preguntar en front end**: los botones + / − / Quitar **se acaban de crear recién**, como texto, en la línea `contenedor.innerHTML = filasHtml`. Un botón que no existía antes en el DOM **no puede tener ya un evento de clic conectado** — hay que conectárselo **después** de que ya existe de verdad en la página. Por eso estas líneas van al final de la función, después de haber insertado el HTML.
- `contenedor.querySelectorAll('.btn--cantidad')`: busca **todos** los elementos que tengan la clase `.btn--cantidad` dentro de `contenedor` (la tabla), y devuelve una lista con todos ellos (puede haber varios, uno "+" y uno "−" por cada producto).
- `.forEach((boton) => { ... })`: recorre esa lista y, para cada botón, le agrega un **event listener** de clic.
- `boton.addEventListener('click', () => { ... })`: "cuando hagan clic en este botón específico, ejecuta esta función". La función que se ejecuta llama a `cambiarCantidad(...)`, pasándole:
  - `boton.dataset.id`: el id del producto (leído del atributo `data-id` que se generó al construir el HTML).
  - `Number(boton.dataset.delta)`: el delta (`"1"` o `"-1"`). **`Number(...)` es necesario** porque **todos** los atributos `data-*` se leen siempre como **texto** (string), aunque el valor "parezca" un número. Sin convertirlo, `cambiarCantidad` terminaría haciendo algo como `cantidad + "1"`, que en JavaScript **concatena texto** en vez de sumar matemáticamente (por ejemplo, `3 + "1"` da como resultado el texto `"31"`, no el número `4`). `Number(...)` convierte ese texto a un número real antes de usarlo.
- Exactamente la misma lógica se repite para los botones "Quitar", pero llamando a `quitarDelCarrito(boton.dataset.id)` en vez de `cambiarCantidad`.

### 5.9 Los 3 puntos de arranque: `DOMContentLoaded` en cada archivo

Antes de la división en archivos, había **un solo** bloque `DOMContentLoaded` que hacía todo. Ahora hay **tres**, uno por cada archivo con lógica propia — cada uno se dispara de forma independiente cuando el HTML de esa página termina de cargar.

- **`DOMContentLoaded` es un evento especial** que el navegador dispara automáticamente **una sola vez**, justo cuando terminó de leer y armar todo el HTML de la página (el DOM ya está completo), sin necesidad de esperar a que las imágenes terminen de cargar. Es el momento seguro para empezar a buscar elementos del DOM y conectarles eventos — si el JavaScript intentara hacer esto **antes** de que el HTML termine de cargar, podría buscar un elemento que técnicamente todavía no existe.
- Se puede escuchar este mismo evento **varias veces, desde archivos distintos**: cada `document.addEventListener('DOMContentLoaded', ...)` que haya en la página (uno en `global.js`, otro en el archivo propio de esa página) se ejecuta de forma independiente cuando el evento ocurre. No hay conflicto entre ellos.

**`global.js` (se repite acá lo visto en 5.4), corre en las 3 páginas:**
```js
document.addEventListener('DOMContentLoaded', () => {
  actualizarContador();
});
```
Solo refresca el numerito de la navbar. Nada más — porque nada más es compartido por las 3 páginas.

**`inicio.js` y `productos.js` — conectar los botones "Agregar al carrito":**

Los dos archivos tienen **exactamente el mismo código** (es la única duplicación real entre ellos, y es intencional: cada uno conecta los botones que existen en su propia página):

```js
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
```
- `document.querySelectorAll('.agregar-carrito')`: busca **todos** los botones con esa clase en la página actual (en `index.html` hay 4: el de "La Bendición" y los 3 de la vitrina; en `productos.html` hay 4 también, uno por producto de la grilla completa).
- A cada uno se le agrega un evento de clic que:
  1. Llama a `agregarAlCarrito(...)` (definida en `global.js`, cargado antes) pasándole los tres datos leídos de `boton.dataset`, convirtiendo el precio a número con `Number(...)` (los atributos `data-*` siempre llegan como texto).
  2. `boton.textContent = 'Agregado ✓';`: cambia el texto del botón inmediatamente, como confirmación visual de que sí se agregó.
  3. `setTimeout(() => { boton.textContent = 'Agregar al carrito'; }, 1000);`: `setTimeout` ejecuta una función **una sola vez, después de esperar el tiempo indicado** (en milisegundos: `1000` = 1 segundo). Después de 1 segundo, el texto del botón vuelve a decir "Agregar al carrito", para que quede listo por si el usuario quiere agregar otra unidad más adelante.

**`carrito.js` — dibujar la tabla y conectar "Vaciar carrito":**

```js
document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrito();

  const botonVaciar = document.getElementById('vaciarCarrito');
  if (botonVaciar !== null) {
    botonVaciar.addEventListener('click', vaciarCarrito);
  }
});
```
- `renderizarCarrito()`: dibuja la tabla la primera vez que se abre `carrito.html`, con lo que ya hubiera guardado en `localStorage` de antes.
- `document.getElementById('vaciarCarrito')`: busca el botón "Vaciar carrito". Como `carrito.js` **solo** se carga en `carrito.html`, ese botón siempre existe — pero aquí sí dejamos el `if (botonVaciar !== null)` porque, a diferencia de `contenedor` en 5.8 (que se usa varias veces seguidas en toda la función), este es un único uso puntual y la comprobación cuesta una línea; es un caso donde cualquiera de las dos formas es válida.
- `botonVaciar.addEventListener('click', vaciarCarrito);`: aquí, a diferencia de los event listeners de `inicio.js`/`productos.js`, se le pasa la función `vaciarCarrito` **directamente por su nombre**, sin envolverla en una función flecha `() => {}`. Esto funciona porque `vaciarCarrito` no necesita ningún parámetro adicional (a diferencia de, por ejemplo, `cambiarCantidad`, que sí necesita que le pasen `id` y `delta` específicos de cada botón, y por eso esos sí necesitan la función flecha intermedia para poder "armar" esa llamada con datos concretos).

---

## 6. Flujo completo: qué pasa cuando el usuario hace clic

Esto es justo el tipo de pregunta que suele hacer un profesor ("explíqueme paso a paso qué pasa cuando..."). Aquí van dos recorridos completos.

### Escenario A: el usuario está en `productos.html` y hace clic en "Agregar al carrito" de "Clásica con crema"

1. Al cargar `productos.html`, el navegador ejecutó los `DOMContentLoaded` de `global.js` (refrescó el contador) y de `productos.js` (conectó todos los botones "Agregar al carrito"), así que ese botón ya tiene un `addEventListener('click', ...)` conectado.
2. Al hacer clic, se ejecuta la función que llama a `agregarAlCarrito('clasica', 'Clásica con crema', 12000)` — esa función vive en `global.js`, pero `productos.js` la puede usar porque `global.js` se cargó primero. Los tres valores salen de los atributos `data-id`, `data-nombre` y `data-precio` de ese botón específico en el HTML.
3. Dentro de `agregarAlCarrito`: se lee el carrito actual con `obtenerCarrito()` (que internamente hace `localStorage.getItem` + `JSON.parse`). Supongamos que estaba vacío (`[]`).
4. El bucle `for` no encuentra ningún producto con `id === 'clasica'` (porque el carrito está vacío), así que `yaExiste` queda en `false`.
5. Como `!yaExiste` es verdadero, se hace `carrito.push({ id: 'clasica', nombre: 'Clásica con crema', precio: 12000, cantidad: 1 })`. Ahora el array en memoria tiene un elemento.
6. `guardarCarrito(carrito)` convierte ese array a texto JSON y lo guarda en `localStorage` bajo la clave `'carritoFresasBlessd'`.
7. `actualizarContador()` lee de nuevo el carrito (ya con el producto adentro), suma las cantidades (da 1), busca el `<span id="contadorCarrito">` en la navbar, le pone el texto `"1"` y le quita la clase `d-none` — **el numerito rojo aparece en pantalla en ese instante**, sin recargar la página.
8. De vuelta en el event listener del botón: el texto cambia a "Agregado ✓", y 1 segundo después (por el `setTimeout`) vuelve a decir "Agregar al carrito".
9. Si el usuario ahora entra a `carrito.html`: es una página distinta, con su propio HTML, así que todo se carga de cero: `global.js` (refresca el contador) y ahora `carrito.js` en vez de `productos.js`, cuyo `DOMContentLoaded` llama a `renderizarCarrito()`. Esta función encuentra el elemento `listaCarrito` (aquí sí existe), lee el carrito de `localStorage` (que sigue teniendo "Clásica con crema" porque `localStorage` persiste entre páginas), arma el HTML de la fila con `${producto.nombre}`, etc., lo inserta con `innerHTML`, calcula y muestra el total, y conecta los eventos de los botones +/−/Quitar de esa fila recién creada.

### Escenario B: en `carrito.html`, el usuario hace clic en el botón "−" de un producto que tiene 1 unidad

1. Ese botón "−" fue creado dinámicamente por `renderizarCarrito()` (en `carrito.js`), con `data-id="clasica"` y `data-delta="-1"`, y ya tiene su evento de clic conectado (lo conectó el propio `renderizarCarrito()` al final).
2. Al hacer clic, se ejecuta `cambiarCantidad('clasica', Number('-1'))` — definida en `global.js` —, es decir, `cambiarCantidad('clasica', -1)`.
3. El primer bucle encuentra el producto con `id === 'clasica'` y hace `cantidad = 1 + (-1) = 0`.
4. El segundo bucle arma `carritoFiltrado` incluyendo solo productos con `cantidad > 0` — como este quedó en 0, **no se incluye**, así que `carritoFiltrado` queda vacío `[]`.
5. `guardarCarrito([])` guarda un carrito vacío en `localStorage`.
6. `renderizarCarrito()` se vuelve a ejecutar: ahora `carrito.length === 0`, así que limpia la tabla, muestra el mensaje "Tu carrito está vacío" y oculta el bloque de resumen/tabla.
7. `actualizarContador()` refresca el numerito de la navbar a `0` y le vuelve a poner `d-none` (se oculta).

---

## 7. Glosario de términos

| Término | Qué significa |
|---|---|
| **DOM** | El árbol de elementos de la página en memoria, que JavaScript puede leer y modificar. |
| **Etiqueta semántica** | Etiqueta HTML cuyo nombre describe el significado del contenido (`<header>`, `<nav>`, `<section>`, `<article>`), no solo su apariencia. |
| **Clase (`class`)** | Atributo HTML que se puede repetir en varios elementos; se usa para aplicar el mismo estilo/comportamiento a varios elementos a la vez. |
| **Id (`id`)** | Atributo HTML **único** dentro de la página; identifica un solo elemento en particular. |
| **Atributo `data-*`** | Atributo HTML personalizado para guardar datos propios del proyecto, leíbles desde JS con `elemento.dataset.nombre`. |
| **BEM** | Convención de nombres para clases CSS: Bloque, Elemento (`__`), Modificador (`--`). |
| **Variable CSS (`--nombre`)** | Un valor reutilizable definido una vez (normalmente en `:root`) y usado en todo el CSS con `var(--nombre)`. |
| **Pseudo-clase** | Un estado especial de un elemento, como `:hover` (mientras el mouse está encima). |
| **Pseudo-elemento** | Un elemento "fantasma" generado por CSS, como `::after`, sin necesidad de agregar HTML. |
| **Flexbox** | Sistema de CSS (`display: flex`) para alinear y distribuir elementos en fila o columna. |
| **Grid de Bootstrap** | Sistema de 12 columnas (`row` + `col-*`) que arma layouts responsive sin escribir CSS a mano. |
| **Media query** | Bloque de CSS (`@media (...)`) que solo se aplica bajo ciertas condiciones, como un ancho de pantalla máximo. |
| **Responsive** | Que el diseño se adapta automáticamente a distintos tamaños de pantalla (celular, tablet, computador). |
| **`localStorage`** | Almacenamiento del navegador que persiste datos del sitio incluso después de cerrar la pestaña o el navegador. |
| **JSON** | Formato de texto estándar para representar datos (arrays, objetos) como texto plano. |
| **`JSON.stringify`** | Convierte un array/objeto de JS a texto JSON. |
| **`JSON.parse`** | Convierte texto JSON de vuelta a un array/objeto de JS. |
| **Array** | Lista ordenada de datos (`[ ]`). |
| **Objeto** | Colección de datos en pares clave-valor (`{ }`). |
| **Función** | Bloque de código reutilizable, con nombre, que puede recibir parámetros y devolver un resultado. |
| **Función flecha (`=>`)** | Forma corta y moderna de escribir funciones en JavaScript. |
| **Bucle `for`** | Estructura que repite un bloque de código mientras se cumpla una condición, recorriendo un array posición por posición. |
| **Evento** | Algo que ocurre en la página (clic, carga completa, etc.). |
| **`addEventListener`** | Conecta una función a un evento, para que se ejecute cuando ese evento ocurra. |
| **`DOMContentLoaded`** | Evento que se dispara cuando el HTML terminó de cargar y el DOM está listo para usarse. |
| **Template literal** | Texto entre comillas invertidas (`` ` ``) que permite insertar variables con `${variable}`. |
| **`innerHTML`** | Propiedad que permite leer o reemplazar todo el contenido HTML interno de un elemento desde JavaScript. |
| **`querySelectorAll`** | Busca **todos** los elementos que cumplan un selector CSS dado y devuelve una lista de ellos. |
| **`getElementById`** | Busca **un solo** elemento por su `id`. |

---

## 8. Posibles preguntas del profesor + respuestas

**¿Por qué separaron el CSS y el JavaScript en varios archivos en vez de uno solo?**
Para mantener organizado el proyecto, con el mismo criterio en los dos casos: un archivo `global` (`global.css` / `global.js`) tiene lo que se repite en las 3 páginas (navbar, footer, botones y variables en CSS; guardar/leer el carrito y el contador en JS), y cada página tiene su propio archivo con lo que solo a ella le pertenece (`inicio.css`/`inicio.js`, `productos.css`/`productos.js`, `carrito.css`/`carrito.js`). Así es más fácil de mantener, no hay que buscar entre cientos de líneas para encontrar algo de una sola página, y cada archivo de página puede confiar en que los elementos de SU página existen, sin comprobaciones de más.

**¿Cómo logran que el carrito se mantenga al cambiar de página, si no tienen backend/base de datos?**
Con `localStorage`, una API del navegador que guarda datos del lado del cliente, asociados al sitio, que persisten incluso después de cerrar la pestaña. El carrito (un array de productos) se convierte a texto con `JSON.stringify` para guardarlo, y se reconvierte con `JSON.parse` para leerlo, porque `localStorage` solo almacena texto.

**¿Por qué usan `data-id`, `data-nombre` y `data-precio` en los botones en vez de escribir la lista de productos directamente en el JavaScript?**
Para que el HTML sea la única "fuente de verdad" de qué productos existen y cuánto cuestan, y el JavaScript sea completamente genérico: la misma función `agregarAlCarrito` sirve para cualquier botón, sin importar cuántos productos haya ni cuáles sean, porque lee esos datos directamente del botón que se clickeó.

**¿Qué hace responsive a esta página? ¿Usan media queries?**
Principalmente el sistema de grillas de Bootstrap (`row` + `col-12 col-md-6 col-lg-4`, etc.), que cambia cuántas columnas por fila hay según el ancho de pantalla sin escribir CSS a mano. Además hay una media query manual en `inicio.css` (`@media (max-width: 991.98px)`) para ajustar padding y tamaños puntuales, y se usa `clamp()` en varias tipografías para que el tamaño de letra fluya suavemente entre un mínimo y un máximo según el ancho de pantalla.

**¿Por qué el carrito usa un array de objetos y no, por ejemplo, tres arrays separados (uno de ids, uno de nombres, uno de precios)?**
Porque cada producto tiene varios datos relacionados entre sí (id, nombre, precio, cantidad) y conviene mantenerlos agrupados en un solo objeto por producto. Así, el carrito completo es una lista de "paquetes" de datos completos, y es mucho más fácil de leer, recorrer y modificar que sincronizar tres listas separadas a mano.

**¿Cómo deciden qué quitar cuando "simplifican" el código, sin arriesgarse a romper algo?**
No se quita nada a ojo: antes de borrar una clase o un atributo, se comprueba que de verdad no hace nada. Por ejemplo, las clases `card-title`/`card-text` de Bootstrap se quitaron de los nombres y precios de producto porque, revisando el CSS real de Bootstrap, `card-title` solo pone un `margin-bottom` que de todas formas se sobreescribe con el de `producto__nombre` (que se carga después), y `card-text` solo hace algo si el elemento es el último hijo de su contenedor — y aquí nunca lo es, porque siempre hay un botón después. También se quitaron `id="inicio"`, `id="bendicion"` e `id="productos"` porque ningún link del sitio salta a ellos con `href="#..."`, y un `text-center` repetido en la vitrina de Inicio, porque ya se heredaba de la sección que lo envuelve. En los tres casos, se verificó primero (con el código de Bootstrap, o buscando quién usa cada `id`/clase en todo el proyecto) que quitarlos no cambia nada en pantalla — no es simplificar "a ojo", es confirmar que ese código no estaba haciendo nada.

**El fondo del hero (`banner.png`) usa `cover` y se recorta, pero las fotos de producto usan `contain` y no se recortan. ¿Por qué dos técnicas distintas en el mismo proyecto?**
Porque cumplen roles distintos. El banner del hero es **decorativo**: es un fondo detrás de un título y un botón, y lo importante es que llene todo el espacio de lado a lado sin dejar franjas vacías — que se recorte un poco de los bordes no molesta, porque nadie necesita ver "la foto completa" del fondo, solo necesita verse bien detrás del texto. Las fotos de producto, en cambio, **son el contenido**: el usuario las mira específicamente para saber qué está comprando, así que perder un pedazo (como pasaba antes, cuando se veía "recortada") sí es un problema real. Por eso el fondo usa `cover` (llenar sin dejar huecos, aunque se pierda algo de los bordes) y las fotos de producto usan `contain` (mostrar todo, aunque a veces quede un poco de espacio a los lados).

**¿Qué pasa si el usuario borra la caché del navegador?**
`localStorage` se borra junto con los datos de navegación del sitio, así que el carrito volvería a estar vacío. Es una limitación esperable de un proyecto sin backend/base de datos real: los datos viven únicamente en ese navegador y ese dispositivo.

**¿Por qué algunas comprobaciones tienen `if (elemento === null) { return; }`?**
Queda una sola, en `actualizarContador()` (`global.js`, sección 5.4): como ese archivo se carga en las 3 páginas, es buena práctica defensiva comprobar que el elemento existe antes de usarlo, aunque hoy por hoy siempre exista. En cambio, `renderizarCarrito()` (`carrito.js`, sección 5.8) **ya no tiene** esa comprobación: como ese archivo solo se carga en `carrito.html`, no hace falta — es justo una de las ventajas de haber separado el JavaScript por página en vez de tener un único archivo gigante adivinando en qué página está corriendo.

**¿Por qué usan `===` en vez de `==`?**
`===` compara valor y tipo de dato a la vez (comparación estricta), evitando conversiones automáticas de tipo que pueden dar resultados inesperados. Es la práctica recomendada en JavaScript moderno.

**¿Qué es y para qué sirve `JSON.stringify`/`JSON.parse` en este proyecto en concreto?**
`localStorage` solo puede guardar texto. El carrito, en memoria, es un array de objetos de JavaScript. `JSON.stringify` convierte ese array a un texto con formato JSON para poder guardarlo; `JSON.parse` hace lo contrario, convierte ese texto guardado de vuelta en un array/objeto real de JavaScript para poder recorrerlo y leer sus datos.

**¿Por qué convierten `boton.dataset.precio` con `Number(...)`?**
Porque **todos** los atributos `data-*` se leen siempre como texto (string), sin importar si "parecen" números. Si no se convirtieran, operaciones como sumar cantidades o multiplicar precio por cantidad terminarían concatenando texto en vez de hacer matemática real (ej. `"12000" * 2` en JS sí funciona porque `*` fuerza conversión numérica, pero sumas con `+` sobre dos strings se concatenan en vez de sumarse — por eso se convierte explícitamente para evitar cualquier comportamiento inesperado).

**¿Qué es BEM y por qué lo usan en las clases CSS?**
Es una convención de nombres (Bloque, Elemento, Modificador) que hace que el nombre de una clase describa por sí solo su relación con el resto del componente (ej. `hero__titulo` es "el título, dentro del bloque hero"; `btn--dulce` es "una variante dulce del botón base"). Evita choques de nombres entre distintas partes del sitio y hace el HTML más fácil de leer sin tener que revisar el CSS constantemente.

**¿Por qué los botones "Agregar al carrito" que genera JavaScript (en la tabla del carrito) tienen los eventos conectados dentro de la misma función que los crea (`renderizarCarrito`), y no en el bloque `DOMContentLoaded`?**
Porque esos botones (+, −, Quitar de cada fila) **no existen en el HTML original**: se crean dinámicamente cada vez que se llama `renderizarCarrito()`, usando `innerHTML`. `DOMContentLoaded` solo se dispara **una vez**, al cargar la página, cuando esos botones todavía no existen. Por eso hay que conectarles el evento de clic **cada vez que se recrean**, justo después de insertarlos en el DOM — si no, esos botones nuevos quedarían sin ningún evento conectado y no responderían a los clics.
