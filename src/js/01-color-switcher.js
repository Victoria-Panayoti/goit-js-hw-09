const startBtnRef = document.querySelector('[data-start]');
const stopBtnRef = document.querySelector('[data-stop]');
const bodyRef = document.querySelector('body');
let timerId = null;

startBtnRef.addEventListener('click', onStartBtnClick);
stopBtnRef.addEventListener('click', onStopBtnClick);

console.log(startBtnRef.style);
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
function onStartBtnClick() {
    timerId = setInterval(() => {
        bodyRef.style.background = getRandomHexColor();
        startBtnRef.setAttribute("disabled", "disabled");
        stopBtnRef.removeAttribute("disabled", "disabled");
    }, 1000)
};
function onStopBtnClick() {
    clearInterval(timerId);
    startBtnRef.removeAttribute("disabled", "disabled");
    stopBtnRef.setAttribute("disabled", "disabled");
};