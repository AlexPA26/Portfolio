'use strict'

dayjs.extend(dayjs_plugin_customParseFormat)
dayjs.extend(dayjs_plugin_duration)
dayjs.extend(dayjs_plugin_utc)
dayjs.extend(dayjs_plugin_timezone)
dayjs.locale('es')

// ==================================================
// PUNTO 1: EDAD EN COSAS RARAS
// ==================================================

function contarViernes13(fechaNacimiento, hoy)
{
    let contador = 0
    let fecha = fechaNacimiento.startOf('month')
    const ultimoMes = hoy.startOf('month')

    while (fecha.isBefore(ultimoMes) || fecha.isSame(ultimoMes, 'month'))
    {
        const viernes13 = fecha.date(13);

        if
        (
            viernes13.day() === 5 && !viernes13.isBefore(fechaNacimiento, 'day') && !viernes13.isAfter(hoy, 'day')
        )
        {
            contador++
        }
        fecha = fecha.add(1, 'month')
    }
    return contador;
}

function calcularEdad(fechaNacimiento)
{
    const ahora = dayjs();
    const diferencia = ahora.diff(fechaNacimiento)

    const segundos = Math.floor(diferencia / 1000)
    const horas = Math.floor(diferencia / (1000 * 60 * 60))
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24))

    const viernes13 = contarViernes13(fechaNacimiento, ahora);

    return {
        dias: dias,
        horas: horas,
        segundos: segundos,
        diaSemana: fechaNacimiento.format('dddd'),
        viernes13: viernes13,
        nacimiento: fechaNacimiento,
        ahora: ahora
    };
}

function mostrarEdad(datos)
{
    document.getElementById('dias-edad').textContent = datos.dias
    document.getElementById('horas-edad').textContent = datos.horas
    document.getElementById('segundos-edad').textContent = datos.segundos

    document.getElementById('dia-semana').textContent = datos.diaSemana
    document.getElementById('viernes').textContent = datos.viernes13

    document.getElementById('instante-calculo').textContent =
        "Desde " + datos.nacimiento.format('DD/MM/YYYY') + 
        " Calculado el " + datos.ahora.format('DD/MM/YYYY HH:mm:ss')

    document.getElementById('resultado-edad').hidden = false
}

function procesarFormularioEdad(evento)
{
    evento.preventDefault()

    const input = document.getElementById('nacimiento')
    const error = document.getElementById('error-edad')
    const resultado = document.getElementById('resultado-edad')

    resultado.hidden = true
    error.textContent = ''

    if (!input.value)
    {
        error.textContent = 'Introduce una fecha de nacimiento.'
        return
    }

    const fechaNacimiento = dayjs(input.value, 'YYYY-MM-DD', true).startOf('day')

    if (!fechaNacimiento.isValid())
    {
        error.textContent = 'La fecha introducida no es válida.'
        return
    }

    const ahora = dayjs();

    if (fechaNacimiento.isAfter(ahora))
    {
        error.textContent = 'La fecha de nacimiento no puede ser futura.'
        return;
    }

    const datos = calcularEdad(fechaNacimiento)
    mostrarEdad(datos)
}

function iniciarEdad()
{
    const formulario = document.getElementById('form-edad')
    formulario.addEventListener('submit', procesarFormularioEdad)
}

// ==================================================
// PUNTO 2: CUENTA ATRÁS
// ==================================================

let fechaObjetivo;
let eventoAlcanzado = false;

function iniciarCuentaAtras()
{
    const ahora = dayjs();
    const proximoAno = ahora.year() + 1
    // arreglar formateo abajo
    fechaObjetivo = dayjs(`${proximoAno}-01-01T00:00:00`) 
    
    const elementoFecha = document.getElementById('fecha-evento')
    elementoFecha.textContent = `Año Nuevo: ${fechaObjetivo.format('DD/MM/YYYY HH:mm:ss')}`
}

function actualizarCuentaAtras()
{
    if (eventoAlcanzado) return

    const ahora = dayjs()
    const diferencia = fechaObjetivo.diff(ahora)

    const elementoContador = document.getElementById('contador')
    const elementoEstado = document.getElementById('estado-evento')

    if (diferencia <= 0)
    {
        eventoAlcanzado = true
        elementoContador.textContent = ''
        elementoEstado.textContent = 'Ha llegado la fecha del evento.'
        return;
    }

    const duracion = dayjs.duration(diferencia);
    
    // Cálculo de días totales y desglose del resto del tiempo
    const dias = Math.floor(duracion.asDays())
    const horas = duracion.hours()
    const minutos = duracion.minutes()
    const segundos = duracion.seconds()

    elementoContador.textContent = "Faltan " + dias + " días "+  horas + " horas " + minutos + " minutos "+  " y " + segundos + " segundos " + " para Año Nuevo"
}

// ==================================================
// PUNTO 3: ZONAS HORARIAS
// ==================================================

function actualizarZonasHorarias()
{
    const ahora = dayjs()
    const formato = 'DD/MM/YYYY HH:mm:ss'

    document.getElementById('hora-local').textContent = ahora.format(formato)
    document.getElementById('hora-tokio').textContent = ahora.tz('Asia/Tokyo').format(formato)
    document.getElementById('hora-nueva-york').textContent = ahora.tz('America/New_York').format(formato)
    document.getElementById('hora-sidney').textContent = ahora.tz('Australia/Sydney').format(formato)
}
    
// ==================================================
// INICIO Y ACTUALIZACIÓN COMÚN
// ==================================================

function actualizarRelojes()
{
  actualizarCuentaAtras();
  actualizarZonasHorarias();
}

iniciarEdad();
iniciarCuentaAtras();

actualizarRelojes();
setInterval(actualizarRelojes, 1000);