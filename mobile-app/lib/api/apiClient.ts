import axios from 'axios';
import { loadUser } from '../storage/userStorage';

const apiClient = axios.create({
    baseURL: 'http://192.168.223.120:5000/api', // Your server's base URL
});

// Use an interceptor to add the auth token to every API request
apiClient.interceptors.request.use(
    async (config) => {
        const user = await loadUser();
        if (user?.token) {
            config.headers.Authorization = `Bearer ${user.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default apiClient;