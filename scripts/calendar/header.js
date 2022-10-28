import { getItem } from "../common/storage.js";
import { generateWeekRange } from "../common/time.utils.js";
import { openModal } from "../common/modal.js";

const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

export const renderHeader = () => {
  // на основе displayedWeekStart из storage с помощью generateWeekRange сформируйте массив дней текущей недели
  const arrayDays = generateWeekRange(getItem("displayedWeekStart"));

  // на основе полученного массива сформируйте разметку в виде строки - 7 дней (день недели и число в месяце)
  const htmlForarrayDays = arrayDays.reduce((acc, el) => {
    return (
      acc +
      `<div class="calendar__day-label day-label" data-day-number="${el.getDate()}"><span class="day-label__day-name">${
        daysOfWeek[el.getDay()]
      }</span><span class="day-label__day-number">${el.getDate()}</span></div>`
    );
  }, ``);

  // полученную разметку вставить на страницу с помощью innerHTML в .calendar__header
  const calendarHeaderElem = document.querySelector(".calendar__header");
  calendarHeaderElem.innerHTML = htmlForarrayDays;

  const today = new Date();
  const todayElem = document.querySelector(
    `[data-day-number="${today.getDate()}"]`
  );
  const todayDay = todayElem.querySelector(":scope > span");

  if (todayDay.textContent === daysOfWeek[today.getDay()])
    todayElem.classList.add("today");
};
// в дата атрибуте каждой ячейки должно хранить для какого часа эта ячейка
// при клике на кнопку "Create" открыть модальное окно с формой для создания события
const createBtnElem = document.querySelector(".create-event-btn");
createBtnElem.addEventListener("click", openModal);
// назначьте здесь обработчик
