# 23 · Buscador de gasolineras

Crea una **aplicación web** para consultar las gasolineras de un municipio y comparar sus precios. La información debe obtenerse de la [API oficial de precios de carburantes](https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/help) mediante peticiones asíncronas, sin recargar la página.

La actividad debe permitir buscar en cualquier comunidad, provincia y municipio disponibles en la API.

## 1. Selección, filtros y orden

- Al abrir la aplicación, carga las **comunidades autónomas** en un desplegable. Provincia y municipio deben permanecer vacíos y deshabilitados hasta que corresponda utilizarlos.
- Al seleccionar una comunidad, carga únicamente sus provincias. Al seleccionar una provincia, carga únicamente sus municipios. Obtén las opciones y sus identificadores de la API.
- Al seleccionar un municipio, consulta sus gasolineras y muestra los resultados automáticamente.
- Incluye un selector de **Gasolina 95 E5** y **Gasóleo A**, con gasolina seleccionada inicialmente. Cambiarlo debe actualizar los precios y el orden utilizando los datos del municipio ya descargados.
- Añade una casilla **«Solo abiertas ahora»**, desmarcada inicialmente, y un selector de orden **«Precio: menor a mayor»** y **«Precio: mayor a menor»**, con orden ascendente inicial.
- Los cambios de combustible, apertura y orden deben combinarse y actualizar el listado sin volver a descargar el municipio.
- Si cambia la comunidad o la provincia, reinicia las selecciones dependientes y retira los resultados anteriores. Si se cambia rápidamente de ubicación, solo deben mostrarse los datos de la última selección.

## 2. Resultados

Muestra una tabla o un listado de tarjetas con **rótulo, dirección, localidad, horario, estado de apertura y precio del combustible elegido**. Si falta un dato descriptivo, indica «No disponible».

- Presenta los precios en **€/l con tres decimales**, ordenados numéricamente en el sentido seleccionado.
- Excluye las estaciones que no tengan un precio válido y mayor que cero para ese combustible. Un precio vacío no equivale a cero.
- Destaca la estación con el precio mínimo entre los resultados visibles; si hay empate, destaca todas las que lo comparten. Debe seguir destacada aunque el orden sea descendente.
- Indica el municipio, el combustible, el número de estaciones que cumplen los filtros y la fecha de actualización devuelta por la API.

Determina la apertura a partir de `Horario`, considerando el día y la hora locales de la estación. Contempla horarios de 24 horas, días o rangos de días, varios tramos diarios y tramos que cruzan medianoche. Considera incluido el inicio de cada tramo y excluido su final. Si falta información o no puedes interpretar el horario con seguridad, muestra **«Apertura desconocida»** y excluye esa estación al activar «Solo abiertas ahora»; no la marques como cerrada. Al cambiar los filtros, vuelve a evaluar la apertura.

Los precios llegan como texto y pueden utilizar **coma decimal**: `1,459` representa 1,459 €/l. Deben interpretarse como números antes de compararlos. Comprueba la estructura real de la respuesta: las estaciones se encuentran en `ListaEESSPrecio` y la fecha general en `Fecha`.

## 3. Carga, errores y presentación

Muestra un mensaje de carga mientras llegan los datos y deshabilita los controles que todavía no tengan opciones disponibles. Distingue entre **falta seleccionar una ubicación**, **no hay estaciones que cumplan los filtros** y **la consulta ha fallado**.

Un fallo de red, una respuesta HTTP incorrecta o una respuesta no válida debe producir un aviso visible y permitir reintentar. No muestres un error como si fuera una búsqueda sin resultados ni conserves datos antiguos bajo una ubicación nueva.

La interfaz debe ser legible en ordenador y móvil, con etiquetas en los controles y una distinción del precio mínimo que no dependa únicamente del color.

## 4. Operaciones de la API

Todas las rutas siguientes se añaden a esta base:

```text
https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/
```

| Para obtener… | Ruta GET |
| --- | --- |
| Comunidades | `Listados/ComunidadesAutonomas/` |
| Provincias de una comunidad | `Listados/ProvinciasPorComunidad/{IDCCAA}` |
| Municipios de una provincia | `Listados/MunicipiosPorProvincia/{IDProvincia}` |
| Gasolineras de un municipio | `EstacionesTerrestres/FiltroMunicipio/{IDMunicipio}` |

Sustituye los marcadores por los identificadores recibidos. Revisa los nombres exactos de las propiedades: el ejemplo oficial del listado de provincias utiliza `IDPovincia`, sin la primera «r».

## 5. Comprobaciones y entrega

1. Selecciona **Extremadura → Badajoz → Mérida**. Comprueba que aparecen las estaciones con precio válido y que la primera tiene el menor precio.
2. Cambia de combustible: deben recalcularse el listado, su orden y el precio mínimo.
3. Alterna los dos órdenes: la primera estación debe tener el mínimo o el máximo según corresponda, manteniendo destacadas las más baratas.
4. Activa «Solo abiertas ahora»: deben desaparecer las cerradas y las de apertura desconocida. Combina la casilla con ambos combustibles y órdenes; el contador debe coincidir con las estaciones visibles. Al desmarcarla, deben recuperarse las demás estaciones con precio válido.
5. Comprueba la apertura con horarios de prueba: 24 horas, dos tramos separados por un cierre y un tramo de 22:00 a 06:00. Prueba instantes antes, dentro y justo al finalizar cada tramo, además de un horario vacío o no interpretable. Puedes utilizar temporalmente una fecha y hora fijas para estas comprobaciones.
6. Cambia de comunidad y comprueba que provincia, municipio y resultados se reinician. Prueba también cambios rápidos de selección.
7. Comprueba los mensajes de carga, ausencia de resultados y fallo de conexión. Para los casos que no aparezcan en los datos reales, puedes usar temporalmente una respuesta de prueba.
8. Verifica que los precios vacíos no aparecen como ofertas de 0 € y que los empates en el mínimo se destacan correctamente.
