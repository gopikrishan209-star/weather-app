async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const country = document.getElementById("country").value.trim();

  const apiKey = "d76db967858bd1cbc8475fee465fc006";

  if (!city) {
    document.getElementById("result").innerHTML = "⚠ Please enter city";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}${country ? "," + country : ""}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod != 200) {
      document.getElementById("result").innerHTML = "❌ City not found";
      return;
    }

    const icon = data.weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    document.getElementById("result").innerHTML = `
      <img src="${iconUrl}" />
      <h2>${data.name}</h2>
      🌡 Temperature: ${Math.round(data.main.temp)}°C <br>
      ☁ Weather: ${data.weather[0].main} <br>
      💧 Humidity: ${data.main.humidity}% <br>
      🌬 Wind: ${data.wind.speed} m/s
    `;
  } catch (error) {
    document.getElementById("result").innerHTML = "⚠ Error fetching data";
  }
}