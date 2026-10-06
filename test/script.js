dayjs.extend(window.dayjs_plugin_customParseFormat);
dayjs.extend(window.dayjs_plugin_relativeTime);
dayjs.locale('es');

const ahora = dayjs();
const fecha = dayjs('2026-09-29');
const desdeDate = dayjs(new Date());
console.log(fecha.format('DD/MM/YYYY')); // 29/09/2026

console.log(fecha);
fecha = fecha.add(7, "day")
console.log(fecha);
fecha = fecha.format("DD/MM/YYYY")
console.log(fecha);