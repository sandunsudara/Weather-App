import axios from 'axios';

const URL = import.meta.env.VITE_GEO_DB_API_URL;
const API_HOST = import.meta.env.VITE_GEO_DB_API_HOST;
const API_KEY = import.meta.env.VITE_GEO_DB_API_KEY;

class GeoDBService {

    static async getPlace(place, signal) {
        try {
            const response = await axios.get(URL, {
                params: {
                    namePrefix: place,
                },
                headers: {
                    'x-rapidapi-host': API_HOST,
                    'x-rapidapi-key': API_KEY,
                },
                signal, // Pass AbortSignal here
            });
            return response.data;
        } catch (error) {
            // If aborted, ignore the error
            if (axios.isCancel(error)) {
                // Request was cancelled
                return null;
            }
            throw error;
        }
    }
}

export default GeoDBService;