const getWeather = () => {
  //get the cities from the input
  const cities = document.getElementById("my_input").value;
  console.log(cities);
  const my_cities = cities.split(",");
  console.log({ cities: my_cities });
  fetch("http://localhost:3000/getWeather", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cities: my_cities }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      document.getElementById("weather_list").innerHTML = "";
      const weatherData = res.weather;
      my_cities.map((city) => {
        document.getElementById(
          "weather_list"
        ).innerHTML += `<li class="list-group-item">${city}: ${weatherData[city]}</li>`;
      });
    })
    .catch((e) => {
      document.getElementById("error_id").innerHTML =
        "Error while connecting to the server, please try again after reloading the site";
      console.log(e);
    });
};
