import axios from "axios";
class UserService {
    async create(data) {
        const response = await axios.post(`/user`, data);
        return response.data;
    };

    async get() {
        const response = await axios.get(`/user`);
        return response.data;
    }
}

export default new UserService();