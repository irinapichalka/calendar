import { getItem, setItem } from "../common/storage.js";
import { renderWeek } from "../calendar/calendar.js";
import { renderHeader } from "../calendar/header.js";
import { getStartOfWeek, getDisplayedMonth } from "../common/time.utils.js";
import { renderEvents } from "../events/events.js";

const navElem = document.querySelector(".navigation");
const displayedMonthElem = document.querySelector(
  ".navigation__displayed-month"
);

function renderCurrentMonth() {
  // отрисовать месяц, к которому относиться текущая неделя (getDisplayedMonth)
  const displayedMonth = getDisplayedMonth(getItem("displayedWeekStart"));
  // вставить в .navigation__displayed-month
  displayedMonthElem.textContent = displayedMonth;
}

const onChangeWeek = (event) => {
  // при переключении недели обновите displayedWeekStart в storage
  const typeOfDirection = event.target.closest("button").dataset.direction;
  const monday = getStartOfWeek(getItem("displayedWeekStart"));
  let weekStart;
  if (typeOfDirection === "today") {
    weekStart = getStartOfWeek(new Date());
  } else if (typeOfDirection === "next") {
    weekStart = new Date(monday.setDate(monday.getDate() + 7));
  } else if (typeOfDirection === "prev") {
    weekStart = new Date(monday.setDate(monday.getDate() - 7));
  }
  setItem("displayedWeekStart", weekStart);
  renderHeader();
  renderWeek();
  renderCurrentMonth();
  // и перерисуйте все необходимые элементы страницы (renderHeader, renderWeek, renderCurrentMonth)
  renderEvents();
};

export const initNavigation = () => {
  renderCurrentMonth();
  navElem.addEventListener("click", onChangeWeek);
};
