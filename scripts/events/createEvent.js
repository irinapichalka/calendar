import { getItem, setItem } from "../common/storage.js";
import { renderEvents } from "./events.js";
import { getDateTime } from "../common/time.utils.js";
import { closeModal } from "../common/modal.js";

const eventFormElem = document.querySelector(".event-form");
const closeEventFormBtn = document.querySelector(".create-event__close-btn");
const eventFormSubmitBtn = document.querySelector(".event-form__submit-btn");

function clearEventForm() {
  // ф-ция должна очистить поля формы от значений
  eventFormElem.reset();
}

function onCloseEventForm() {
  // здесь нужно закрыть модальное окно и очистить форму
  closeModal();
  clearEventForm();
}

function onCreateEvent(event) {
  // задача этой ф-ции только добавить новое событие в массив событий, что хранится в storage
  // создавать или менять DOM элементы здесь не нужно. Этим займутся другие ф-ции
  // при подтверждении формы нужно считать данные с формы
  // с формы вы получите поля date, startTime, endTime, title, description
  // на основе полей date, startTime, endTime нужно посчитать дату начала и окончания события
  // date, startTime, endTime - строки. Вам нужно с помощью getDateTime из утилит посчитать start и end объекта события
  // полученное событие добавляем в массив событий, что хранится в storage
  // закрываем форму
  // и запускаем перерисовку событий с помощью renderEvents
  event.preventDefault();
  const formData = [...new FormData(eventFormElem)].reduce(
    (acc, [field, value]) => {
      return { ...acc, [field]: value };
    },
    {}
  );
  const eventObj = {};
  eventObj.id = Math.random().toString(36).substr(2, 9);
  eventObj.title = formData.title;
  eventObj.description = formData.description;
  eventObj.start = getDateTime(formData.date, formData.startTime);
  eventObj.end = getDateTime(formData.date, formData.endTime);

  const arrayOfEvents = getItem("events");
  arrayOfEvents.push(eventObj);
  setItem("events", arrayOfEvents);

  onCloseEventForm();
  renderEvents();
}

export function initEventForm() {
  // подпишитесь на сабмит формы и на закрытие формы
  eventFormElem.addEventListener("submit", onCreateEvent);
  closeEventFormBtn.addEventListener("click", onCloseEventForm);
}
