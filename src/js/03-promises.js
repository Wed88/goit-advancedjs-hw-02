import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector(".form");

formEl.addEventListener("submit", event => {
  event.preventDefault();

  const { delay, step, amount } = event.currentTarget;

  let delayPromise = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, delayPromise).then(onFulfilled).catch(onRejected);
    delayPromise += Number(step.value);
  }

  event.currentTarget.reset();
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
};

function onFulfilled(result) {
  iziToast.success({message: `${result}`});
};

function onRejected(error) {
  iziToast.error({message: `${error}`});
};
