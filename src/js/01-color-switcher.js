const startBtnEl = document.querySelector("button[data-start]");
const stopBtnEl = document.querySelector("button[data-stop]");
const bodyEl = document.querySelector("body");

let timerId = null;
stopBtnEl.setAttribute("disabled", "disabled");

function getRandomHexColor() {
return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

startBtnEl.addEventListener("click", onStartBtnClick);
stopBtnEl.addEventListener("click", onStopBtnClick);

function onStartBtnClick() {
  startBtnEl.setAttribute("disabled", "disabled");
  stopBtnEl.removeAttribute("disabled", "disabled");
  timerId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(timerId);
  startBtnEl.removeAttribute("disabled", "disabled");
  stopBtnEl.setAttribute("disabled", "disabled");
}
