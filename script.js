const getWeather = async (location) => {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?key=YTYCZNW65NFH2RR4MS4ZLWJT4`,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const processWeather = async (location) => {
  const data = await getWeather(location);

  console.log(data);

  return {
    address: data.address,
    temp: data.currentConditions.temp,
    conditions: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity,
    description: data.description,
  };
};

const getGif = async (search) => {
  search += " weather";
  const response = await fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=hmp81KwtETHroGwaoer8kdG7VyNORejx&s=${encodeURIComponent(search)}&rating=g`,
  );
  const data = await response.json();

  return data.data.images.original.url;
};

const form = document.querySelector("form");
const input = document.querySelector("input");
const address = document.querySelector("#location");
const conditions = document.querySelector("#conditions");
const temp = document.querySelector("#temp");
const humidity = document.querySelector("#humidity");
const description = document.querySelector("#description");
let currentScale = "fahrenheit";
const scaleButton = document.querySelector("#scale");
const img = document.querySelector("img");

const displayTemp = (f) => {
  if (currentScale === "fahrenheit") {
    temp.textContent = `Temperature: ${f} F`;
  } else {
    temp.textContent = `Temperature: ${Math.round((((f - 32) * 5) / 9) * 10) / 10} C`;
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  processWeather(input.value).then(async (data) => {
    address.textContent = data.address;
    conditions.textContent = data.conditions;
    scaleButton.addEventListener("click", () => {
      currentScale = currentScale === "fahrenheit" ? "celsius" : "fahrenheit";
      let changeTo = currentScale === "fahrenheit" ? "celsius" : "fahrenheit";
      scaleButton.textContent = `Change to ${changeTo}`;
      displayTemp(data.temp);
    });

    displayTemp(data.temp);
    humidity.textContent = `Humidity: ${data.humidity}`;
    description.textContent = data.description;
    let gif = await getGif(data.conditions);
    img.src = gif;
  });
});
