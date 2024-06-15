import axios from "axios";

class ProductService {
    async create(data) {
        const response = await axios.post(`http://localhost:3001/product`, data);
        return response.data;
    };

    async get() {
        const response = await axios.get(`http://localhost:3001/product`);
        return response.data;
    }
}

export default new ProductService()