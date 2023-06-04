const express = require("express");
require("dotenv").config();

const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

const getLatLong = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.KEY}&units=metric`;
  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();
  return data;
};

const getWeather = async (req) => {
  const cities = req.body.cities;
  let ret = {};
  ret.weather = {};
  let idx = 0;
  for (idx = 0; idx < cities.length; idx++) {
    const weatherData = await getLatLong(cities[idx]);
    const temp = Math.round(weatherData.main.temp);

    ret.weather = { ...ret.weather, [cities[idx]]: temp + "C" };
  }
  return ret;
};

app.post("/getWeather", async (req, res) => {
  const weather = await getWeather(req);
  res.json(weather);
});

app.listen(process.env.PORT, () => {
  console.log("Server is up and running at port " + process.env.PORT);
});
