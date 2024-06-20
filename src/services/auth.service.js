import axios from "axios";

class AuthService {
    async register(data) {
        const response = await axios.post(`http://localhost:3001/user/register`, data);
        return response.data;
    }

    async auth(data) {
        const response = await axios.post(`http://localhost:3001/user/login`, data);
        return response.data;
    }

    async get() {
        const response = await axios.get(`http://localhost:3001/user`);
        return response.data;
    }
}

export default new AuthService();