class ForecastService {
    async create(data) {
        const response = await axios.post(`/forecast`, data);
        return response.data;
    };

    async get() {
        const response = await axios.get(`forecast`);
        return response.data;
    }
}

export default new ForecastService();