import axios from "axios";

// Create instance of axios with URL
const api = axios.create({
    baseURL: "http://localhost:8000",
});

export default api;
