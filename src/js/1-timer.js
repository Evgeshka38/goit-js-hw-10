import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimeEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('.btn-start');
let userSelectedDate;
let timerId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    if (options.defaultDate.getTime() >= userSelectedDate) {
      startBtn.disabled = true;
      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        color: '#EF4040',
        iconUrl: './img/error-icon.svg',
        position: 'topRight',
      });
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTimeEl, options);
startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  dateTimeEl.disabled = true;
  timerId = setInterval(() => {
    const deltaTime = convertMs(userSelectedDate - Date.now());
    if (deltaTime <= 0) {
      clearInterval(timerId);

      renderTimerValues({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      startBtn.disabled = false;
      dateTimeEl.disabled = true;

      return;
    }
    renderTimerValues(deltaTime);
  }, 1000);
});
//functions
function renderTimerValues(deltaTime) {
  const days = document.querySelector('[data-days]');
  days.textContent = addLeadingZero(deltaTime.days);

  const hours = document.querySelector('[data-hours]');
  hours.textContent = addLeadingZero(deltaTime.hours);

  const minutes = document.querySelector('[data-minutes]');
  minutes.textContent = addLeadingZero(deltaTime.minutes);

  const seconds = document.querySelector('[data-seconds]');
  seconds.textContent = addLeadingZero(deltaTime.seconds);
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
  return String(value).padStart(2, '0');
}
