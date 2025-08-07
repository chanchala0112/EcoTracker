document.addEventListener("DOMContentLoaded", () => {
  const citySelect = document.getElementById("city");
  const modeSelect = document.getElementById("data-mode");
  const aqiEl = document.getElementById("aqi");
  const waterEl = document.getElementById("water");
  const noiseEl = document.getElementById("noise");

  // --- MOCK DATA ---
  const mockData = {
    Colombo: { aqi: 150, water: "Moderate", noise: "High" },
    Kandy: { aqi: 90, water: "Good", noise: "Medium" },
    Galle: { aqi: 60, water: "Poor", noise: "Low" },
    Jaffna: { aqi: 70, water: "Moderate", noise: "Medium" }
  };

  // Replace with your OpenWeatherMap API key
  const API_KEY = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

  function loadData() {
    const city = citySelect.value;
    const mode = modeSelect.value;

    if (mode === "mock") {
      const data = mockData[city];
      aqiEl.textContent = data.aqi;
      waterEl.textContent = data.water;
      noiseEl.textContent = data.noise;
    } else {
      // Fetch AQI from OpenWeatherMap (default to Colombo coordinates as example)
      const coordinates = {
        Colombo: { lat: 6.9271, lon: 79.8612 },
        Kandy: { lat: 7.2906, lon: 80.6337 },
        Galle: { lat: 6.0535, lon: 80.221 },
        Jaffna: { lat: 9.6615, lon: 80.0255 }
      };
      const { lat, lon } = coordinates[city];
      const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

      fetch(url)
        .then(res => res.json())
        .then(data => {
          const aqiValue = data.list[0].main.aqi;
          const readableAQI = ["Good", "Fair", "Moderate", "Poor", "Very Poor"][aqiValue - 1];
          aqiEl.textContent = readableAQI;
          waterEl.textContent = "-";
          noiseEl.textContent = "-";
        })
        .catch(err => {
          console.error(err);
          aqiEl.textContent = "Error";
        });
    }
  }

  citySelect.addEventListener("change", loadData);
  modeSelect.addEventListener("change", loadData);
  loadData(); // Load default
});
