import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import okIcon from '../img/ok.svg';
import ErrIcon from '../img/error-icon.svg';
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onCreatePromise);

function onCreatePromise(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const delay = form.elements.delay.value;
  const chooseState = form.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (chooseState === 'fulfilled') {
        return resolve(delay);
      }
      if (chooseState === 'rejected') {
        return reject(delay);
      }
    }, delay);
  });
  promise
    .then(resolve => {
      iziToast.show({
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#fff',
        color: '#59a10d',
        iconUrl: okIcon,
        position: 'topRight',
      });
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(reject => {
      iziToast.show({
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        color: '#EF4040',
        iconUrl: ErrIcon,
        position: 'topRight',
      });
      console.log(`❌ Rejected promise in ${delay}ms`);
    });
  event.currentTarget.reset();
}
