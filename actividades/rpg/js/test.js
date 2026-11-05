// =========================================================================
// PREGUNTAS Y RESPUESTAS PARA LA DEFENSA (APUNTES)
// =========================================================================

// --- SOBRE EL MODELO DE DATOS Y LA CLASE ---

// P: ¿Por qué guardas los precios en enteros como 1500 en lugar de usar decimales como 15.00?
// R: Para evitar los problemas de precisión de coma flotante nativos en JavaScript.
// Al operar con números enteros (céntimos) y dividir entre 100 solo al usar getPrecioFormateado,
// el cálculo matemático de los descuentos y las restas al oro del jugador siempre es exacto.

// P: ¿Qué hace exactamente "precioOriginal = null" en los parámetros del constructor?
// R: Es un parámetro con valor por defecto. Si al instanciar un "new Producto" no le paso ese último argumento, adopta el valor null. Dentro del constructor uso un ternario para igualarlo al precioEntero si es null, estableciendo así el precio base[cite: 1].

// P: ¿Por qué la función copiaConDescuento devuelve un "new Producto" en lugar de modificar el precio del producto actual[cite: 1]?
// R: Para mantener la inmutabilidad de los datos originales. Si muto el objeto, pierdo su precio original de forma permanente. Al devolver una instancia nueva, el catálogo base se mantiene intacto para futuras ofertas.

// --- SOBRE LOS ARRAYS Y LA LÓGICA ---

// P: ¿Qué significa la sintaxis let catalogoMercado = [...productosIniciales][cite: 1]?
// R: Es el operador de propagación o "spread operator". Desempaqueta los elementos del array original y los mete en uno nuevo, creando una copia superficial (shallow copy). Esto me permite modificar el catálogo activo sin alterar la lista original.

// P: ¿Por qué usas toLowerCase() y trim() al buscar por nombre[cite: 1]?
// R: "trim()" elimina los espacios en blanco accidentales que el usuario pueda poner al principio o al final del input. "toLowerCase()" normaliza tanto el texto buscado como el nombre del producto a minúsculas, haciendo que la búsqueda no sea sensible a mayúsculas.

// P: Tienes bucles "for" clásicos en filtrarPorRareza y buscarPorNombre[cite: 1]. ¿Qué deberías cambiar para conseguir hacer esto con métodos más modernos?
// R: Debería sustituir los bucles por el método .filter() de los arrays.
// Para filtrarPorRareza sería: return lista.filter(producto => producto.rareza === rareza);
// Para buscarPorNombre sería: return lista.filter(producto => producto.nombre.toLowerCase().includes(textoLimpio));

// P: ¿Cómo funciona el cálculo del índice aleatorio en generarOfertaAleatoria[cite: 1]?
// R: Math.random() genera un decimal entre 0 y 0.99. Al multiplicarlo por la longitud del array (criterios.length), me da un valor decimal dentro del rango del array. Math.floor() redondea ese decimal hacia abajo, devolviendo un índice entero válido para acceder a una posición aleatoria.

// --- SOBRE EL DOM Y LOS EVENTOS ---

// P: ¿Por qué haces "contenedorCatalogo.innerHTML = ''" al inicio de renderizarCatalogo[cite: 1]?
// R: Para vaciar el contenedor antes de dibujar las tarjetas. Si no limpio el HTML previo, al aplicar un filtro o generar una nueva oferta, las tarjetas nuevas se concatenarían debajo de las antiguas en lugar de reemplazarlas.

// P: ¿Cómo consigues que los botones de "Comprar" escuchen el evento click si se crean de forma dinámica[cite: 1]?
// R: Porque asigno los "addEventListener" mediante un querySelectorAll('.btn-comprar') justo dentro de la función renderizarCatalogo[cite: 1], inmediatamente después de que las tarjetas hayan sido inyectadas en el DOM.

// P: ¿Para qué sirve el atributo "data-index" que pones en el botón de comprar[cite: 1]?
// R: Es un atributo personalizado de HTML. Lo uso para almacenar la posición que ocupa ese producto específico dentro del array "lista" que se está renderizando[cite: 1]. Al hacer clic, leo ese índice para saber exactamente qué objeto pasarle a la función comprarProducto().

// P: ¿Cómo consigues que la notificación desaparezca sola después de mostrarse?
// R: Usando setTimeout en la función mostrarNotificacion[cite: 1]. Le paso una función flecha que le devuelve la clase 'oculto' al banner y le indico que se ejecute pasados 3000 milisegundos (3 segundos)[cite: 1].