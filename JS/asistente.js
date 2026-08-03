/* ===== Asistente de Estudio =====
   Preguntas de opción múltiple (A-E) sacadas de EXPLICACION-DEL-CODIGO.md,
   para practicar la sustentación como si preguntara el profesor.
   Hace preguntas al azar sin parar: cada "Siguiente pregunta" elige otra. */

const RUTA_ESPERANDO = "../IMG/blessd-esperando.jpg";
const RUTA_FELIZ = "../IMG/blessd-feliz.jpg";
const RUTA_DUDANDO = "../IMG/blessd-dudando.png";

const preguntas = [
  {
    pregunta: "¿Por qué el proyecto separa el código en HTML, CSS y JavaScript en vez de meter todo junto?",
    opciones: {
      A: "Porque Bootstrap obliga a usar archivos separados",
      B: "Porque es una regla de organización llamada separación de responsabilidades: HTML es contenido, CSS es apariencia y JavaScript es comportamiento",
      C: "Porque los navegadores no pueden leer HTML y CSS en el mismo archivo",
      D: "Porque así el proyecto pesa menos en el disco duro",
      E: "Porque el profesor exige que sean exactamente 3 archivos"
    },
    correcta: "B",
    explicacion: "Se llama separación de responsabilidades: cada archivo tiene un único trabajo (HTML = qué elementos hay, CSS = cómo se ven, JS = qué pasa cuando el usuario interactúa). Así, si quieren cambiar un color van solo al CSS, y si quieren cambiar un texto van solo al HTML, sin arriesgarse a romper otra parte del sitio."
  },
  {
    pregunta: "Dentro del CSS y el JavaScript, ¿qué función cumplen global.css y global.js frente a inicio.css, productos.css o carrito.js?",
    opciones: {
      A: "global.css y global.js son archivos viejos que ya no se usan",
      B: "Contienen únicamente el código de la página de inicio",
      C: "Contienen lo que se repite en las 3 páginas (navbar, footer, botones en CSS; guardar/leer el carrito y el contador en JS), y cada página tiene su propio archivo para lo que solo le pertenece a ella",
      D: "Son copias de seguridad por si se borra accidentalmente el resto del código",
      E: "Solo sirven para declarar las variables de color"
    },
    correcta: "C",
    explicacion: "Es el mismo patrón en CSS y en JS: el archivo global tiene lo compartido por las 3 páginas, y cada página (inicio, productos, carrito) tiene su propio archivo con lo que le pertenece solo a ella. Así se evita copiar y pegar el mismo código tres veces, y cada archivo de página puede confiar en que los elementos de SU página existen."
  },
  {
    pregunta: "¿Por qué este proyecto no tiene base de datos ni servidor propio?",
    opciones: {
      A: "Porque es un proyecto 100% front end: todo corre dentro del navegador del usuario, y el carrito se guarda en localStorage en vez de en un servidor",
      B: "Porque Bootstrap no es compatible con bases de datos",
      C: "Porque el HTML no permite conectarse a internet",
      D: "Porque los archivos JSON reemplazan por completo a una base de datos real",
      E: "Porque el navegador crea automáticamente un servidor local al abrir la página"
    },
    correcta: "A",
    explicacion: "Front end significa 'lo que corre en el navegador del usuario', sin servidor propio ni base de datos. Por eso el carrito no vive 'en internet': se guarda en localStorage, una cajita de almacenamiento que el navegador le da a cada sitio web."
  },
  {
    pregunta: "¿Qué es Bootstrap y para qué se usa en este proyecto?",
    opciones: {
      A: "Un lenguaje de programación alternativo a JavaScript",
      B: "Una librería de CSS y JavaScript ya hecha, con clases como row, col-lg-6 o navbar, que resuelve cosas como el diseño responsive sin programarlas desde cero",
      C: "Un programa que se instala en la computadora para editar imágenes",
      D: "Una base de datos gratuita para guardar productos",
      E: "Un servidor donde se aloja el sitio web"
    },
    correcta: "B",
    explicacion: "Bootstrap trae clases CSS y comportamientos de JavaScript ya programados (sistema de columnas responsive, menú hamburguesa, etc.), para no reinventar cosas que ya son un problema resuelto. Se 'instala' con un link (CSS) y un script (JS) que apuntan a una CDN, sin descargar nada a mano."
  },
  {
    pregunta: "¿Por qué el link de Bootstrap CSS va en el head, pero el script de Bootstrap JS va casi al final del body?",
    opciones: {
      A: "Es indiferente, da igual el orden",
      B: "El CSS se necesita antes de pintar la página (por eso va primero), y el JS conviene cargarlo al final para que los elementos del HTML ya existan cuando el script los busque",
      C: "El JS al final hace que la página cargue más lento a propósito",
      D: "El head no permite scripts, solo estilos",
      E: "El orden solo afecta el nombre de la pestaña del navegador"
    },
    correcta: "B",
    explicacion: "El navegador necesita el CSS antes de dibujar la página en pantalla, por eso va en el head y se descarga primero. El JavaScript, en cambio, suele buscar elementos del HTML para conectarles comportamiento; si se cargara antes de que existan, fallaría intentando encontrar algo que aún no está en el DOM."
  },
  {
    pregunta: "¿Qué hace la etiqueta <!DOCTYPE html> al principio del archivo?",
    opciones: {
      A: "Le dice al navegador que el archivo es HTML5, la versión moderna; sin ella algunos navegadores interpretan la página en modo raro y los estilos se pueden ver mal",
      B: "Carga automáticamente Bootstrap",
      C: "Define el color de fondo por defecto de la página",
      D: "Sirve para poner el título que aparece en la pestaña",
      E: "Es un comentario que el navegador ignora completamente"
    },
    correcta: "A",
    explicacion: "Es la primera línea obligatoria de cualquier documento HTML5 moderno. Le avisa al navegador qué versión de HTML está leyendo; sin ella, el navegador puede activar el 'quirks mode' (modo raro) y aplicar los estilos de forma inconsistente."
  },
  {
    pregunta: "¿Qué logra específicamente la línea <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">?",
    opciones: {
      A: "Cambia el idioma de la página automáticamente",
      B: "Es la línea que hace que el sitio sea responsive: usa el ancho real del dispositivo y arranca sin zoom, en vez de mostrar una versión de escritorio diminuta en el celular",
      C: "Define cuántas columnas tiene la grilla de Bootstrap",
      D: "Carga las tipografías de Google Fonts",
      E: "Evita que el usuario pueda hacer zoom nunca"
    },
    correcta: "B",
    explicacion: "width=device-width le dice al navegador que use el ancho real de la pantalla del dispositivo, no que simule un monitor de computador; initial-scale=1.0 hace que arranque sin zoom aplicado. Sin esta línea, el sitio se vería como una versión de escritorio diminuta en el celular."
  },
  {
    pregunta: "¿Por qué importa el orden en el que están puestos los tres <link> de CSS (Bootstrap, global.css y el CSS propio de la página)?",
    opciones: {
      A: "No importa el orden, el navegador los reordena solo",
      B: "CSS se aplica de arriba hacia abajo, y si dos reglas compiten por el mismo elemento gana la que está más abajo; por eso Bootstrap va primero y el CSS propio al final, para poder 'pisar' estilos de Bootstrap si hace falta",
      C: "El primer <link> es el único que realmente se carga",
      D: "El orden solo afecta la velocidad de internet, no el diseño",
      E: "Los <link> deben ir en orden alfabético por convención del W3C"
    },
    correcta: "B",
    explicacion: "Cuando dos reglas CSS distintas aplican al mismo elemento, gana la que el navegador leyó más abajo. Por eso se pone primero Bootstrap (lo genérico), luego global.css, y al final el CSS propio de cada página, para que el estilo propio del proyecto pueda sobreescribir el de Bootstrap si es necesario."
  },
  {
    pregunta: "En un link como href=\"../CSS/global.css\", ¿qué significa el ../ al principio de la ruta?",
    opciones: {
      A: "Que el archivo está en internet, no en la computadora",
      B: "Es un error de tipeo que el navegador ignora",
      C: "Sube una carpeta: como el HTML está dentro de la carpeta HTML/, necesita subir un nivel y entrar a CSS/ para encontrar el archivo (ruta relativa)",
      D: "Indica que el archivo CSS es opcional",
      E: "Duplica el archivo CSS automáticamente"
    },
    correcta: "C",
    explicacion: "Es una ruta relativa: describe dónde está el archivo tomando como punto de partida la carpeta donde está el HTML actual. Como index.html vive dentro de HTML/, el ../ sube un nivel (a la raíz del proyecto) y desde ahí entra a CSS/ para llegar al archivo."
  },
  {
    pregunta: "¿Qué significa que <header>, <nav>, <section> y <article> sean etiquetas 'semánticas'?",
    opciones: {
      A: "Que tienen una animación especial en CSS",
      B: "Que solo funcionan si se usa Bootstrap",
      C: "Que su nombre describe el significado de su contenido (no solo su apariencia), a diferencia de un <div> genérico que no dice nada sobre lo que contiene",
      D: "Que son etiquetas exclusivas de JavaScript, no de HTML",
      E: "Que no se pueden usar junto con clases CSS"
    },
    correcta: "C",
    explicacion: "Un <div> es una caja genérica que no comunica nada sobre su contenido; en cambio <header>, <nav>, <section> o <article> le dicen al navegador, a un lector de pantalla y a buscadores como Google qué tipo de contenido hay ahí. Eso ayuda a la estructura y a la accesibilidad del documento."
  },
  {
    pregunta: "En la clase class=\"navbar navbar-expand-lg navbar-marca\", ¿qué está pasando?",
    opciones: {
      A: "Es un error, un elemento solo puede tener una clase",
      B: "Son tres clases distintas puestas una al lado de otra (separadas por espacio): navbar y navbar-expand-lg son de Bootstrap, y navbar-marca es una clase propia del proyecto definida en global.css",
      C: "navbar-marca reemplaza a las otras dos clases automáticamente",
      D: "Solo la última clase de la lista realmente se aplica",
      E: "Son tres nombres distintos para el mismo elemento HTML"
    },
    correcta: "B",
    explicacion: "Un elemento puede tener tantas clases como necesite, separadas por espacios. Aquí navbar y navbar-expand-lg vienen de Bootstrap (comportamiento base de la barra y el punto de quiebre para el menú hamburguesa), mientras navbar-marca es una clase propia del proyecto con el fondo crema y el efecto de vidrio esmerilado."
  },
  {
    pregunta: "¿Qué hace exactamente la clase navbar-expand-lg de Bootstrap?",
    opciones: {
      A: "Agranda el logo de la marca",
      B: "En pantallas grandes (lg, 992px o más) muestra el menú expandido en línea, y en pantallas más chicas lo convierte en menú hamburguesa",
      C: "Hace que la navbar cambie de color al hacer scroll",
      D: "Oculta la navbar por completo en celulares",
      E: "Agrega automáticamente más opciones al menú"
    },
    correcta: "B",
    explicacion: "Ese es justo el mecanismo detrás del comportamiento responsive del menú: desde el punto de quiebre lg (≥992px) el menú se ve expandido y en línea; por debajo de ese ancho, Bootstrap lo convierte automáticamente en menú hamburguesa."
  },
  {
    pregunta: "¿Cuál es la diferencia clave entre un id y una class en HTML?",
    opciones: {
      A: "No hay ninguna diferencia real, son sinónimos",
      B: "class solo sirve para CSS y id solo sirve para JavaScript",
      C: "id es único dentro de la página (identifica un solo elemento), mientras que class se puede repetir en varios elementos para aplicarles el mismo estilo o comportamiento",
      D: "id siempre va en mayúsculas y class en minúsculas",
      E: "class es más moderna y reemplaza por completo a id"
    },
    correcta: "C",
    explicacion: "id identifica a un elemento específico y único en toda la página, como un nombre propio (por ejemplo id=\"navbarNav\" o id=\"contadorCarrito\"). class, en cambio, se puede reutilizar en muchos elementos distintos para darles el mismo estilo o para engancharlos todos al mismo comportamiento de JavaScript."
  },
  {
    pregunta: "¿Para qué sirven los atributos data-bs-toggle=\"collapse\" y data-bs-target=\"#navbarNav\" en el botón hamburguesa?",
    opciones: {
      A: "Son atributos decorativos que no afectan el funcionamiento",
      B: "Le dicen a Bootstrap JS qué hacer al hacer clic: activar el comportamiento collapse (mostrar/ocultar) sobre el elemento con id navbarNav",
      C: "Cambian el idioma del menú",
      D: "Sirven únicamente para el lector de pantalla, no tienen función visual",
      E: "Guardan el número de clics que ha recibido el botón"
    },
    correcta: "B",
    explicacion: "Son atributos data-* que Bootstrap JS lee para funcionar: data-bs-toggle=\"collapse\" indica qué comportamiento activar, y data-bs-target=\"#navbarNav\" indica sobre cuál elemento (usando el mismo # que en CSS para seleccionar por id). Son los únicos dos atributos necesarios para que el botón funcione."
  },
  {
    pregunta: "¿Por qué el botón hamburguesa lleva type=\"button\"?",
    opciones: {
      A: "Para que Bootstrap le aplique un color distinto",
      B: "Para evitar que, si algún día quedara dentro de un <form>, se comporte accidentalmente como botón de 'enviar formulario'",
      C: "Es obligatorio en todos los botones de HTML, no tiene una razón especial",
      D: "Para que el ícono de las 3 rayitas aparezca correctamente",
      E: "Porque sin eso el botón no sería clickeable"
    },
    correcta: "B",
    explicacion: "Por defecto, un <button> dentro de un <form> puede comportarse como 'submit' (enviar el formulario) si no se le indica lo contrario. Poner type=\"button\" es buena práctica en cualquier botón que no envía nada, para evitar ese comportamiento accidental."
  },
  {
    pregunta: "El carrito muestra un ícono 🛒 seguido de un badge con id=\"contadorCarrito\" que empieza oculto con la clase d-none. ¿Por qué empieza oculto?",
    opciones: {
      A: "Porque el carrito empieza vacío al cargar la página, y JavaScript le quita la clase d-none apenas hay al menos un producto",
      B: "Porque Bootstrap oculta todos los badges por defecto y hay que activarlos manualmente cada vez",
      C: "Porque es un elemento decorativo que nunca se muestra",
      D: "Es un error del HTML que no afecta el funcionamiento",
      E: "Porque el número solo se muestra en la versión de escritorio"
    },
    correcta: "A",
    explicacion: "d-none es la utilidad de Bootstrap para display: none (oculto). Al cargar cualquier página, el carrito puede estar vacío, así que el numerito arranca oculto; la función actualizarContador() de global.js le quita esa clase apenas detecta que hay al menos un producto guardado."
  },
  {
    pregunta: "¿Por qué es tan importante el id=\"contadorCarrito\" del badge del carrito?",
    opciones: {
      A: "Es puramente decorativo, no cumple ninguna función técnica",
      B: "Es el gancho que usa global.js para encontrar ese elemento con getElementById y escribir ahí el número de productos del carrito",
      C: "Sirve para que Google indexe mejor la página",
      D: "Bootstrap lo necesita para calcular el ancho de la navbar",
      E: "Solo se usa para aplicarle un color rojo con CSS"
    },
    correcta: "B",
    explicacion: "Ese id es el punto de conexión entre HTML y JavaScript: la función actualizarContador() en global.js usa document.getElementById(\"contadorCarrito\") para encontrar exactamente ese <span> y actualizar su texto y su visibilidad cada vez que cambia el carrito."
  },
  {
    pregunta: "En el sistema de grillas (grid) de Bootstrap, ¿en cuántas columnas invisibles se divide el ancho disponible dentro de una fila (row)?",
    opciones: {
      A: "En 4 columnas",
      B: "En 10 columnas",
      C: "En 12 columnas",
      D: "En 16 columnas",
      E: "En un número distinto según la página"
    },
    correcta: "C",
    explicacion: "Bootstrap siempre divide el ancho de una .row en 12 columnas invisibles. Por eso col-12 ocupa el 100% (las 12 columnas) y col-lg-6 ocupa la mitad (6 de 12) desde el punto de quiebre lg en adelante."
  },
  {
    pregunta: "¿Por qué las dos mitades del hero se ven una encima de la otra en celular, pero lado a lado en computador, usando col-12 col-lg-6?",
    opciones: {
      A: "Porque hay una media query escrita a mano que cambia el diseño",
      B: "Porque JavaScript detecta el tamaño de pantalla y reordena los elementos",
      C: "col-12 significa ancho completo (una columna sola por fila) en cualquier pantalla, pero col-lg-6 cambia eso a la mitad del ancho solo desde el punto de quiebre lg (≥992px) en adelante; así Bootstrap resuelve el responsive sin escribir CSS a mano",
      D: "Porque hay dos archivos HTML distintos, uno para celular y otro para computador",
      E: "Es una casualidad, no depende de las clases usadas"
    },
    correcta: "C",
    explicacion: "col-12 aplica siempre (ancho completo, apiladas una sobre otra). col-lg-6 solo se activa a partir de 992px de ancho de pantalla y hace que cada mitad ocupe 6 de las 12 columnas, es decir la mitad, quedando lado a lado. Es responsive resuelto completamente con clases de Bootstrap."
  },
  {
    pregunta: "¿Qué hace la clase de utilidad g-0 en class=\"row g-0 hero__fila\"?",
    opciones: {
      A: "Agranda el espacio (gutter) entre columnas al máximo",
      B: "Gutter en nivel 0: quita el espacio/padding entre columnas, para que las dos mitades del hero queden totalmente pegadas sin franja blanca en el medio",
      C: "Convierte la fila en una columna",
      D: "Oculta la fila en pantallas pequeñas",
      E: "Es una clase propia del proyecto, no de Bootstrap"
    },
    correcta: "B",
    explicacion: "g-0 quiere decir 'gutter 0': elimina el espacio (padding) que normalmente separa las columnas dentro de una fila de Bootstrap. Se usa en el hero para que las dos mitades queden pegadas entre sí, sin ninguna franja blanca separándolas."
  },
  {
    pregunta: "Según la convención BEM usada en el proyecto (por ejemplo hero__lado--urbano), ¿qué representa la parte con doble guion medio (--)?",
    opciones: {
      A: "El bloque completo, como hero o producto",
      B: "Un modificador: una variación de un bloque o elemento, como la variante urbana o la variante dulce del mismo componente base",
      C: "Un error de sintaxis en el nombre de la clase",
      D: "Un elemento hijo dentro de otro bloque distinto",
      E: "Una clase exclusiva de Bootstrap"
    },
    correcta: "B",
    explicacion: "En BEM (Bloque, Elemento, Modificador), el doble guion bajo (__) marca un Elemento (una parte que solo tiene sentido dentro de su bloque), y el doble guion medio (--) marca un Modificador (una variación del bloque o elemento, como hero__lado--urbano frente a hero__lado--dulce)."
  },
  {
    pregunta: "¿Por qué el proyecto usa BEM (hero__titulo, btn--dulce, carrito__total) en vez de nombres de clase sueltos?",
    opciones: {
      A: "Porque Bootstrap exige ese formato de nombres",
      B: "Evita choques de nombres entre secciones distintas del sitio y permite entender, con solo leer el HTML, a qué componente pertenece cada clase sin tener que revisar el CSS",
      C: "Porque hace que el CSS pese menos en kilobytes",
      D: "Es un requisito técnico para que funcione el localStorage",
      E: "Porque así el navegador carga la página más rápido"
    },
    correcta: "B",
    explicacion: "BEM es una convención de nombres muy usada en la industria: con solo leer hero__titulo o producto__precio se entiende de inmediato a qué bloque pertenece esa clase, y evita que, por ejemplo, .producto__precio choque con otra clase llamada solo .precio en otra parte del sitio."
  },
  {
    pregunta: "¿Cuál es la diferencia entre usar un <a> y un <button> para un elemento con apariencia de botón?",
    opciones: {
      A: "No hay ninguna diferencia, son completamente intercambiables",
      B: "<a> se usa cuando el elemento navega a otra página (como 'Ver el menú'), y <button> cuando dispara una acción en la misma página sin cambiar de página (como 'Agregar al carrito')",
      C: "<button> solo puede usarse dentro de un <form>",
      D: "<a> nunca puede tener clases CSS aplicadas",
      E: "<button> siempre recarga la página al hacer clic"
    },
    correcta: "B",
    explicacion: "Aunque ambos se puedan ver igual gracias al CSS (clases btn, btn--dulce, etc.), la elección depende de qué hacen realmente: si el elemento navega a otra página se usa <a href=\"...\">, y si ejecuta una acción de JavaScript sin cambiar de página (como agregar un producto al carrito) se usa <button>."
  },
  {
    pregunta: "En el botón 'Agregar al carrito', ¿qué información llevan los atributos data-id, data-nombre y data-precio?",
    opciones: {
      A: "Son solo para darle estilo CSS distinto a cada botón",
      B: "Guardan directamente en el HTML los datos del producto (id, nombre y precio) para que JavaScript los pueda leer con boton.dataset, sin tener que duplicar una lista de productos en el código JS",
      C: "Sirven para ordenar los botones alfabéticamente",
      D: "Le indican al navegador en qué idioma mostrar el botón",
      E: "Solo funcionan si el usuario ha iniciado sesión"
    },
    correcta: "B",
    explicacion: "Son atributos data-* personalizados: HTML permite inventar cualquier atributo que empiece con data- para guardar información propia del proyecto. Así, cada botón 'sabe' qué producto representa, y una sola función de JavaScript (agregarAlCarrito) sirve para todos los botones, sin importar cuántos productos haya."
  },
  {
    pregunta: "Si un botón tiene el atributo data-precio=\"18000\" en el HTML, ¿cómo se lee ese valor desde JavaScript?",
    opciones: {
      A: "Con boton.precio directamente",
      B: "Con boton.getAttribute(\"precio\") solamente",
      C: "Con boton.dataset.precio; el navegador convierte automáticamente data-precio del HTML en dataset.precio en JavaScript",
      D: "No se puede leer, hay que escribirlo de nuevo en el JS",
      E: "Con boton.data.precio"
    },
    correcta: "C",
    explicacion: "El navegador hace un mapeo automático: cualquier atributo data-nombre-lo-que-sea del HTML queda disponible como boton.dataset.nombreLoQueSea (o, si no tiene guiones, igual como aquí: data-precio se convierte en dataset.precio) en JavaScript."
  },
  {
    pregunta: "¿Por qué la clase agregar-carrito no tiene ningún estilo CSS asociado en el proyecto?",
    opciones: {
      A: "Es un error que hay que corregir",
      B: "Porque es una clase pensada puramente como gancho para JavaScript: se usa con document.querySelectorAll('.agregar-carrito') para encontrar todos esos botones y conectarles la función de agregar al carrito, separada de las clases que sí dan estilo",
      C: "Porque Bootstrap ya le da estilo automáticamente por su nombre",
      D: "Porque solo se usa en carrito.html",
      E: "Porque el CSS no permite estilizar botones con esa clase"
    },
    correcta: "B",
    explicacion: "Es una práctica común: usar una clase dedicada únicamente para 'engancharse' desde JavaScript (buscarla con querySelectorAll), separada de las clases que sí controlan la apariencia (como btn, btn--dulce). Así queda claro cuál es el propósito de cada clase con solo leer su nombre."
  },
  {
    pregunta: "¿Por qué el atributo alt en <img src=\"...\" alt=\"...\"> nunca debería faltar?",
    opciones: {
      A: "Porque sin alt la imagen no se muestra en absoluto",
      B: "Porque describe la imagen para lectores de pantalla, para cuando la imagen no carga, y para buscadores como Google Imágenes; además debe describir lo que se ve, no repetir el nombre del archivo",
      C: "Porque alt define el tamaño en píxeles de la imagen",
      D: "Porque Bootstrap lo requiere para aplicar el sistema de grillas",
      E: "Porque sin alt la página no puede tener más de una imagen"
    },
    correcta: "B",
    explicacion: "alt es el texto alternativo de una imagen: lo usa un lector de pantalla para describirla a una persona con discapacidad visual, aparece si la imagen no llega a cargar, y ayuda a que buscadores de imágenes entiendan qué se ve. Siempre debe describir el contenido real, no el nombre del archivo."
  },
  {
    pregunta: "En carrito.html, ¿por qué el <tbody id=\"listaCarrito\"> aparece completamente vacío en el HTML original?",
    opciones: {
      A: "Es un error que se corrige solo al recargar la página",
      B: "Porque esa tabla no se usa nunca",
      C: "Porque su contenido se genera dinámicamente con JavaScript: carrito.js construye cada fila (<tr>) según lo que haya guardado en el carrito en ese momento, y las inserta ahí",
      D: "Porque Bootstrap la llena automáticamente con datos de ejemplo",
      E: "Porque el navegador la completa usando datos del servidor"
    },
    correcta: "C",
    explicacion: "carrito.html es más un 'molde vacío' que JavaScript llena: no hay productos fijos escritos a mano, porque el contenido depende de lo que el usuario tenga guardado en localStorage en ese momento. Por eso el id=\"listaCarrito\" es un gancho fundamental para que JS sepa dónde insertar las filas."
  },
  {
    pregunta: "En carrito.html hay dos bloques, #carritoVacio y #resumenCarrito, que nunca se muestran al mismo tiempo. ¿Quién decide cuál de los dos se ve?",
    opciones: {
      A: "El usuario, con un botón para elegir manualmente",
      B: "Bootstrap, según el tamaño de la pantalla",
      C: "JavaScript, agregando o quitando la clase d-none de cada bloque según si el carrito tiene o no productos",
      D: "El CSS, con una media query que detecta si hay productos",
      E: "Es aleatorio en cada carga de la página"
    },
    correcta: "C",
    explicacion: "Es JavaScript (concretamente renderizarCarrito() en carrito.js) el que decide: si el carrito está vacío, le agrega d-none a #resumenCarrito y se lo quita a #carritoVacio; si hay productos, es al revés. Por eso nunca se ven los dos bloques a la vez."
  },
  {
    pregunta: "¿Qué son las variables CSS declaradas dentro de :root, como --rojo-fresa: #e63950?",
    opciones: {
      A: "Comentarios que el navegador ignora",
      B: "Valores reutilizables definidos una sola vez y usados en todo el CSS con var(--nombre); si cambian ahí, se actualizan automáticamente en todos los lugares donde se usan",
      C: "Una función exclusiva de JavaScript que no existe en CSS puro",
      D: "Nombres de archivos de imagen",
      E: "Un tipo especial de clase que solo puede usarse una vez"
    },
    correcta: "B",
    explicacion: ":root apunta al elemento raíz del documento y es el lugar convencional para declarar variables CSS (custom properties). El doble guion medio (--) al principio es obligatorio. Su ventaja es que, si mañana cambia el tono de rojo de la marca, se cambia en un solo lugar y se actualiza en todo el proyecto."
  },
  {
    pregunta: "¿Qué hace el selector universal * al principio del CSS con margin: 0; padding: 0; box-sizing: border-box;?",
    opciones: {
      A: "Solo afecta a las etiquetas <div>",
      B: "Selecciona todos los elementos de la página sin excepción, para quitar los márgenes/rellenos por defecto de cada navegador y controlar el diseño de forma predecible",
      C: "Selecciona únicamente los elementos que tengan una clase asignada",
      D: "Es un error de sintaxis que el navegador ignora",
      E: "Solo se aplica en pantallas grandes"
    },
    correcta: "B",
    explicacion: "El asterisco (*) es el selector universal: aplica la regla a absolutamente todos los elementos. Cada navegador trae por defecto márgenes y rellenos distintos para etiquetas como h1, p o ul; este reset los pone en cero a propósito para que el diseño se vea igual en todos los navegadores."
  },
  {
    pregunta: "¿Qué cambia exactamente box-sizing: border-box respecto al comportamiento por defecto de CSS?",
    opciones: {
      A: "Hace que todos los elementos sean cuadrados",
      B: "El padding y el border se descuentan del width declarado en vez de sumarse encima, así un elemento con width: 200px mide exactamente 200px sin importar cuánto padding tenga",
      C: "Elimina por completo la posibilidad de usar padding",
      D: "Solo afecta a las imágenes, no a otros elementos",
      E: "Convierte automáticamente los px en porcentajes"
    },
    correcta: "B",
    explicacion: "Por defecto en CSS, si un elemento mide width: 200px y se le agrega padding: 20px, termina midiendo 240px de ancho real (200 + 20 + 20). Con border-box, el padding y el border se descuentan de esos 200px en vez de sumarse, haciendo el cálculo de tamaños mucho más predecible, sobre todo en la grilla."
  },
  {
    pregunta: "¿Qué es una pseudo-clase como :hover, usada en .btn:hover?",
    opciones: {
      A: "Una clase que hay que escribir manualmente en el HTML",
      B: "Un estado especial de un elemento que se activa automáticamente según una condición (en este caso, mientras el mouse está encima), sin que aparezca escrito en el HTML",
      C: "Una etiqueta HTML nueva creada por Bootstrap",
      D: "Un tipo de variable de JavaScript",
      E: "Un error común que se debe evitar en CSS moderno"
    },
    correcta: "B",
    explicacion: ":hover es una pseudo-clase: un estado especial de un elemento que el navegador activa y desactiva solo, según una condición (aquí, mientras el mouse está encima). No se escribe en el HTML como una clase normal, sino directamente en el selector CSS."
  },
  {
    pregunta: "¿Qué es un pseudo-elemento como ::after, usado para dibujar la línea animada debajo de los links del menú?",
    opciones: {
      A: "Una etiqueta HTML oculta que hay que agregar manualmente",
      B: "Un elemento 'fantasma' generado por CSS justo después del contenido real de un elemento, sin necesidad de agregar una etiqueta HTML nueva; requiere la propiedad content para dibujarse",
      C: "Una función de JavaScript que crea elementos en el DOM",
      D: "Un atributo exclusivo de las imágenes",
      E: "Una forma de comentar código CSS"
    },
    correcta: "B",
    explicacion: "::after crea un elemento generado por CSS, adicional al contenido real, sin tocar el HTML. Es obligatorio darle content: \"\" (aunque esté vacío) para que se dibuje. Se usa mucho para detalles decorativos, como la línea que crece debajo de un link al pasar el mouse."
  },
  {
    pregunta: "¿Qué logra la propiedad position: sticky; top: 0; en la navbar?",
    opciones: {
      A: "Hace que la navbar desaparezca al hacer scroll",
      B: "La navbar se queda pegada arriba de la pantalla cuando el usuario hace scroll hacia abajo, en vez de desaparecer con el resto del contenido",
      C: "Centra la navbar horizontalmente en la pantalla",
      D: "Convierte la navbar en un menú hamburguesa siempre",
      E: "Hace que la navbar solo aparezca en la página de inicio"
    },
    correcta: "B",
    explicacion: "sticky se comporta como una posición normal hasta que, al hacer scroll, el elemento llega al top: 0 (el borde superior de la ventana), y ahí se 'pega' quedándose fija mientras el resto de la página sigue desplazándose."
  },
  {
    pregunta: "¿Para qué sirve z-index: 100 en la navbar?",
    opciones: {
      A: "Define el ancho máximo de la navbar en píxeles",
      B: "Controla el orden de apilamiento cuando elementos se superponen; un z-index alto asegura que la navbar quede siempre encima del resto del contenido al hacer scroll",
      C: "Cuenta cuántos elementos hay dentro de la navbar",
      D: "Es una propiedad exclusiva de Bootstrap, no existe en CSS puro",
      E: "Cambia el color de fondo de la navbar"
    },
    correcta: "B",
    explicacion: "z-index controla qué elemento queda 'arriba' cuando dos o más se superponen visualmente. Un valor alto como 100 asegura que la navbar quede siempre por encima de otros elementos (como imágenes) que puedan quedar debajo al hacer scroll."
  },
  {
    pregunta: "¿Qué efecto visual logra backdrop-filter: blur(6px) en la navbar?",
    opciones: {
      A: "Desenfoca la navbar misma para que se vea borrosa",
      B: "Desenfoca lo que hay detrás del elemento (no el elemento mismo), creando el efecto 'vidrio esmerilado' que se ve borroso al pasar contenido por debajo al hacer scroll",
      C: "Agranda el texto de los links del menú",
      D: "Agrega una sombra negra alrededor de la navbar",
      E: "Cambia la fuente tipográfica de la navbar"
    },
    correcta: "B",
    explicacion: "backdrop-filter aplica el efecto sobre lo que está detrás del elemento, no sobre el elemento en sí. blur(6px) desenfoca ese fondo, logrando el típico efecto de 'vidrio esmerilado' muy usado en interfaces modernas."
  },
  {
    pregunta: "En un color como rgba(255, 248, 241, 0.92), ¿qué representa el último valor, 0.92?",
    opciones: {
      A: "El tono de rojo del color",
      B: "El grosor del borde",
      C: "La opacidad del color: 92% opaco, es decir, ligeramente transparente",
      D: "El tamaño de fuente en rem",
      E: "La posición horizontal del elemento"
    },
    correcta: "C",
    explicacion: "rgba significa rojo, verde, azul y alfa (opacidad). El cuarto valor va de 0 (totalmente transparente) a 1 (totalmente opaco); 0.92 significa 92% opaco, dejando notar sutilmente el contenido que pasa por debajo."
  },
  {
    pregunta: "¿Qué es flexbox (display: flex), usado por ejemplo en el footer del sitio?",
    opciones: {
      A: "Un sistema exclusivo de Bootstrap que no existe en CSS puro",
      B: "Uno de los sistemas de layout de CSS moderno, que permite alinear y distribuir fácilmente a los hijos de un contenedor en fila o en columna",
      C: "Una forma de animar imágenes",
      D: "Un tipo de fuente tipográfica",
      E: "Un atributo exclusivo de las tablas HTML"
    },
    correcta: "B",
    explicacion: "display: flex convierte a un elemento en un contenedor flexbox, uno de los dos grandes sistemas de layout de CSS moderno (el otro es Grid). Permite controlar fácilmente cómo se acomodan y alinean sus elementos hijos, por ejemplo con flex-direction: column y align-items: center."
  },
  {
    pregunta: "¿Qué significa min-height: 88vh en el fondo del hero?",
    opciones: {
      A: "Que la altura mínima es de 88 píxeles fijos",
      B: "vh es una unidad relativa a la altura de la pantalla visible; 88vh significa 'al menos el 88% de la altura de la ventana del navegador', para que el hero ocupe casi toda la pantalla sin importar el tamaño del monitor",
      C: "Que el hero solo se muestra en el 88% de los navegadores",
      D: "Que la imagen de fondo se repite 88 veces",
      E: "Que el hero tarda 88 milisegundos en cargar"
    },
    correcta: "B",
    explicacion: "vh (viewport height) es una unidad relativa al alto visible de la ventana del navegador. min-height: 88vh asegura que el hero mida como mínimo el 88% de esa altura, adaptándose automáticamente sin importar el tamaño de pantalla del dispositivo."
  },
  {
    pregunta: "El fondo del hero combina un linear-gradient semitransparente encima de una foto (url('../IMG/banner.png')). ¿Para qué sirve poner el degradado encima de la foto?",
    opciones: {
      A: "Para que la foto cargue más rápido",
      B: "Para que el texto blanco de los títulos siga siendo legible sin importar qué tan clara u oscura sea la zona de la foto que quede detrás; es un truco común para oscurecer/tintar un fondo",
      C: "Porque sin el degradado la imagen no se puede mostrar",
      D: "Para cambiar el idioma del texto sobre la imagen",
      E: "Para que la imagen se vea en blanco y negro"
    },
    correcta: "B",
    explicacion: "La propiedad background acepta varias capas separadas por comas, y la primera capa escrita queda encima. El degradado semitransparente tiñe la foto para que, sin importar qué tan clara u oscura sea esa zona de la imagen, el texto que va encima siga siendo legible."
  },
  {
    pregunta: "¿Qué hace la función clamp() usada en font-size: clamp(2.2rem, 5vw, 3.6rem)?",
    opciones: {
      A: "Fuerza el tamaño de letra a ser exactamente 5vw sin excepción",
      B: "Calcula un tamaño de letra que se adapta fluidamente al ancho de pantalla: usa 5vw como valor preferido, pero nunca baja de 2.2rem ni sube de 3.6rem, sin necesitar media queries",
      C: "Cambia el tamaño de letra solo cuando el usuario hace clic",
      D: "Es una propiedad exclusiva de Bootstrap",
      E: "Redondea el tamaño de letra al número entero más cercano"
    },
    correcta: "B",
    explicacion: "clamp(mínimo, preferido, máximo) permite que un valor (como el tamaño de letra) crezca y se achique suavemente entre un mínimo y un máximo, según el ancho de pantalla, sin necesitar escribir media queries a mano para cada punto de quiebre."
  },
  {
    pregunta: "¿Cuál es la diferencia entre object-fit: cover (usado en el fondo del hero) y object-fit: contain (usado en las fotos de producto)?",
    opciones: {
      A: "cover y contain hacen exactamente lo mismo",
      B: "cover llena todo el espacio recortando lo que sobra si es necesario; contain encoge la imagen entera hasta que quepa completa dentro de la caja, sin cortar nada (aunque a veces queden espacios libres a los costados)",
      C: "contain solo funciona con imágenes PNG",
      D: "cover solo se puede usar en el fondo, nunca en un <img>",
      E: "contain hace que la imagen se repita en mosaico"
    },
    correcta: "B",
    explicacion: "Se eligen según el rol de la imagen: el banner del hero es decorativo, así que usa cover (llena todo sin huecos, aunque se recorte algo de los bordes). Las fotos de producto son el contenido que el usuario necesita ver completo, así que usan contain (nunca se corta nada, aunque a veces quede algo de espacio libre)."
  },
  {
    pregunta: "¿Qué logra aspect-ratio: 4 / 5 en la caja de la imagen del producto estrella?",
    opciones: {
      A: "Define que la imagen debe medir exactamente 4 por 5 píxeles",
      B: "Le dice a la caja qué proporción de ancho contra alto debe mantener siempre; como el ancho ya es 100% del contenedor, el alto se calcula solo, adaptándose automáticamente a cualquier tamaño de pantalla",
      C: "Rota la imagen 4 grados hacia la derecha",
      D: "Solo funciona en computadores, no en celulares",
      E: "Hace que la imagen se vea en blanco y negro"
    },
    correcta: "B",
    explicacion: "aspect-ratio fija la proporción entre ancho y alto de una caja. Con el ancho ya definido como 100% del contenedor, el alto se calcula automáticamente a partir de esa proporción (4 de ancho por cada 5 de alto), adaptándose a cualquier tamaño de pantalla sin necesitar reglas distintas por punto de quiebre."
  },
  {
    pregunta: "¿Qué es una media query como @media (max-width: 991.98px) { ... }?",
    opciones: {
      A: "Un tipo de imagen optimizada para redes sociales",
      B: "Un bloque de CSS que solo se aplica cuando se cumple una condición, en este caso cuando el ancho de la ventana es de 991.98px o menos",
      C: "Una función de JavaScript para detectar clics",
      D: "Una clase de Bootstrap para centrar contenido",
      E: "Un comentario que documenta el código sin afectar el diseño"
    },
    correcta: "B",
    explicacion: "Una media query es un bloque de CSS condicional: las reglas de adentro solo se aplican si se cumple la condición indicada (aquí, un ancho de pantalla máximo). El valor 991.98px coincide justo con el límite que usa Bootstrap para su punto de quiebre lg (que empieza en 992px)."
  },
  {
    pregunta: "¿Qué es localStorage y qué papel cumple en este proyecto?",
    opciones: {
      A: "Una base de datos que vive en un servidor remoto",
      B: "Un espacio de almacenamiento propio de cada sitio web que el navegador ofrece, y que persiste aunque se cierre la pestaña o el navegador; es donde se guarda el carrito de compras",
      C: "Una carpeta del disco duro que el usuario debe crear manualmente",
      D: "Una función exclusiva de Bootstrap",
      E: "Una copia temporal que se borra apenas se recarga la página"
    },
    correcta: "B",
    explicacion: "localStorage es una API incorporada en los navegadores modernos: un espacio de almacenamiento propio de cada sitio web, que sobrevive aunque se cierre la pestaña, el navegador o se apague el computador. Es justo lo que permite que el carrito siga ahí al cambiar de página."
  },
  {
    pregunta: "¿Por qué el código usa JSON.stringify(carrito) antes de guardar el carrito en localStorage?",
    opciones: {
      A: "Para hacer el carrito más liviano en memoria",
      B: "Porque localStorage solo puede guardar texto (strings), nunca arrays u objetos directamente; JSON.stringify convierte el array de JavaScript a un texto en formato JSON",
      C: "Para traducir el contenido del carrito a otro idioma",
      D: "Porque sin eso el carrito se duplicaría",
      E: "Es un paso opcional que no cambia nada"
    },
    correcta: "B",
    explicacion: "localStorage funciona como un diccionario de texto a texto: solo entiende strings. Como el carrito en memoria es un array de objetos de JavaScript, hay que convertirlo primero a texto con JSON.stringify antes de poder guardarlo."
  },
  {
    pregunta: "Dentro de obtenerCarrito(), ¿para qué se usa JSON.parse(guardado) al leer el carrito?",
    opciones: {
      A: "Para borrar el carrito guardado",
      B: "Para convertir el texto en formato JSON que estaba guardado en localStorage de vuelta en un array/objeto real de JavaScript, y así poder recorrerlo con un bucle o leer sus propiedades",
      C: "Para calcular el precio total del carrito",
      D: "Para revisar si hay errores de conexión a internet",
      E: "Para cambiar el nombre de los productos"
    },
    correcta: "B",
    explicacion: "Es la operación inversa a JSON.stringify: JSON.parse toma un texto en formato JSON (lo que realmente hay guardado en localStorage) y lo reconvierte en un array/objeto de JavaScript de verdad, para poder trabajar con él (recorrerlo, leer producto.precio, etc.)."
  },
  {
    pregunta: "En obtenerCarrito(), ¿qué pasa si localStorage.getItem(CLAVE_CARRITO) devuelve null?",
    opciones: {
      A: "El programa se detiene con un error",
      B: "La función devuelve un array vacío [], indicando que todavía no hay ningún producto guardado (por ejemplo, la primera vez que alguien visita el sitio)",
      C: "Se crea automáticamente un producto de prueba",
      D: "La página se recarga sola",
      E: "Se muestra un mensaje de error al usuario"
    },
    correcta: "B",
    explicacion: "null significa que nunca se ha guardado nada bajo esa clave. La función lo detecta con if (guardado === null) y, en ese caso, devuelve [] (un array vacío) para representar 'no hay ningún producto todavía', en vez de intentar convertir algo que no existe."
  },
  {
    pregunta: "¿Qué hace la función formatearPrecio(precio) usando precio.toLocaleString('es-CO')?",
    opciones: {
      A: "Convierte el precio a dólares",
      B: "Recibe un número (como 18000) y devuelve un texto con formato de precio colombiano, usando el punto como separador de miles (ej. \"$18.000\") en vez de la coma que se usa en otras regiones",
      C: "Redondea el precio al número entero más cercano",
      D: "Calcula automáticamente un descuento",
      E: "Convierte el precio de texto a número"
    },
    correcta: "B",
    explicacion: "toLocaleString('es-CO') formatea un número según las convenciones de español de Colombia, que usa el punto como separador de miles. Luego se concatena el símbolo '$' al principio con el operador +, armando el texto final, por ejemplo \"$18.000\"."
  },
  {
    pregunta: "En actualizarContador(), ¿qué hace exactamente contador.classList.toggle('d-none', totalUnidades === 0)?",
    opciones: {
      A: "Cambia el color del contador según el total",
      B: "Si totalUnidades es 0, agrega la clase d-none (ocultando el contador); si no es 0, la quita (mostrándolo), gracias a la forma de dos argumentos de toggle",
      C: "Suma 1 al contador cada vez que se llama",
      D: "Elimina el contador del DOM permanentemente",
      E: "Cambia el texto del contador a la palabra 'vacío'"
    },
    correcta: "B",
    explicacion: "classList.toggle(clase, condición) con dos argumentos agrega la clase si la condición es true, y la quita si es false. Aquí, si el total de unidades es 0, se agrega d-none (se oculta el numerito); si hay al menos una unidad, se quita d-none (se muestra)."
  },
  {
    pregunta: "En actualizarContador() hay una comprobación if (contador === null) { return; }. ¿Por qué existe justo en esta función?",
    opciones: {
      A: "Porque el elemento nunca existe realmente",
      B: "Es buena práctica defensiva porque global.js se carga en las 3 páginas; esta línea evita que el programa se rompa si algún día se reutilizara en una página futura sin ícono de carrito en su navbar",
      C: "Porque JavaScript lo exige por sintaxis en toda función",
      D: "Para detectar si el usuario tiene JavaScript desactivado",
      E: "Porque sin esa línea el carrito se vaciaría solo"
    },
    correcta: "B",
    explicacion: "global.js es compartido por las 3 páginas, así que esta función no puede asumir con total certeza que el elemento contadorCarrito siempre existirá en cualquier página futura. Es una comprobación defensiva: evita un error si algún día se usa en una página sin ese elemento. En cambio renderizarCarrito(), en carrito.js, no la necesita porque ese archivo solo corre en carrito.html."
  },
  {
    pregunta: "En agregarAlCarrito(id, nombre, precio), ¿qué hace la variable yaExiste?",
    opciones: {
      A: "Guarda el precio total del carrito",
      B: "Es una bandera booleana que 'recuerda' si el producto ya estaba en el carrito, revisada dentro de un bucle for; según su valor al final, decide si sumar 1 a la cantidad existente o agregar el producto como nuevo",
      C: "Cuenta cuántas veces se ha abierto la página",
      D: "Solo existe para mostrar un mensaje de error",
      E: "Guarda el nombre del último producto agregado"
    },
    correcta: "B",
    explicacion: "yaExiste empieza en false. El bucle for recorre todo el carrito comparando carrito[i].id con el id recibido; si encuentra coincidencia, le suma 1 a la cantidad y pone yaExiste = true. Después del bucle, if (!yaExiste) decide si hace falta agregar el producto como nuevo con carrito.push(...)."
  },
  {
    pregunta: "¿Por qué agregarAlCarrito no simplemente agrega un objeto nuevo cada vez que se hace clic en el mismo producto?",
    opciones: {
      A: "Porque JavaScript lo prohíbe técnicamente",
      B: "Porque primero revisa con un bucle for si el producto ya está en el carrito (comparando por id); si ya está, le suma 1 a su cantidad en vez de duplicarlo como una fila nueva",
      C: "Porque Bootstrap bloquea los clics repetidos",
      D: "Porque localStorage solo permite un producto a la vez",
      E: "Porque el botón se desactiva después del primer clic"
    },
    correcta: "B",
    explicacion: "La lógica completa es: busca si el producto ya está (comparando id); si está, súmale 1 a su cantidad; si no está, agrégalo como nuevo con cantidad 1. Esto evita que el mismo producto aparezca duplicado como varias filas distintas si se agrega más de una vez."
  },
  {
    pregunta: "En un bucle for clásico como for (let i = 0; i < carrito.length; i++) { ... }, ¿qué hace cada una de sus tres partes?",
    opciones: {
      A: "Las tres partes hacen exactamente lo mismo, están repetidas por seguridad",
      B: "let i = 0 crea el contador inicial; i < carrito.length es la condición que se revisa antes de cada vuelta; i++ incrementa el contador en 1 al final de cada vuelta, hasta recorrer todos los elementos del array",
      C: "Solo sirve para recorrer arrays de números, nunca de objetos",
      D: "i < carrito.length define cuántas veces se repite el bucle en milisegundos",
      E: "i++ se ejecuta antes de empezar el bucle, no al final de cada vuelta"
    },
    correcta: "B",
    explicacion: "let i = 0 arranca un contador desde el índice 0 (los arrays siempre empiezan en la posición 0). i < carrito.length es la condición que decide si el bucle sigue. i++ (equivalente a i = i + 1) avanza el contador al final de cada vuelta, hasta cubrir todos los elementos del array uno por uno."
  },
  {
    pregunta: "En cambiarCantidad(id, delta), ¿qué representa el parámetro delta?",
    opciones: {
      A: "El precio del producto",
      B: "Vale 1 si se hizo clic en el botón '+' o -1 si se hizo clic en el botón '−'; se suma directamente a la cantidad actual del producto (sumar -1 equivale a restar 1)",
      C: "El id del producto que se va a eliminar",
      D: "La cantidad total de productos distintos en el carrito",
      E: "Un identificador único generado al azar"
    },
    correcta: "B",
    explicacion: "delta llega como 1 o -1 según qué botón se haya presionado (viene del atributo data-delta generado dinámicamente en cada fila). carrito[i].cantidad = carrito[i].cantidad + delta suma ese valor a la cantidad actual, por lo que sumar -1 tiene el efecto de restar una unidad."
  },
  {
    pregunta: "Dentro de cambiarCantidad(), hay un segundo bucle for que arma un array llamado carritoFiltrado. ¿Para qué sirve ese segundo bucle?",
    opciones: {
      A: "Para ordenar los productos alfabéticamente",
      B: "Para hacer una limpieza manual: arma un array nuevo que solo incluye los productos con cantidad mayor a 0, así un producto que llegó a 0 unidades desaparece por completo del carrito en vez de mostrarse con '0 unidades'",
      C: "Para calcular el precio total del carrito",
      D: "Para duplicar cada producto una vez más",
      E: "Para revisar si hay productos repetidos por nombre"
    },
    correcta: "B",
    explicacion: "Después de sumar el delta, algún producto puede haber quedado con cantidad 0 (si le dieron '−' hasta el final). Este segundo bucle recorre el carrito de nuevo y solo agrega a carritoFiltrado los productos con cantidad mayor a 0, haciendo manualmente lo mismo que haría un método como .filter()."
  },
  {
    pregunta: "¿Qué diferencia hay entre quitarDelCarrito(id) y cambiarCantidad(id, -1) aplicado varias veces?",
    opciones: {
      A: "Son exactamente la misma función con dos nombres distintos",
      B: "quitarDelCarrito elimina el producto por completo con un solo clic, sin importar cuántas unidades tuviera, comparando con !== (diferente) en vez de sumar o restar cantidades",
      C: "quitarDelCarrito solo funciona en index.html",
      D: "cambiarCantidad no puede usarse con productos que tengan más de una unidad",
      E: "quitarDelCarrito aumenta el precio del producto"
    },
    correcta: "B",
    explicacion: "quitarDelCarrito(id) arma un array nuevo con todos los productos EXCEPTO el que tiene ese id (usando el operador !==, desigualdad estricta), quitándolo de una sola vez sin importar cuántas unidades tuviera. cambiarCantidad, en cambio, solo suma o resta de a una unidad por clic."
  },
  {
    pregunta: "¿Qué hace vaciarCarrito()?",
    opciones: {
      A: "Resta 1 a la cantidad de todos los productos",
      B: "Sobreescribe directamente el carrito guardado con un array vacío [], borrando todo de una sola vez sin revisar producto por producto",
      C: "Elimina solo el producto más caro del carrito",
      D: "Cierra la sesión del usuario",
      E: "Recarga la página sin guardar cambios"
    },
    correcta: "B",
    explicacion: "Es la función más simple del archivo: en vez de recorrer el carrito y decidir qué quitar, simplemente llama a guardarCarrito([]), reemplazando todo lo guardado por un array vacío de una sola vez."
  },
  {
    pregunta: "¿Por qué renderizarCarrito(), a diferencia de actualizarContador(), no necesita comprobar if (contenedor === null)?",
    opciones: {
      A: "Porque renderizarCarrito nunca se ejecuta realmente",
      B: "Porque carrito.js, donde vive renderizarCarrito(), solo se carga en carrito.html; ese archivo puede confiar en que el elemento listaCarrito siempre existe ahí, a diferencia de global.js que se comparte entre las 3 páginas",
      C: "Porque JavaScript agrega esa comprobación automáticamente",
      D: "Porque listaCarrito es un id que nunca puede fallar",
      E: "Porque Bootstrap ya valida los elementos por su cuenta"
    },
    correcta: "B",
    explicacion: "Esa es justamente la ventaja de haber separado el JavaScript por página: carrito.js solo se carga en carrito.html, así que puede confiar plenamente en que los elementos propios de esa página (como listaCarrito) siempre están presentes, sin necesitar comprobaciones defensivas de más."
  },
  {
    pregunta: "Dentro de renderizarCarrito(), ¿qué es exactamente un template literal como `<tr><td>${producto.nombre}</td></tr>`?",
    opciones: {
      A: "Un tipo de comentario en JavaScript",
      B: "Un texto entre comillas invertidas (backticks) que permite insertar variables directamente dentro del texto usando ${ }, reemplazándolas automáticamente por su valor real",
      C: "Una función exclusiva de Bootstrap para crear tablas",
      D: "Un archivo CSS separado para las filas de la tabla",
      E: "Una forma de declarar una variable constante"
    },
    correcta: "B",
    explicacion: "Un template literal usa comillas invertidas (`` ` ``) en vez de comillas simples o dobles, y permite interpolar variables con ${variable}, que se reemplaza automáticamente por su valor. Aquí se usa para armar el HTML de cada fila de la tabla sin tener que concatenar todo a mano con +."
  },
  {
    pregunta: "¿Qué hace exactamente la línea contenedor.innerHTML = filasHtml; dentro de renderizarCarrito()?",
    opciones: {
      A: "Solo guarda el texto en una variable, sin mostrarlo en pantalla",
      B: "Reemplaza todo el contenido HTML interno del elemento por el texto nuevo, interpretándolo como HTML real: las etiquetas <tr>, <td>, etc. se convierten en filas y celdas reales de la tabla, no en texto visible con símbolos",
      C: "Borra el elemento contenedor por completo",
      D: "Cambia el color de fondo de la tabla",
      E: "Solo funciona si el texto no contiene etiquetas HTML"
    },
    correcta: "B",
    explicacion: "innerHTML es una propiedad de cualquier elemento del DOM que representa todo su contenido interno. Asignarle un texto hace que el navegador reemplace ese contenido interpretándolo como HTML real; por eso las etiquetas de la tabla se dibujan como filas y celdas de verdad, y es justo la línea que 'dibuja' la tabla en pantalla."
  },
  {
    pregunta: "¿Por qué los eventos de clic de los botones +, − y Quitar se conectan DENTRO de la misma función renderizarCarrito(), después de insertar el HTML, y no en el bloque DOMContentLoaded?",
    opciones: {
      A: "Porque DOMContentLoaded no funciona en carrito.html",
      B: "Porque esos botones no existen en el HTML original: se crean dinámicamente cada vez que se llama renderizarCarrito(); DOMContentLoaded solo se dispara una vez al cargar la página, cuando esos botones todavía no existen",
      C: "Porque es más rápido conectarlos ahí por razones de rendimiento",
      D: "Porque esos botones nunca necesitan eventos de clic",
      E: "Es simplemente una preferencia de estilo sin ninguna razón técnica"
    },
    correcta: "B",
    explicacion: "Un botón que no existía antes en el DOM no puede tener ya un evento conectado. Como los botones +, −, Quitar se generan como texto nuevo cada vez que se llama renderizarCarrito() (con innerHTML), hay que conectarles el evento cada vez que se recrean, justo después de insertarlos, o quedarían sin responder a los clics."
  },
  {
    pregunta: "¿Por qué en los botones + y −, el código hace Number(boton.dataset.delta) en vez de usar boton.dataset.delta directamente?",
    opciones: {
      A: "Number() cambia el color del texto del botón",
      B: "Porque todos los atributos data-* se leen siempre como texto (string), aunque el valor parezca un número; sin convertirlo, sumar cantidades terminaría concatenando texto en vez de hacer una suma matemática real",
      C: "Porque Number() elimina el atributo data-delta después de leerlo",
      D: "Es un paso decorativo que no cambia el resultado final",
      E: "Porque boton.dataset.delta no existe sin Number()"
    },
    correcta: "B",
    explicacion: "Los atributos data-* siempre llegan como texto, sin importar si 'parecen' números. Si no se convirtiera, una operación con + terminaría concatenando texto (por ejemplo, 3 + \"1\" da el texto \"31\", no el número 4). Number(...) convierte ese texto a un número real antes de sumarlo a la cantidad."
  },
  {
    pregunta: "¿Qué evento especial es DOMContentLoaded y por qué el código espera a que ocurra antes de buscar elementos del DOM?",
    opciones: {
      A: "Se dispara cada vez que el usuario hace scroll",
      B: "Es un evento que el navegador dispara una sola vez, justo cuando terminó de leer y armar todo el HTML de la página; es el momento seguro para buscar elementos y conectarles eventos sin riesgo de que aún no existan",
      C: "Se dispara solo cuando todas las imágenes terminaron de cargar",
      D: "Es un evento exclusivo de Bootstrap, no existe en JavaScript puro",
      E: "Se dispara cada vez que se hace clic en cualquier parte de la página"
    },
    correcta: "B",
    explicacion: "DOMContentLoaded se dispara automáticamente una sola vez, cuando el HTML ya terminó de leerse y el DOM está completo (sin necesidad de esperar a que carguen las imágenes). Si el JavaScript buscara elementos antes de este momento, podría intentar encontrar algo que técnicamente todavía no existe."
  },
  {
    pregunta: "¿Puede haber más de un document.addEventListener('DOMContentLoaded', ...) en la misma página, repartido en distintos archivos JS?",
    opciones: {
      A: "No, solo puede haber uno por página o el navegador da error",
      B: "Sí: cada archivo (global.js y el propio de la página) puede tener su propio DOMContentLoaded, y todos se ejecutan de forma independiente cuando el evento ocurre, sin conflicto entre ellos",
      C: "Sí, pero solo el último definido se ejecuta realmente",
      D: "No, hay que combinarlos manualmente en un solo archivo",
      E: "Sí, pero solo funcionan en carrito.html"
    },
    correcta: "B",
    explicacion: "Este evento se puede escuchar varias veces desde archivos distintos: global.js tiene el suyo (para actualizarContador), y cada página tiene el suyo propio (para conectar sus propios botones). Todos se disparan de forma independiente cuando el HTML termina de cargar, sin pisarse entre sí."
  },
  {
    pregunta: "¿Por qué global.js siempre se carga PRIMERO en el HTML, antes de inicio.js, productos.js o carrito.js?",
    opciones: {
      A: "Por convención alfabética únicamente",
      B: "Porque inicio.js, productos.js y carrito.js usan funciones definidas en global.js (como agregarAlCarrito); esa función debe existir ya en un script cargado antes de que otro script más abajo intente usarla",
      C: "Porque global.js es más pesado y tarda más en descargar",
      D: "No importa el orden, JavaScript los ordena solo",
      E: "Porque así lo exige Bootstrap"
    },
    correcta: "B",
    explicacion: "Cuando se cargan varios scripts normales uno después del otro, todos comparten el mismo espacio de funciones globales, pero el orden importa: una función debe estar definida en un script ya cargado antes de que otro script, más abajo, intente usarla. Por eso global.js siempre va primero."
  },
  {
    pregunta: "¿Cuál es la diferencia entre === (igualdad estricta) y == en JavaScript, y por qué el proyecto usa ===?",
    opciones: {
      A: "No hay ninguna diferencia real entre ambos",
      B: "=== compara valor y tipo de dato al mismo tiempo, evitando conversiones automáticas de tipo que == sí hace y que pueden dar resultados inesperados; por eso es la práctica recomendada en JavaScript moderno",
      C: "== es más rápido de ejecutar, por eso se prefiere en proyectos grandes",
      D: "=== solo puede usarse con números, nunca con texto",
      E: "== solo se puede usar dentro de un bucle for"
    },
    correcta: "B",
    explicacion: "=== (igualdad estricta) compara el valor y el tipo de dato a la vez, sin hacer conversiones automáticas. == a veces 'adivina' conversiones de tipo que pueden dar resultados confusos e inesperados. Por eso, en JavaScript moderno, siempre se prefiere ===."
  },
  {
    pregunta: "En inicio.js y productos.js, después de agregar un producto, el botón cambia su texto a 'Agregado ✓' y luego vuelve a decir 'Agregar al carrito' un segundo después. ¿Qué función de JavaScript hace posible ese regreso automático?",
    opciones: {
      A: "DOMContentLoaded",
      B: "setTimeout, que ejecuta una función una sola vez después de esperar el tiempo indicado en milisegundos (aquí, 1000 = 1 segundo)",
      C: "JSON.parse",
      D: "querySelectorAll",
      E: "localStorage.setItem"
    },
    correcta: "B",
    explicacion: "setTimeout(funcion, milisegundos) programa una función para que se ejecute una sola vez después de esperar el tiempo indicado. Aquí, después de 1000 milisegundos (1 segundo), vuelve a poner el texto del botón como 'Agregar al carrito', listo para un próximo clic."
  },
  {
    pregunta: "¿Cuál es la diferencia entre document.getElementById('algo') y document.querySelectorAll('.algo')?",
    opciones: {
      A: "Son exactamente lo mismo, solo cambia el nombre",
      B: "getElementById busca un solo elemento por su id (que es único en la página); querySelectorAll busca TODOS los elementos que cumplan un selector CSS dado y devuelve una lista de ellos",
      C: "querySelectorAll solo funciona con clases, nunca con ids",
      D: "getElementById solo funciona dentro de un bucle for",
      E: "querySelectorAll modifica el HTML automáticamente al buscar"
    },
    correcta: "B",
    explicacion: "getElementById busca un único elemento, aprovechando que un id es irrepetible en la página. querySelectorAll, en cambio, devuelve una lista con todos los elementos que cumplan el selector (por ejemplo, todos los botones con la clase .agregar-carrito), permitiendo recorrerlos con forEach."
  },
  {
    pregunta: "Cuando un usuario agrega 'Clásica con crema' en productos.html y luego entra a carrito.html, ¿por qué el producto sigue apareciendo en el carrito?",
    opciones: {
      A: "Porque las dos páginas comparten el mismo archivo HTML",
      B: "Porque el producto se guardó en localStorage, que persiste entre páginas distintas del mismo sitio; al cargar carrito.html, renderizarCarrito() vuelve a leer ese mismo localStorage y encuentra el producto ahí",
      C: "Porque el navegador recuerda la última página visitada y copia sus datos",
      D: "Porque Bootstrap sincroniza automáticamente el contenido entre páginas",
      E: "Es una coincidencia, en realidad no debería pasar"
    },
    correcta: "B",
    explicacion: "localStorage no depende de qué página HTML esté abierta: pertenece al sitio completo, dentro del mismo navegador. Por eso, al entrar a carrito.html, JavaScript vuelve a leer la misma clave del carrito y encuentra el producto que se guardó desde productos.html."
  },
  {
    pregunta: "¿Qué pasaría con el carrito guardado si el usuario borra la caché o los datos de navegación del navegador?",
    opciones: {
      A: "No pasa nada, el carrito se recupera automáticamente desde un servidor",
      B: "localStorage se borra junto con los datos de navegación del sitio, así que el carrito volvería a estar vacío; es una limitación esperable de un proyecto sin backend real",
      C: "El carrito se transfiere automáticamente a otro navegador",
      D: "Solo se borran los nombres de los productos, no las cantidades",
      E: "El sitio deja de funcionar por completo"
    },
    correcta: "B",
    explicacion: "Como todo el proyecto es 100% front end, los datos del carrito viven únicamente en localStorage, dentro de ese navegador y ese dispositivo específico. Si se borra la caché/datos de navegación, ese almacenamiento se pierde y el carrito vuelve a estar vacío, sin nada que lo respalde en un servidor."
  },
  {
    pregunta: "Un producto en el carrito se representa como un objeto: { id: 'bendicion', nombre: 'La Bendición', precio: 18000, cantidad: 1 }. ¿Por qué se usa un objeto y no, por ejemplo, tres arrays separados (uno de ids, uno de nombres, uno de precios)?",
    opciones: {
      A: "Porque JavaScript no permite crear arrays separados",
      B: "Porque cada producto tiene varios datos relacionados entre sí, y conviene mantenerlos agrupados en un solo objeto por producto; así el carrito es una lista de 'paquetes' completos, mucho más fácil de leer y modificar que sincronizar listas separadas a mano",
      C: "Porque los objetos ocupan menos espacio en memoria siempre",
      D: "Porque localStorage exige que los datos sean objetos",
      E: "No hay ninguna ventaja real, es solo una preferencia estética"
    },
    correcta: "B",
    explicacion: "Con un objeto por producto, todos sus datos relacionados (id, nombre, precio, cantidad) viajan juntos como un solo 'paquete'. El carrito completo es entonces un array de esos paquetes, mucho más simple de recorrer y modificar que tener que mantener sincronizadas tres listas separadas a mano."
  }
];

// ===== Estado del asistente =====
let indicePreguntaActual = -1;
let indiceAnterior = -1;
let respondida = false;
let aciertos = 0;
let totalRespondidas = 0;

const elementoImagen = document.getElementById("imagenBlessd");
const elementoPregunta = document.getElementById("textoPregunta");
const elementoOpciones = document.getElementById("listaOpciones");
const elementoBloqueExplicacion = document.getElementById("bloqueExplicacion");
const elementoResultado = document.getElementById("textoResultado");
const elementoExplicacion = document.getElementById("textoExplicacion");
const elementoSiguiente = document.getElementById("botonSiguiente");
const elementoContadorAciertos = document.getElementById("contadorAciertos");
const elementoContadorTotal = document.getElementById("contadorTotal");

function elegirIndiceAleatorio() {
  if (preguntas.length === 1) {
    return 0;
  }
  let indice = Math.floor(Math.random() * preguntas.length);
  while (indice === indiceAnterior) {
    indice = Math.floor(Math.random() * preguntas.length);
  }
  return indice;
}

function mostrarPregunta() {
  indiceAnterior = indicePreguntaActual;
  indicePreguntaActual = elegirIndiceAleatorio();
  respondida = false;

  const pregunta = preguntas[indicePreguntaActual];

  elementoImagen.src = RUTA_ESPERANDO;
  elementoImagen.alt = "Blessd esperando tu respuesta";
  elementoPregunta.textContent = pregunta.pregunta;

  elementoOpciones.innerHTML = "";
  const letras = ["A", "B", "C", "D", "E"];

  letras.forEach((letra) => {
    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "opcion";
    boton.dataset.letra = letra;

    const spanLetra = document.createElement("span");
    spanLetra.className = "opcion__letra";
    spanLetra.textContent = letra;

    const spanTexto = document.createElement("span");
    spanTexto.textContent = pregunta.opciones[letra];

    boton.appendChild(spanLetra);
    boton.appendChild(spanTexto);

    boton.addEventListener("click", () => {
      seleccionarOpcion(letra);
    });

    elementoOpciones.appendChild(boton);
  });

  elementoBloqueExplicacion.classList.add("d-none");
  elementoSiguiente.classList.add("d-none");
}

function seleccionarOpcion(letraSeleccionada) {
  if (respondida) {
    return;
  }
  respondida = true;

  const pregunta = preguntas[indicePreguntaActual];
  const esCorrecta = letraSeleccionada === pregunta.correcta;

  const botones = elementoOpciones.querySelectorAll(".opcion");
  botones.forEach((boton) => {
    boton.disabled = true;
    if (boton.dataset.letra === pregunta.correcta) {
      boton.classList.add("opcion--correcta");
    } else if (boton.dataset.letra === letraSeleccionada) {
      boton.classList.add("opcion--incorrecta");
    }
  });

  totalRespondidas = totalRespondidas + 1;

  if (esCorrecta) {
    aciertos = aciertos + 1;
    elementoImagen.src = RUTA_FELIZ;
    elementoImagen.alt = "Blessd feliz porque respondiste bien";
    elementoResultado.textContent = "¡Correcto! Un poco más a fondo:";
    elementoResultado.className = "asistente__resultado asistente__resultado--correcto";
  } else {
    elementoImagen.src = RUTA_DUDANDO;
    elementoImagen.alt = "Blessd dudando porque la respuesta fue incorrecta";
    elementoResultado.textContent = "Incorrecto. La respuesta correcta era la " + pregunta.correcta + ". Te explico qué es y cómo funciona:";
    elementoResultado.className = "asistente__resultado asistente__resultado--incorrecto";
  }

  elementoExplicacion.textContent = pregunta.explicacion;
  elementoBloqueExplicacion.classList.remove("d-none");
  elementoSiguiente.classList.remove("d-none");

  actualizarMarcador();
}

function actualizarMarcador() {
  elementoContadorAciertos.textContent = aciertos;
  elementoContadorTotal.textContent = totalRespondidas;
}

elementoSiguiente.addEventListener("click", () => {
  mostrarPregunta();
});

document.addEventListener("DOMContentLoaded", () => {
  mostrarPregunta();
});
