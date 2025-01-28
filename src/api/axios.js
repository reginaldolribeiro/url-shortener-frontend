import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        console.log("Request Config:", config)
        return config;
    },
    (error) => {
        console.error("Request Error:", error);
        return Promise.reject(error);
    }
)

api.interceptors.response.use(
    (response) => {
      console.log("API Response:", response);
      return response;
    },
    (error) => {
      console.error("Response Error:", error.response || error.message);
      return Promise.reject(error);
    }
)

export default api;