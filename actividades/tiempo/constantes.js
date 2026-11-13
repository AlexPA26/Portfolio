export const ICONS = "./svg"

export const weatherCodes =
{
    0: { description: "Despejado", icon: ICONS + "clear-day.svg" },
    1: { description: "Principalmente despejado", icon: ICONS + "mostly-clear-day.svg" },
    2: { description: "Parcialmente nublado", icon: ICONS + "partly-cloudy-day.svg" },
    3: { description: "Cubierto", icon: ICONS + "overcast.svg" },
    45: { description: "Niebla", icon: ICONS + "fog.svg" },
    48: { description: "Niebla con escarcha", icon: ICONS + "fog.svg" },
    51: { description: "Llovizna ligera", icon: ICONS + "drizzle.svg" },
    53: { description: "Llovizna moderada", icon: ICONS + "drizzle.svg" },
    55: { description: "Llovizna intensa", icon: ICONS + "drizzle.svg" },
    56: { description: "Llovizna engelante ligera", icon: ICONS + "sleet.svg" },
    57: { description: "Llovizna engelante intensa", icon: ICONS + "sleet.svg" },
    61: { description: "Lluvia ligera", icon: ICONS + "rain.svg" },
    63: { description: "Lluvia moderada", icon: ICONS + "rain.svg" },
    65: { description: "Lluvia intensa", icon: ICONS + "rain.svg" },
    66: { description: "Lluvia engelante ligera", icon: ICONS + "sleet.svg" },
    67: { description: "Lluvia engelante intensa", icon: ICONS + "sleet.svg" },
    71: { description: "Nevada ligera", icon: ICONS + "snow.svg" },
    73: { description: "Nevada moderada", icon: ICONS + "snow.svg" },
    75: { description: "Nevada intensa", icon: ICONS + "snow.svg" },
    77: { description: "Granos de nieve", icon: ICONS + "snowflake.svg" },
    79: { description: "Chubascos de lluvia ligeros", icon: ICONS + "rain.svg" },
    80: { description: "Chubascos de lluvia ligeros", icon: ICONS + "rain.svg" },
    81: { description: "Chubascos de lluvia moderados", icon: ICONS + "rain.svg" },
    82: { description: "Chubascos de lluvia violentos", icon: ICONS + "rain.svg" },
    85: { description: "Chubascos de nieve ligeros", icon: ICONS + "snow.svg" },
    86: { description: "Chubascos de nieve intensos", icon: ICONS + "snow.svg" },
    95: { description: "Tormenta", icon: ICONS + "thunderstorms.svg" },
    96: { description: "Tormenta con granizo ligero", icon: ICONS + "thunderstorms-hail.svg" },
    97: { description: "Tormenta intensa", icon: ICONS + "thunderstorms.svg" },
    99: { description: "Tormenta con granizo intenso", icon: ICONS + "thunderstorms-hail.svg" }

}

export const ciudades =
{
    "Mérida": "https://api.open-meteo.com/v1/forecast?latitude=38.91611&longitude=-6.34366&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh&timezone=Europe%2FMadrid&forecast_days=1",
    Madrid: "https://api.open-meteo.com/v1/forecast?latitude=40.4165&longitude=-3.70256&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh&timezone=Europe%2FMadrid&forecast_days=1",
    Barcelona: "https://api.open-meteo.com/v1/forecast?latitude=41.3888&longitude=-2.15899&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&temperature_unit=celsius&wind_speed_unit=kmh&timezone=Europe%2FMadrid&forecast_days=1"
}