import axios from "axios";
import { FilmResponse, SeriesResponse } from "../Interfaces/FilmInterface";

const url: string = "https://api.themoviedb.org/3";
const key: string = import.meta.env.VITE_API_KEY;

// Popular movies
export const getPopMovies = async () => {
    try {
        const { data } = await axios.get<FilmResponse>(`${url}/trending/movie/week?language=en-US&page=1&api_key=${key}`);
        
        return data.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const getPopSeries = async () => {
    try {
        const { data } = await axios.get<SeriesResponse>(`${url}/trending/tv/week?language=en-US&page=1&api_key=${key}`);
        
        return data.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}