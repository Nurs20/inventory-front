class SaleHistoryService {
    async create(data) {
        const response = await axios.post(`/sale-history`, data);
        return response.data;
    };

    async get() {
        const response = await axios.get(`sale-history`);
        return response.data;
    }
}

export default new SaleHistoryService();