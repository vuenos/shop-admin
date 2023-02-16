import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://localhost:5000',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default apiClient;