import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form-promise');

formEl.addEventListener('submit', onCreatePromise);

function onCreatePromise(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const delay = form.elements.delay.value;
  const chooseState = form.elements.state.value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (chooseState === 'fulfilled') {
        return resolve('fulfilled');
      }
      if (chooseState === 'rejected') {
        return reject('rejected');
      }
    }, delay);
  });
  promise
    .then(resolve => {
      iziToast.show({
        message: `Fulfilled promise in ${delay}ms`,
        messageColor: '#fff',
        color: '#59a10d',
        iconUrl: './img/ok.svg',
        position: 'topRight',
      });
      console.log(`✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(reject => {
      iziToast.show({
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#fff',
        color: '#EF4040',
        iconUrl: './img/error-icon.svg',
        position: 'topRight',
      });
      console.log(`❌ Rejected promise in ${delay}ms`);
    });
  event.currentTarget.reset();
}
