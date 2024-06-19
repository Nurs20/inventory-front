import axios from "axios";

class ForecastService {
    async create(data) {
        const response = await axios.post(`http://localhost:3001/forecast`, data);
        return response.data;
    };

    async get() {
        const response = await axios.get(`http://localhost:3001/forecast`);
        return response.data;
    }
}

export default new ForecastService();