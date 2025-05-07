const endPoint = `https://api.openweathermap.org/data/2.5/`
const apiKey = `145b3348e32e832ec8601268ef2a622c`


export async function getWeatherData(lat, lon) {
    if (!lat || !lon) {
        console.error("Latitude and Longitude are required to fetch weather data.");
        return;
    }
    const url = `weather?lat=${lat}&lon=${lon}&appid=${apiKey}`

    try {
        const response = await fetch(`${endPoint}${url}`)
        if (!response.ok) {
            console.error("Error fetching weather data:", response.statusText);
            return null;
        }
        const data = await response.json();
        return data;

    }catch(err) {
        console.error("Error fetching weather data:", err);
        return null;
    }


}