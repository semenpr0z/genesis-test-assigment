import axios from "axios";

const clientId = '32185358';

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;