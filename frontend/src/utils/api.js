import axios from 'axios'
const apiUrl = import.meta.env.VITE_API;

export default axios.create({
    baseURL: apiUrl 
})