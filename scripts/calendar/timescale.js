import { createNumbersArray } from '../common/createNumbersArray.js';

export const renderTimescale = () => {
  // ф-ция должна генерировать разметку для боковой шкалы времени (24 часа)
  const timeScale = createNumbersArray(1,24);
  const htmlForTimeScale = timeScale.reduce((acc, el) => {
    return acc + `<div class="time-slot" data-time-number="${el}"><span class="time-slot__time"></span></div>`;
  }, ``)
  // полученную разметку вставьте на страницу с помощью innerHTML в .calendar__time-scale
  const calendarTimeScaleElem = document.querySelector('.calendar__time-scale');
  calendarTimeScaleElem.innerHTML = htmlForTimeScale;
};
