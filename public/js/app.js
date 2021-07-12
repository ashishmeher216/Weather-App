// console.log('Hey, this is app.js running inside js dir of public dir');
console.log("Client side javascript file loaded successfully");

const weatherForm = document.querySelector("form");
const searchel = document.querySelector("input");
const message1 = document.getElementById("message1");
const message2 = document.getElementById("message2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchel.value;
  // console.log(location)

  message1.innerHTML = "Loading...";
  message2.innerHTML = "";
  // fetch(`http://localhost:3000/weather?address=${location}`).then(
  fetch(`/weather?address=${location}`).then( //for online website
    (response) => {
      response.json().then((data) => {
        if (data.error)
          // console.log(data.error);
          message1.innerHTML = data.error;
        else {
          // console.log(data.location);
          // console.log(data.forecast);
          message1.innerHTML = data.location;
          message2.innerHTML = data.forecast;
        }
      });
    }
  );
});
