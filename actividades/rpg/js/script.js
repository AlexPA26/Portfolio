// =========================================================================
// 1. MODELO DE DATOS Y CATÁLOGO
// =========================================================================

class Producto
{
  constructor(nombre, imagen, precioEntero, rareza, tipo, bonus, precioOriginal = null)
  {
    this.nombre = nombre
    this.imagen = imagen
    this.precioEntero = precioEntero
    this.rareza = rareza
    this.tipo = tipo
    this.bonus = bonus
    // Si no se pasa un precio original se asume que es el precio base
    this.precioOriginal = precioOriginal !== null ? precioOriginal : precioEntero
  }

  getPrecioFormateado(precioAFormatear = this.precioEntero)
  {
    let euros = precioAFormatear / 100;
    return euros.toFixed(2).replace('.', ',') + ' €';
  }

  aplicarEfecto(jugador)
  {
    if (this.tipo === "Arma")
    {
      if (this.rareza === "Legendaria")
      {
        jugador.ataque += (this.bonus * 2);
      }
      else
      {
        jugador.ataque += this.bonus;
      }
      
    }
    else if (this.tipo === "Armadura")
    {
      if (this.rareza === "Legendaria")
      {
        jugador.defensa += (this.bonus * 2);
      }
      else
      {
        jugador.defensa += this.bonus;
      }
      
    }
    else if (this.tipo === "Consumible")
    {
      jugador.vida += this.bonus;
    }
  }

  copiaConDescuento(porcentaje)
  {
    let cantidadDescontada = this.precioOriginal * (porcentaje / 100)
    let nuevoPrecio = this.precioOriginal - cantidadDescontada
    
    return new Producto
    (
      this.nombre,
      this.imagen,
      nuevoPrecio,
      this.rareza,
      this.tipo,
      this.bonus,
      this.precioOriginal // mismo precio sin rebajar
    )
  }
}


// =========================================================================
// 2. MERCADO Y CATALOGO PREDEFINIDO
// =========================================================================

const datosIniciales = [
  {
    nombre: "Espada de Hierro",
    imagen: "https://images.unsplash.com/photo-1440711085503-89d8ec455791?q=80&w=1098&auto=format&fit=crop",
    precioEntero: 1500, rareza: "Común", tipo: "Arma", bonus: 25
  },
  {
    nombre: "Escudo Antiguo",
    imagen: "https://images.unsplash.com/photo-1778940454592-f9e9595ade99?q=80&w=687&auto=format&fit=crop",
    precioEntero: 2000, rareza: "Común", tipo: "Armadura", bonus: 15
  },
  {
    nombre: "Poción de Vida",
    imagen: "https://images.unsplash.com/photo-1610706936277-f01646bb90c6?q=80&w=687&auto=format&fit=crop",
    precioEntero: 500, rareza: "Común", tipo: "Consumible", bonus: 200
  },
  {
    nombre: "Mandoble Rúnico",
    imagen: "https://images.unsplash.com/photo-1594399430386-913fd5defaa4?q=80&w=1170&auto=format&fit=crop",
    precioEntero: 4500, rareza: "Rara", tipo: "Arma", bonus: 60
  },
  {
    nombre: "Coraza Solar",
    imagen: "https://images.unsplash.com/photo-1664998064103-4075dad55a79?q=80&w=687&auto=format&fit=crop",
    precioEntero: 6000, rareza: "Legendaria", tipo: "Armadura", bonus: 80
  },
  {
    nombre: "Elixir Ancestral",
    imagen: "https://plus.unsplash.com/premium_photo-1695385055449-73d3748a0d9c?q=80&w=1170&auto=format&fit=crop",
    precioEntero: 2500, rareza: "Rara", tipo: "Consumible", bonus: 500
  }
];

// Convertimos el array en bruto a objetos de la clase Producto
const productosIniciales = []
for (let ind = 0; ind < datosIniciales.length; ind++)
{
  let dato = datosIniciales[ind]
  let nuevoProducto = new Producto(dato.nombre, dato.imagen, dato.precioEntero, dato.rareza, dato.tipo, dato.bonus)
  productosIniciales.push(nuevoProducto)
}

// Array de trabajo dinámico
let catalogoMercado = [...productosIniciales]

// Objeto Jugador
const jugador = {
  vida: 1000,
  ataque: 150,
  defensa: 80,
  oroCentimos: 8000 // 80,00 €
};

// =========================================================================
// 3. FUNCIONES DE LÓGICA DE MERCADO (A diseñar)
// =========================================================================

// Completa las operaciones que necesita la interfaz: filtrar por rareza,
// buscar por nombre y crear una colección nueva con descuentos por tipo o
// rareza. Decide si prefieres funciones normales o funciones flecha y cómo
// compones las operaciones, siempre evitando modificar la lista original.

// Comprueba cada producto de la lista, si coincide con la rareza, lo guarda en el nuevo array.
function filtrarPorRareza(lista, rareza)
{
  if (rareza === "todas")
  {
    return lista // devolvemos la lista tal cual
  }

  let listaFiltrada = []
  for (let ind = 0; ind < lista.length; ind++)
  {
    if (lista[ind].rareza === rareza)
    {
      listaFiltrada.push(lista[ind])
    }
  }
  return listaFiltrada // devolver lista filtrada 
}

// Busca coincidencias
function buscarPorNombre(lista, textoBuscar)
{
  let listaFiltrada = []
  let textoLimpio = textoBuscar.trim().toLowerCase()

  for (let ind = 0; ind < lista.length; ind++)
  {
    let nombreProducto = lista[ind].nombre.toLowerCase()
    
    // Si el nombre del producto incluye el texto buscado, se añade al resultado.
    if (nombreProducto.includes(textoLimpio))
    {
      listaFiltrada.push(lista[ind])
    }
  }
  return listaFiltrada
}

// Recorre productos originales y genera copias rebajadas solo si coinciden
function aplicarDescuentoFiltro(listaOriginal, criterio, porcentaje)
{
  let nuevaLista = []

  for (let ind = 0; ind < listaOriginal.length; ind++)
  {
    let productoActual = listaOriginal[ind]

    if (productoActual.tipo === criterio || productoActual.rareza === criterio)
    {
      let productoRebajado = productoActual.copiaConDescuento(porcentaje)
      nuevaLista.push(productoRebajado)
    }
    else
    {
      nuevaLista.push(productoActual)
    }
  }

  return nuevaLista; // 
}

// Selecciona aleatoriamente una oferta, la aplica al catálogo e informa en la UI
function generarOfertaAleatoria() {
  const criterios = ['Arma', 'Armadura', 'Consumible', 'Legendaria', 'Rara'];
  const porcentajes = [10, 15, 20, 25, 30, 50];

  const criterioElegido = criterios[Math.floor(Math.random() * criterios.length)];
  const porcentajeElegido = porcentajes[Math.floor(Math.random() * porcentajes.length)];

  // Actualizar catálogo global con los productos rebajados usando siempre los originales como base
  catalogoMercado = aplicarDescuentoFiltro(productosIniciales, criterioElegido, porcentajeElegido);

  // Mostrar la oferta activa en el elemento HTML #texto-oferta-dia
  const textoOferta = document.getElementById('texto-oferta-dia');
  textoOferta.textContent = `${porcentajeElegido}% de descuento en objetos de tipo/rareza: ${criterioElegido}`;

  aplicarFiltrosCombos();
}

// =========================================================================
// 4. INTERACCIÓN CON EL DOM Y NOTIFICACIONES (Lógica provista)
// =========================================================================

const contenedorCatalogo = document.getElementById('contenedor-catalogo');
const inputBuscar = document.getElementById('input-buscar');
const selectRareza = document.getElementById('select-rareza');
const bannerNotificacion = document.getElementById('banner-notificacion');
const btnNuevaOferta = document.getElementById('btn-nueva-oferta');

function mostrarNotificacion(mensaje, esExito) {
  bannerNotificacion.textContent = mensaje;
  bannerNotificacion.className = `banner-notificacion ${esExito ? 'exito' : 'error'}`;

  setTimeout(() => {
    bannerNotificacion.className = 'banner-notificacion oculto';
  }, 3000);
}

function renderizarJugador() {
  document.getElementById('stat-hp').textContent = jugador.vida;
  document.getElementById('stat-atk').textContent = jugador.ataque;
  document.getElementById('stat-def').textContent = jugador.defensa;
  document.getElementById('stat-oro').textContent = (jugador.oroCentimos / 100).toFixed(2).replace('.', ',') + ' €';
}

function renderizarCatalogo(lista) {
  contenedorCatalogo.innerHTML = '';

  lista.forEach((producto, index) => {
    const tieneRebaja = producto.precioEntero < producto.precioOriginal;
    const card = document.createElement('div');
    card.className = `tarjeta-producto ${producto.rareza.toLowerCase()}`;

    card.innerHTML = `
      <div class="producto-img-container">
        <img src="${producto.imagen}" alt="${producto.nombre}">
      </div>
      <div class="producto-header">
        <span class="producto-nombre">${producto.nombre}</span>
        <span class="badge-rareza">${producto.rareza}</span>
      </div>
      <div class="producto-info">
        <span>Tipo: ${producto.tipo}</span><br>
        <span class="producto-bonus">+${producto.bonus} ${producto.tipo === 'Arma' ? 'ATK' : producto.tipo === 'Armadura' ? 'DEF' : 'HP'}</span>
      </div>
      <div class="producto-footer">
        <div class="precio-contenedor">
          ${tieneRebaja ? `<span class="precio-original">${producto.getPrecioFormateado(producto.precioOriginal)}</span>` : ''}
          <span class="producto-precio">${producto.getPrecioFormateado()}</span>
        </div>
        <button class="btn-comprar" data-index="${index}">Comprar</button>
      </div>
    `;
    contenedorCatalogo.appendChild(card);
  });

  document.querySelectorAll('.btn-comprar').forEach(btn =>
  {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      comprarProducto(lista[idx]);
    });
  });
}

function comprarProducto(producto)
{
  if (jugador.oroCentimos >= producto.precioEntero)
  {
    jugador.oroCentimos -= producto.precioEntero;
    producto.aplicarEfecto(jugador);
    renderizarJugador();
    mostrarNotificacion(`¡Has comprado ${producto.nombre} exitosamente!`, true);
  }
  else
  {
    mostrarNotificacion(`No tienes suficiente oro para comprar ${producto.nombre}.`, false);
  }
}

function aplicarFiltrosCombos()
{
  const texto = inputBuscar.value;
  const rareza = selectRareza.value;

  // Aplica ambos filtros sobre el catálogo actual
  let resultado = buscarPorNombre(catalogoMercado, texto);
  resultado = filtrarPorRareza(resultado, rareza);

  // Mostrar
  renderizarCatalogo(resultado);
}

// Eventos
inputBuscar.addEventListener('input', aplicarFiltrosCombos);
selectRareza.addEventListener('change', aplicarFiltrosCombos);
btnNuevaOferta.addEventListener('click', generarOfertaAleatoria);

// Inicialización
renderizarJugador();
generarOfertaAleatoria();