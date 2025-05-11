let searchInput = document.querySelector("#search");
// * Today Variables
let todayName = document.querySelector("#today-date-name");
let todayNumber = document.querySelector("#today-date-number");
let todayMonth = document.querySelector("#today-month");

let todayLocation = document.querySelector("#today-location");
let todayTemp = document.querySelector("#today-temp");
let todayImg = document.querySelector("#today-img");
let todayText = document.querySelector("#today-text");
let humidity = document.querySelector("#humidity");
let wind = document.querySelector("#wind");
let windDirection = document.querySelector("#wind-direction");
// * Next Day Variables
let nextDay = document.querySelectorAll(".next-day-name");
let nextMaxTemp = document.querySelectorAll(".next-max-temp");
let nextMinTemp = document.querySelectorAll(".next-min-temp");
let nextImg = document.querySelectorAll(".next-img");
let nextText = document.querySelectorAll(".next-text");
let myLocation;
// ! ================================ APIs ================================
// ! search
// http://api.weatherapi.com/v1/search.json?key=14cefa4fb9d7463e846135804242804&q=lond
// ! Current
// http://api.weatherapi.com/v1/current.json?key=14cefa4fb9d7463e846135804242804&q=London
// ! Forcast 3 days
// http://api.weatherapi.com/v1/forecast.json?key=14cefa4fb9d7463e846135804242804&q=london&days=3

// ! =======================================================================
// let date = new Date("2025-05-11");
// console.log(date.getDate());
// console.log(
//   date.toLocaleDateString("en-GB", {
//     weekday: "short",
//     month: "short",
//     day: "numeric",
//   })
// );

// ! ================================ Start ================================
async function getWeatherData(cityName) {
  let weathetResponse = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=14cefa4fb9d7463e846135804242804&q=${cityName}&days=3`
  );
  let weatherData = await weathetResponse.json();
  return weatherData;
}
// ! Today Data
function displayTodayData(data) {
  let todayDate = new Date();
  weekday = todayDate.toLocaleDateString("en-GB", { weekday: "long" }); //Saturday
  month = todayDate.toLocaleDateString("en-GB", { month: "short" }); //may
  day = todayDate.getDate(); //10

  todayName.innerHTML = weekday;
  todayNumber.innerHTML = day;
  todayMonth.innerHTML = month;
  todayLocation.innerHTML = data.location.name;
  todayTemp.innerHTML = data.current.temp_c;
  todayImg.setAttribute("src", `https:${data.current.condition.icon}`);
  todayText.innerHTML = data.current.condition.text;
  humidity.innerHTML = data.current.humidity + "%";
  wind.innerHTML = data.current.wind_kph + "km/h";
  windDirection.innerHTML = data.current.wind_dir;
}
// ! Next Data
function displayNextData(data) {
  let forcastData = data.forecast.forecastday;
  for (let i = 0; i < 2; i++) {
    nextMaxTemp[i].innerHTML = forcastData[i + 1].day.maxtemp_c;
    nextMinTemp[i].innerHTML = forcastData[i + 1].day.mintemp_c;
    nextText[i].innerHTML = forcastData[i + 1].day.condition.text;
    nextImg[i].setAttribute(
      "src",
      `https:${forcastData[i + 1].day.condition.icon}`
    );
    let nextdayDate = new Date(forcastData[i + 1].date);
    nextweekday = nextdayDate.toLocaleDateString("en-GB", { weekday: "long" }); //Saturday
    nextDay[i].innerHTML = nextweekday;
  }
}

async function startApp(city = "cairo") {
  let weatherData = await getWeatherData(city);
  if (!weatherData.error) {
    displayTodayData(weatherData);
    displayNextData(weatherData);
  }
}
startApp();

searchInput.addEventListener("input", function () {
  if (searchInput.value.length >= 3) {
    startApp(searchInput.value);
  } else {
    startApp(myLocation);
  }
});

navigator.geolocation.getCurrentPosition(function (position) {
  let liveLocation = position.coords.latitude + "," + position.coords.longitude;
  myLocation = liveLocation;
  startApp(myLocation);
});
