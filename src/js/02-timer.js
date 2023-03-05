import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startFieldRef = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const secondsFieldRef = document.querySelector('[data-seconds]');
const minutesFieldRef = document.querySelector('[data-minutes]');
const hoursFieldRef = document.querySelector('[data-hours]');
const daysFieldRef = document.querySelector('[data-days]');


startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
      const selectedDate = selectedDates[0];
      const currentDate = new Date();
      if (selectedDate <= currentDate) {
          window.alert("Please choose a date in the future");
          startBtn.disabled = true;
      } else {
          startBtn.disabled = false;
      }
  },
};
const fp = flatpickr(startFieldRef, options);


const timer = {
    intervalId: null,
    start() {
        const startTime = fp.selectedDates[0].getTime();
        this.intervalId = setInterval(() => {
            const currentTime = new Date().getTime(); 
            const deltaTime = startTime - currentTime;
            // console.log(deltaTime);
            const timeComponents = convertMs(deltaTime);
            secondsFieldRef.textContent = addLeadingZero(timeComponents.seconds);
            minutesFieldRef.textContent = addLeadingZero(timeComponents.minutes);
            hoursFieldRef.textContent = addLeadingZero(timeComponents.hours);
            if (timeComponents.days > 99) {
                daysFieldRef.textContent = timeComponents.days;
            } else daysFieldRef.textContent = addLeadingZero(timeComponents.days);
            if (deltaTime < 1) {
                clearInterval(this.intervalId);
                secondsFieldRef.textContent = "00";
                minutesFieldRef.textContent = "00";
                hoursFieldRef.textContent = "00";
                daysFieldRef.textContent = "00";
            }
       }, 1000)
    },
    
    
}
startBtn.addEventListener('click', timer.start);


function addLeadingZero(value) {
    return value.toString().padStart(2, "0");
};

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
