import axios from "axios";

class SaleHistoryService {
    async create(data) {
        const response = await axios.post(`http://localhost:3001/sale-history`, data);
        return response.data;
    };

    async get() {
        const response = await axios.get(`http://localhost:3001/sale-history`);
        return response.data;
    }

    async remove(id) {
        const response = await axios.delete(`http://localhost:3001/sale-history/${id}`);
        return response.data;
    }
}

export default new SaleHistoryService();