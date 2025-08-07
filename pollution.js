document.addEventListener("DOMContentLoaded", () => {
  const aqiElement = document.getElementById("air-quality");

  // MOCK DATA — you can replace this with real API
  const mockAQI = 162;
  aqiElement.textContent = mockAQI;

  // Optional: change color based on AQI value
  if (mockAQI < 50) {
    aqiElement.classList.replace("text-red-500", "text-green-500");
  } else if (mockAQI < 100) {
    aqiElement.classList.replace("text-red-500", "text-yellow-500");
  }
});
