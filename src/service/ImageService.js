import axios from 'axios';

const URL = import.meta.env.VITE_UNSPLASH_URL;
const ACC_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

class ImageService  {
    static async getImage(searchTerm) {
        const response = await axios.get(URL , {
            params: {
                query: searchTerm,
                per_page: 1,
                orientation: 'landscape',
            },
            headers: {
                Authorization: `Client-ID ${ACC_KEY}`,
            },
        })
        return response;

    }
}

export default ImageService;