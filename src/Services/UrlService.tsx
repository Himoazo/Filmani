import axios from "axios";

const tmdb: string = "https://api.themoviedb.org/3";
const local: string = "https://filmapi-production-3b72.up.railway.app/"


//Axios instances

//TMDB
export const TMDB_API = axios.create({
    baseURL: tmdb,
    params: {
        api_key: import.meta.env.VITE_API_KEY
    }
});

//My API

export const LOCAL_API = axios.create({
    baseURL: local
});