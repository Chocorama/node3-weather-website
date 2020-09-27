console.log('client side JS file is loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          messageTwo.textContent = data.forecastData;
        }
      });
    }
  );
});

//request function in node we passed a callback as second argument but fetch api is different,  we use the then method on return value from fetch and provide to it the callback that we want to run

//fetch is only client side and cant be used in node
//https://blog.bitsrc.io/comparing-http-request-libraries-for-2019-7bedb1089c83
//link shows differences between all ajax based http clients front-end, back-end or both
