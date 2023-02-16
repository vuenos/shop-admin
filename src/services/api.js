import axios from 'axios';

const apiClient = axios.create({
    // baseURL: 'https://s3dev.sellerhub.co.kr',
    baseURL: 'https://shapi.sellerhub.co.kr',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default apiClient;