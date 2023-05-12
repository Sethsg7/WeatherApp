let API_KEY = "46636ff0e8b83e768569cbebb562e85e";
let API_KEY2 = "b537f9c4a5261d2c9a74480e0e8b2b26";

let form = document.getElementById("form");
let city = document.getElementById("city"); //Form Input value.
let country = document.getElementById("country"); //Form Input value.
let cityName = "";
let countryName = "";
let cityHead = document.getElementById("cityHead");

//-------------------------------------------------------------------------------------

function getCity(event) {
  event.preventDefault();
  cityName = city.value;
  cityHead.textContent = cityName; //Used get id to change text content.
  countryName = country.value;
  getTarget(cityName, countryName);
  getTargetC(cityName, countryName);
}

form.addEventListener("submit", getCity);

//-----------------------------------------------------------------------------------------------------
//FORECAST INFO
let weather1 = document.getElementById("weather1");
let weather2 = document.getElementById("weather2");
let weather3 = document.getElementById("weather3");
let weather4 = document.getElementById("weather4");
let weather5 = document.getElementById("weather5");
let main1 = document.getElementById("main1");
let main2 = document.getElementById("main2");
let main3 = document.getElementById("main3");
let main4 = document.getElementById("main4");
let main5 = document.getElementById("main5");
let icon1 = document.getElementById("icon1");
let icon2 = document.getElementById("icon2");
let icon3 = document.getElementById("icon3");
let icon4 = document.getElementById("icon4");
let icon5 = document.getElementById("icon5");

let savedWeather;

//-----------------------------------------------------------------------------------------------------

//FORECAST Fetch Request
function getTarget(cityName, countryName) {
  console.log("test", cityName, countryName);
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}, ${countryName}&appid=${API_KEY}&units=imperial`
  )
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      console.log("body", body);
      savedWeather = body;

      let temp1 = body.list[3].main.temp;
      //2023-04-14 00:00:00
      let date1unf = body.list[3].dt_txt;
      let date1 = date1unf.slice(5, 10).split("-").join("/");
      weather1.textContent = `${date1} ${Math.ceil(temp1)}° F`;
      main1.textContent = body.list[3].weather[0].main;
      let wthImg1 = body.list[3].weather[0].icon;
      icon1.src = `https://openweathermap.org/img/wn/${wthImg1}@2x.png`;
      console.log(main1);

      let temp2 = body.list[9].main.temp;
      let date2unf = body.list[9].dt_txt;
      let date2 = date2unf.slice(5, 10).split("-").join("/");
      weather2.textContent = `${date2} ${Math.ceil(temp2)}° F`;
      main2.textContent = body.list[9].weather[0].main;
      let wthImg2 = body.list[9].weather[0].icon;
      icon2.src = `https://openweathermap.org/img/wn/${wthImg2}@2x.png`;

      let temp3 = body.list[17].main.temp;
      let date3unf = body.list[17].dt_txt;
      let date3 = date3unf.slice(5, 10).split("-").join("/");
      weather3.textContent = `${date3} ${Math.ceil(temp3)}° F`;
      main3.textContent = body.list[17].weather[0].main;
      let wthImg3 = body.list[17].weather[0].icon;
      icon3.src = `https://openweathermap.org/img/wn/${wthImg3}@2x.png`;

      let temp4 = body.list[25].main.temp;
      let date4unf = body.list[25].dt_txt;
      let date4 = date4unf.slice(5, 10).split("-").join("/");
      weather4.textContent = `${date4} ${Math.ceil(temp4)}° F`;
      main4.textContent = body.list[25].weather[0].main;
      let wthImg4 = body.list[25].weather[0].icon;
      icon4.src = `https://openweathermap.org/img/wn/${wthImg4}@2x.png`;

      let temp5 = body.list[33].main.temp;
      let date5unf = body.list[33].dt_txt;
      let date5 = date5unf.slice(5, 10).split("-").join("/");
      weather5.textContent = `${date5} ${Math.ceil(temp5)}° F`;
      main5.textContent = body.list[33].weather[0].main;
      let wthImg5 = body.list[33].weather[0].icon;
      icon5.src = `https://openweathermap.org/img/wn/${wthImg5}@2x.png`;

      populateSavedCities();
    })
    .catch((err) => {
      console.log(err);
    });
}

//CURRENT WEATHER FETCH
function getTargetC(cityName, countryName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}, ${countryName}&appid=${API_KEY2}&units=imperial`
  )
    .then((res) => {
      return res.json();
    })
    .then((body) => {
      savedWeather = body;

      // //Use this for header or today's temp.
      let temp0 = body.main.temp;
      let date0unf = body.dt;

      let fullDate = new Date(date0unf * 1000); //Fixes Unix time.
      let date0 = `${fullDate.getMonth() + 1}/${fullDate.getDate()}`;
      cityHead.textContent = `${cityName} ${date0} ${Math.ceil(temp0)}° F  `;
    })
    .catch((err) => {
      console.log(err);
    });
}

//-----------------------------------------------------------------------------------------------------

let home = [];
let currentHome = document.getElementById("currentHome");
let homeForm = document.getElementById("homeCity");
let homeSave = document.getElementById("home");

homeSave.addEventListener("click", setHome);
currentHome.textContent = "Set a home city.";

function setHome() {
  let home1 = document.createElement("p");
  let homeParent = document.getElementById("currentHomeContainer");
  homeParent.innerHTML = ""; //Erases children also.
  home1.id = "currentHome";
  home1.textContent = cityName + ", " + countryName;
  console.log("city", city.value);
  console.log("country", country.value);
  let temp1 = city.value;
  let temp2 = country.value;
  home1.addEventListener("click", () => {
    getTarget(temp1, temp2);
    getTargetC(temp1, temp2);
  });
  homeParent.appendChild(home1);
}

//-----------------------------------------------------------------------------------------------------

class SavedCity {
  constructor(city, country, weather, time) {
    this.country = country;
    this.city = city;
    this.weather = weather;
    this.time = time;
  }
}

let saved = [];
let saveButton = document.getElementById("save");
saveButton.addEventListener("click", bookmarkCity);

//-----------------------------------------------------------------------------------------------------

function bookmarkCity() {
  //Instance is created and added to the Saved array here.
  if (!saved.find((savedCity) => savedCity.city === cityName)) {
    let time = new Date(Date.now()).toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }); //Timestamp used for bookmark.
    saved.push(new SavedCity(cityName, countryName, savedWeather, time)); //Was stuck on 3rd argument. Made into fetch request body.
  }
  populateSavedCities();
}

//-----------------------------------------------------------------------------------------------------

//Instance for CityClick was made in bookmarkCity.
//On bookmarked city click, fetches temperature info.
const cityClick = (e) => {
  const name = e.currentTarget.parentElement.getAttribute("data-city");
  //Attribute is added later.

  const city = saved.find((cityObj) => cityObj.city === name);
  //The city const here is actually the instance itself.
  //Name is used here to test if what was clicked is in the array.

  getTarget(city.city, city.country);
  getTargetC(city.city, city.country);
};

//-----------------------------------------------------------------------------------------------------

const deleteCity = (e) => {
  const name = e.currentTarget.parentElement.getAttribute("data-city");
  saved = saved.filter((savedCity) => savedCity.city !== name);
  e.currentTarget.parentElement.remove();
};

//-----------------------------------------------------------------------------------------------------

function populateSavedCities() {
  var savedCityList = document.getElementById("savedCitiesList");
  savedCityList.innerHTML = "";
  for (let city of saved) {
    let li = document.createElement("li");
    li.setAttribute("data-city", city.city);

    savedCityList.appendChild(li);

    let savedCity = document.createElement("span");
    let timeSpan = document.createElement("span");
    let xButton = document.createElement("span");

    savedCity.addEventListener("click", cityClick);

    savedCity.textContent = city.city;
    savedCity.classList.add("saved-city");

    timeSpan.textContent = " " + city.time;

    xButton.textContent = " X";
    xButton.classList.add("delete");
    xButton.addEventListener("click", deleteCity);

    li.appendChild(savedCity);
    li.appendChild(timeSpan);
    li.appendChild(xButton);
  }
}

//-------------------------------------------------------------------------------------------------------------------------

//Old attempted code.

// function populateSavedCities () {
//   var savedCityList = document.getElementById('savedCitiesList');
//   savedCityList.innerHTML = '';

//   for (let city of saved) {
//     let listControl = document.createElement('li');//Creats and adds an Li to the List every click.
//     savedCityList.appendChild(listControl);

//     let savedCity = document.createElement('span');//Creates and Becomes the element at the same time.
//     let xButton = document.createElement('span');

//     savedCity.addEventListener('click', () => { //Allows refetching a city by clicking it on the saved list.
//       getTarget(city.city, city.country);//Changes forecast blocks of info.
//       getTargetC(city.city, city.country);//Specifically changes Header info.
//     })

//     savedCity.textContent = city.city;
//     savedCity.classList.add('saved-city');//Adds class that was used in CSS.

//     xButton.textContent = " X";
//     xButton.classList.add("delete");
//     xButton.addEventListener("click", deleteCity);

//     listControl.appendChild(savedCity);
//     listControl.appendChild(xButton);

//     //Need to make the entries remove from the array.

// let removeBtn = document.getElementsByClassName("delete");

//   for (let i = 0; i < removeBtn.length; i++) {
//     removeBtn[i].addEventListener('click', deleteCity)
//   }

//   function deleteCity(event) {
//     const name = event.currentTarget.parentElement.textContent.split(' ');
//     saved = saved.filter(savedCity => savedCity.city !== name);
//     event.currentTarget.parentElement.remove();
//     console.log(event.currentTarget.parentElement.textContent);
//   };
// }
// }
