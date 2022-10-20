import { getItem } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";
import { renderEvents } from "../events/events.js";
import { createNumbersArray } from "../common/createNumbersArray.js";

const generateDay = () => {
  // функция должна сгенерировать и вернуть разметку дня в виде строки
  // разметка состоит из 24 часовых временных слотов (.calendar__time-slot)
  const arrayTime = createNumbersArray(1, 24);
  const result = arrayTime
    .map(
      (el, index) =>
        `<div class="calendar__time-slot" data-time="${index}"></div>`
    )
    .reduce((acc, el) => acc + el, ``);
  return result;
};

export const renderWeek = () => {
  // функция должна сгенерировать разметку недели в виде строки и вставить ее на страницу (в .calendar__week)
  // разметка недели состоит из 7 дней (.calendar__day) отображаемой недели
  // массив дней, которые нужно отобразить, считаем ф-цией generateWeekRange на основе displayedWeekStart из storage
  // каждый день должен содержать в дата атрибуте порядковый номер дня в месяце
  // после того, как отрисовали всю сетку для отображаемой недели, нужно отобразить события этой недели с помощью renderEvents

  const arrayDays = generateWeekRange(getItem("displayedWeekStart"));
  const htmlForWeeks = arrayDays.reduce((acc, el) => {
    return (
      acc +
      `<div class="calendar__day" data-day="${el.getDate()}">${generateDay()}</div>`
    );
  }, ``);
  document.querySelector(".calendar__week").innerHTML = htmlForWeeks;
};
