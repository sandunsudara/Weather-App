import axios from "axios";

const APIKEY = import.meta.env.VITE_WEATHER_API_KEY

class WeatherService {
    static async fetchWeatherData(lat, lon){
        const baseUrl = 'https://api.weatherapi.com/v1/current.json';
        const response = await  axios.get(baseUrl,{
            params: {
                key: APIKEY,
                q: `${lat},${lon}`
            }
        });
        return response;
    }
}

export default WeatherService;