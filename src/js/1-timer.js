import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import ErrIcon from '../img/error-icon.svg';

const dateTimeEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('.btn-start');

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();

    if (Date.now() >= userSelectedDate) {
      startBtn.disabled = true;

      iziToast.show({
        message: 'Please choose a date in the future',
        messageColor: '#fff',
        color: '#EF4040',
        iconUrl: ErrIcon,
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
    const timeLeft = userSelectedDate - Date.now();

    if (timeLeft <= 0) {
      clearInterval(timerId);

      renderTimerValues({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });

      startBtn.disabled = true;
      dateTimeEl.disabled = false;

      return;
    }

    renderTimerValues(convertMs(timeLeft));
  }, 1000);
});

function renderTimerValues(deltaTime) {
  const days = document.querySelector('[data-days]');
  const hours = document.querySelector('[data-hours]');
  const minutes = document.querySelector('[data-minutes]');
  const seconds = document.querySelector('[data-seconds]');

  days.textContent = addLeadingZero(deltaTime.days);
  hours.textContent = addLeadingZero(deltaTime.hours);
  minutes.textContent = addLeadingZero(deltaTime.minutes);
  seconds.textContent = addLeadingZero(deltaTime.seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
