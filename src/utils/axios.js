import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api', // Assurez-vous que c'est l'URL correcte de votre backend
});

export default api;
