import { getItem, setItem } from "../common/storage.js";
import shmoment from "../common/shmoment.js";
import { openPopup, closePopup } from "../common/popup.js";

const weekElem = document.querySelector(".calendar__week");
const deleteEventBtn = document.querySelector(".delete-event-btn");

function removeEventsFromCalendar() {
  // ф-ция для удаления всех событий с календаря
  const calendarTimeSlotElem = document.querySelectorAll(
    ".calendar__time-slot"
  );
  [...calendarTimeSlotElem].forEach((slot) => {
    slot.innerHTML = "";
  });
}

const createEventElement = (event) => {
  // ф-ция создает DOM элемент события
  // событие должно позиционироваться абсолютно внутри нужной ячейки времени внутри дня
  // нужно добавить id события в дата атрибут
  // здесь для создания DOM элемента события используйте document.createElement

  const eventElem = document.createElement("div");
  eventElem.classList.add("event");
  eventElem.dataset.id = event.id;
  const eventTitle = document.createElement("div");
  eventTitle.classList.add("event__title");
  eventTitle.textContent = event.title;
  const eventTime = document.createElement("div");
  eventTime.classList.add("event__time");
  eventTime.textContent = `${event.start.getHours()}:${event.start.getMinutes()}  - ${event.end.getHours()}:${event.end.getMinutes()}`;
  eventElem.append(eventTitle);
  eventElem.append(eventTime);
  //console.log(new Date(event.start).);
  return eventElem;
};
export const renderEvents = () => {
  removeEventsFromCalendar();

  const eventsArray = getItem("events");
  const monday = getItem("displayedWeekStart");
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  console.log(eventsArray);
  const eventsOfCurrentWeek = eventsArray.filter(
    (obj) => obj.start > monday && obj.end < sunday
  );

  console.log(eventsOfCurrentWeek);
  eventsOfCurrentWeek.forEach((obj) => {
    const calendarDaySlotElem = document.querySelector(
      `div[data-day="${obj.start.getDate()}"]`
    );
    const calendarTimeSlotElem = calendarDaySlotElem.querySelector(
      `div[data-time="${obj.start.getHours()}"]`
    );
    const event = createEventElement(obj);
    calendarTimeSlotElem.append(event);
  });

  // достаем из storage все события и дату понедельника отображаемой недели
  // фильтруем события, оставляем только те, что входят в текущую неделю
  // создаем для них DOM элементы с помощью createEventElement
  // для каждого события находим на странице временную ячейку (.calendar__time-slot)
  // и вставляем туда событие
  // каждый день и временная ячейка должно содержать дата атрибуты, по которым можно будет найти нужную временную ячейку для события
  // не забудьте удалить с календаря старые события перед добавлением новых
};
function handleEventClick(event) {
  // если произошел клик по событию, то нужно паказать попап с кнопкой удаления
  // установите eventIdToDelete с id события в storage
  openPopup();
  setItem("eventIdToDelete", event.target.closest(".event").dataset.id);
}

function onDeleteEvent() {
  // достаем из storage массив событий и eventIdToDelete
  // удаляем из массива нужное событие и записываем в storage новый массив
  // закрыть попап
  // перерисовать события на странице в соответствии с новым списком событий в storage (renderEvents)
  const eventsArray = getItem("events");
  const idToDelete = getItem("eventIdToDelete");
  /*const event = createEventElement(obj);
  calendarTimeSlotElem.append(event);*/

  const newArray = eventsArray.filter((obj) => obj.id !== idToDelete);

  setItem("events", newArray);
  console.log(getItem("events"));
  closePopup();
  renderEvents();
}

deleteEventBtn.addEventListener("click", onDeleteEvent);

weekElem.addEventListener("click", handleEventClick);
