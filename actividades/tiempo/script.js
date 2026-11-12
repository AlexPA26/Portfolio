import { ciudades, ICONS, weatherCodes } from "./constantes.js"

const formulario = document.getElementById("busquedaID")
const busqueda = document.getElementById("busqueda")
const enviar = document.getElementById("enviar")

const nombreCiudadTexto = document.getElementById("nombreCiudad")
const temperaturaTexto = document.getElementById("temperaturaCiudad")
const humedadRelativa = document.getElementById("humedadRelativa")
const velocidadViento = document.getElementById("velocidadViento")
const fechaCiudad = document.getElementById("fechaCiudad")
const horaDeDatosCiudad = document.getElementById("horaDeDatosCiudad")
const descripcionCiudad = document.getElementById("descripcion")
const iconoTiempo = document.getElementById("iconoTiempo")

enviar.addEventListener('click', function (e)
{
    e.preventDefault()
    console.log("Click a enviar")
    obtenerTiempo(busqueda.value)
})

function obtenerTiempo(ciudad)
{
    const API = ciudades[ciudad] || ciudades["Mérida"]

    fetch(API).then(response =>
    {
        if (!response.ok) console.error("Se ha producido un error al consultar la API.");
        return response.json()
    }
    ).then(data =>
    {
        const fecha = data.current.time.split("T")[0]
        const hora = data.current.time.split("T")[1]
        const estadoTiempo = weatherCodes[data.current.weather_code]

        if (estadoTiempo == null)
        {
            estadoTiempo = { description: "Estado meteorológico desconocido", icon: ICONS + "not-available.svg" }
        }
        
        nombreCiudadTexto.textContent = "Localidad: " + ciudad
        temperaturaTexto.textContent = "Temperatura: " + data.current.temperature_2m + "°C"
        humedadRelativa.textContent = "Humedad relativa: " + data.current.relative_humidity_2m +  "%"
        velocidadViento.textContent = "Velocidad del viento: " + data.current.wind_speed_10m + " km/h"
        fechaCiudad.textContent = "Fecha de los datos: " +  fecha
        horaDeDatosCiudad.textContent = "Hora de los datos: " + hora

        
        descripcionCiudad.textContent = estadoTiempo.description
        iconoTiempo.src = estadoTiempo.icon
        iconoTiempo.hidden = false

    }
    ).catch(error =>
    {
        nombreCiudadTexto.textContent = "No se pudieron obtener los datos del tiempo."
        console.error(error)
    })


}
