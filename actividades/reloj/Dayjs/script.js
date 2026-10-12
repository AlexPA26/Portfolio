/* Tutorial de Day.js. El HTML carga este archivo con defer:
   todos los elementos ya existen cuando se ejecuta este código. */
(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);

  // Si falla el CDN, mostramos una explicación en lugar de romper la página.
  if (!window.dayjs || !window.dayjs_plugin_customParseFormat ||
      !window.dayjs_plugin_relativeTime || !window.dayjs.Ls.es) {
    $('load-error').hidden = false;
    $('load-error').textContent = 'No se ha podido cargar Day.js o sus complementos. Comprueba tu conexión a Internet y recarga la página.';
    $('today').textContent = 'Ejemplos interactivos pendientes de cargar.';
    document.querySelectorAll('input, select, button').forEach((control) => {
      control.disabled = true;
    });
    return;
  }

  // 1. Los plugins se cargan en el HTML y se activan con extend().
  dayjs.extend(window.dayjs_plugin_customParseFormat);
  dayjs.extend(window.dayjs_plugin_relativeTime);
  dayjs.locale('es');

  // JSON.stringify solo genera los textos de ejemplo. No ejecutamos código
  // introducido por el usuario y usamos textContent para mostrarlo con seguridad.
  const quote = (value) => JSON.stringify(value);
  const value = (id) => $(id).value;

  function showExample(prefix, code, result, error = false) {
    $(`${prefix}-code`).textContent = code;
    $(`${prefix}-result`).textContent = result;
    $(`${prefix}-result`).classList.toggle('error', error);
  }

  function invalid(prefix, message = 'Introduce una fecha válida para ver el resultado.') {
    showExample(prefix, '// Completa los campos para ejecutar este ejemplo.', message, true);
  }

  // Validamos también los campos nativos: no dependemos solo del navegador.
  function readDate(id) {
    const input = $(id);
    const pattern = input.type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DDTHH:mm';
    return dayjs(input.value, pattern, true);
  }

  // 2. format() devuelve una cadena, no otro objeto Day.js.
  function updateFormat() {
    const date = readDate('format-date');
    const pattern = value('format-pattern');
    if (!date.isValid() || !pattern.trim()) return invalid('format', 'Completa la fecha y el formato.');
    showExample('format',
      `dayjs(${quote(value('format-date'))})\n  .format(${quote(pattern)});`,
      date.format(pattern));
  }

  // 3. add() y subtract() conservan la fecha original.
  function updateCalculation() {
    const original = readDate('calc-date');
    const amount = Number(value('calc-amount'));
    if (!original.isValid() || !value('calc-amount') || !$('calc-amount').checkValidity()) {
      return invalid('calc', 'Elige una fecha y una cantidad entera entre 0 y 10000.');
    }
    const operation = value('calc-operation');
    const unit = value('calc-unit');
    const modified = original[operation](amount, unit);
    showExample('calc',
      `const original = dayjs(${quote(value('calc-date'))});\nconst nueva = original.${operation}(${amount}, ${quote(unit)});\n\noriginal.format('DD/MM/YYYY'); // El original no cambia\nnueva.format('DD/MM/YYYY');`,
      `Original: ${original.format('DD/MM/YYYY')}\nNueva fecha: ${modified.format('DD/MM/YYYY')}`);
  }

  // 4. diff() calcula una diferencia; isBefore/isSame/isAfter devuelven booleanos.
  function updateComparison() {
    const start = readDate('compare-start');
    const end = readDate('compare-end');
    if (!start.isValid() || !end.isValid()) return invalid('compare');
    showExample('compare',
      `const inicio = dayjs(${quote(value('compare-start'))});\nconst fin = dayjs(${quote(value('compare-end'))});\n\nfin.diff(inicio, 'day');\ninicio.isBefore(fin, 'day');\ninicio.isSame(fin, 'day');\ninicio.isAfter(fin, 'day');`,
      `Diferencia (fin − inicio): ${end.diff(start, 'day')} días\nInicio anterior al final: ${start.isBefore(end, 'day')}\nMismo día: ${start.isSame(end, 'day')}\nInicio posterior al final: ${start.isAfter(end, 'day')}`);
  }

  // 5. El último argumento true exige coincidencia exacta y una fecha real.
  function updateValidation() {
    const text = value('validate-date');
    const pattern = value('validate-pattern');
    const parsed = dayjs(text, pattern, true);
    showExample('validate',
      `// Requiere customParseFormat (activado al inicio).\nconst fecha = dayjs(${quote(text)}, ${quote(pattern)}, true);\nfecha.isValid();`,
      parsed.isValid() ? `true → Fecha válida: ${parsed.format('DD/MM/YYYY')}` : 'false → La fecha no existe o no coincide exactamente con el formato.',
      !parsed.isValid());
  }

  // 6. relativeTime compara con el momento actual y usa el idioma español.
  function updateRelative() {
    const date = readDate('relative-date');
    if (!date.isValid()) return invalid('relative');
    showExample('relative',
      `// Requiere relativeTime (activado al inicio).\nconst fecha = dayjs(${quote(value('relative-date'))});\nfecha.fromNow();\nfecha.fromNow(true);`,
      `Respecto a ahora: ${date.fromNow()}\nSin prefijo ni sufijo: ${date.fromNow(true)}`);
  }

  function updateClock() {
    $('today').textContent = `Hoy es ${dayjs().format('dddd, D [de] MMMM [de] YYYY')}`;
  }

  // Enlazamos cada sección con su función. Se recalcula al editar un campo.
  const examples = [
    ['formato', updateFormat], ['calculos', updateCalculation],
    ['comparacion', updateComparison], ['validacion', updateValidation],
    ['relativo', updateRelative],
  ];
  $('relative-date').value = dayjs().subtract(2, 'day').format('YYYY-MM-DDTHH:mm');
  examples.forEach(([section, update]) => {
    $(section).addEventListener('input', update);
    update();
  });

  document.querySelectorAll('[data-format]').forEach((button) => {
    button.addEventListener('click', () => {
      $('format-pattern').value = button.dataset.format;
      updateFormat();
    });
  });

  updateClock();
  // Mantiene el tiempo relativo actualizado si dejas la página abierta.
  window.setInterval(() => { updateClock(); updateRelative(); }, 60000);
})();
