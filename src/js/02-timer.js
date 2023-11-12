import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtnEl = document.querySelector("button[data-start]");
const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");
const imputEl = document.querySelector("#datetime-picker");

let userDate = null;

startBtnEl.setAttribute("disabled", true);
startBtnEl.addEventListener("click", onStartBtnClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userDate = selectedDates[0];
    if (userDate > Date.now()) {
      startBtnEl.removeAttribute("disabled");
    } else {
      iziToast.info({message: "Please choose a date in the future"});
      startBtnEl.setAttribute("disabled", true);
    }
  },
};

flatpickr("input#datetime-picker", options);

function onStartBtnClick() {
  const timerId =  setInterval(() => {
    const differenceTime = userDate - Date.now();
    if (differenceTime < 0) {
     clearInterval(timerId);
     imputEl.removeAttribute("disabled");
     return
    };
    startBtnEl.setAttribute("disabled", true);
    imputEl.setAttribute("disabled", true);
    const currentTime = convertMs(userDate - Date.now());
    console.log(currentTime);

    daysEl.textContent = addLeadingZero(currentTime.days);
    hoursEl.textContent = addLeadingZero(currentTime.hours);
    minutesEl.textContent = addLeadingZero(currentTime.minutes);
    secondsEl.textContent = addLeadingZero(currentTime.seconds);
  }, 1000);
}

function convertMs(ms) {
// Number of milliseconds per unit of time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Remaining days
const days = Math.floor(ms / day);
// Remaining hours
const hours = Math.floor((ms % day) / hour);
// Remaining minutes
const minutes = Math.floor(((ms % day) % hour) / minute);
// Remaining seconds
const seconds = Math.floor((((ms % day) % hour) % minute) / second);

return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
