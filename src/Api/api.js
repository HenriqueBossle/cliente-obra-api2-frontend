import axios from 'axios';

//const api = axios.create({ baseURL: 'https://cliente-obra-api2.onrender.com/api/'})
const api = axios.create({ baseURL: 'http://127.0.0.1:8000/api/'})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;

})


export default api;