import axios from "axios";
import { FilmDetails, FilmResponse, LocalFilmData } from "../Interfaces/FilmInterface";


const url: string = "https://api.themoviedb.org/3";
const localApi: string = "http://localhost:5034"
const key: string = import.meta.env.VITE_API_KEY;
export const tmdb_img: string = "https://image.tmdb.org/t/p/";
export const no_img: string = "vite.svg";
// Popular movies
export const getPopMovies = async (page: number) => {

    try {
        const { data } = await axios.get<FilmResponse>(`${url}/trending/movie/week?language=en-US&page=${page}&api_key=${key}`);
        
        return data.results;
    } catch (error) {
        console.log(error);
        return [];
    }
}

// Serach media
export const searchMedia = async (keyword: string) => {
    console.log("CAALLLEEED")
    try {
        const { data } = await axios.get(`${url}/search/movie?query=${keyword}&api_key=${key}`)

        return data.results;
        
    } catch (error) {
        
    }
}

export const mediaDetail = async (id: number) => {
    /* console.log(`${url}/movie/${id}?append_to_response=credits,images,videos,reviews,similar&include_image_language=en&api_key=${key}`) */
    try {
        const { data } = await axios.get<FilmDetails>(`${url}/movie/${id}?api_key=${key}&language=sv-SV`);

    
        return data;
    } catch (error) {
        
    }
}

//Adds movie to own API if it not exits
export const addMovieToLocalAPI = async (id: number) => {
    try {
        const data = await axios.post<LocalFilmData>(`${localApi}/api/Films`, {
            movieId: id
        });
        return data.data.viewCount;
        
    } catch (error) {
        console.log(error);
        return null;
    }
}