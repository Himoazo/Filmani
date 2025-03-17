import axios from "axios";
import { FilmDetails, FilmResponse, LocalFilmData } from "../Interfaces/FilmInterface";
import { handleError } from "@/Helpers/Error";


const url: string = "https://api.themoviedb.org/3";
const localApi: string = "http://localhost:5034"
const key: string = import.meta.env.VITE_API_KEY;
export const tmdb_img: string = "https://image.tmdb.org/t/p/";
export const no_img: string = "/no-img.svg";
// Popular movies
export const getPopMovies = async (page: number) => {

    try {
        const { data } = await axios.get<FilmResponse>(`${url}/trending/movie/week?language=sv-SV&page=${page}&api_key=${key}`);
        
        return data.results;
    } catch (error) {
        handleError(error, "Det gick inte att hämta filmer från TMDB. Försök igen")
        return [];
    }
}

// Serach media
export const searchMedia = async (keyword: string) => {
    try {
        const { data } = await axios.get(`${url}/search/movie?query=${keyword}&api_key=${key}&language=sv-SV`)

        return data.results;
        
    } catch (error) {
        handleError(error)
    }
}

export const mediaDetail = async (id: number) => {
    try {
        const { data } = await axios.get<FilmDetails>(`${url}/movie/${id}?api_key=${key}&language=sv-SV`);

        return data;
    } catch (error) {
        handleError(error)
    }
}

//Adds movie to own API if it not exits else gets view counts
export const addMovieToLocalAPI = async (id: number, filmSpecs: FilmDetails) => {
    const newFilm: LocalFilmData = {
        movieId: id,
        poster_path: filmSpecs.poster_path,
        title: filmSpecs.title,
        release_date: filmSpecs.release_date,
        overview: filmSpecs.overview
    }

    try {
        const data = await axios.post<LocalFilmData>(`${localApi}/api/Films`, newFilm);
        const count: number = data.data.viewCount!
        return count;
        
    } catch (error) {
        handleError(error)
        return null;
    }
}

export const getLocalFilms = async () => {
    try {
        const { data } = await axios.get<LocalFilmData[]>(`${localApi}/api/Films/reviewed`);

        if (!Array.isArray(data)) {
            throw Error;
        }
            return data;
    } catch (error) {
        handleError(error, "Det gick inte att hämta data från servern");
        return [];
    }
}

//Get view count
export const getViewCount = async (id: number) => {
    try {
        const { data } = await axios.get<number>(`${localApi}/api/Films/${id}`);

        return data;
    } catch (error) {
        return 0;
    }
}