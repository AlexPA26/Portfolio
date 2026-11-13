const API = "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/"
const comunidad = document.getElementById("comunidad");
const provincia = document.getElementById("provincia")
const municipio = document.getElementById("municipio")
const tipoCombustible = document.getElementById("combustible")
const btnBuscar = document.getElementById("buscar")

let testcontent = document.getElementById("testcontent")

btnBuscar.addEventListener('click', function (e)
{
    console.log(comunidad.value);
    console.log(tipoCombustible.value);
    console.log("Click buscar");
    testBuscar()
    e.preventDefault()
})

function testBuscar()
{

    fetch(API).then(response =>
    {
        if (!response.ok) console.error("Se ha producido un error al consultar la API.");
        return response.json()
    }
    ).then(data =>
    {
        testcontent.textContent = JSON.stringify(data, null, 2)
    }
    )
}

async function pedirDatos(ruta)
{
    const respuesta = await fetch(API + ruta);
    return respuesta.json()
}


pedirDatos("Listados/ComunidadesAutonomas/")
    .then(datos => rellenar(comunidad, datos, "IDCCAA", "CCAA", "Selecciona una comunidad"))
    .catch(error =>
    {
        console.error("No se pudieron cargar las comunidades", error)
    })

function rellenar(select, datos, campoId, campoNombre, textoInicial)
{
    select.replaceChildren(new Option(textoInicial, ""))
    datos.forEach(dato => select.add(new Option(dato[campoNombre], dato[campoId])))
}