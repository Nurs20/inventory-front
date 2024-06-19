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

    async delete(id) {
        const response = await axios.delete(`http://localhost:3001/product/${id}`);
        return response.data;
    }

    async update(id, data) {
        const response = await axios.put(`http://localhost:3001/product/${id}`, data);
        return response.data;
    }
}

export default new ProductService()