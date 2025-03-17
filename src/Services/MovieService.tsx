import { FilmDetails, FilmResponse, LocalFilmData } from "../Interfaces/FilmInterface";
import { handleError } from "@/Helpers/Error";
import { LOCAL_API, TMDB_API } from "./UrlService";

// base url for imgs from filmdata & fallback img
export const tmdb_img: string = "https://image.tmdb.org/t/p/";
export const no_img: string = "/no-img.svg";

// Popular movies
export const getPopMovies = async (page: number) => {

    try {
        const { data } = await TMDB_API.get<FilmResponse>(`/trending/movie/week?language=sv-SV&page=${page}`);
        
        return data.results;
    } catch (error) {
        handleError(error, "Det gick inte att hämta filmer från TMDB. Försök igen")
        return [];
    }
}

// Serach media
export const searchMedia = async (keyword: string) => {
    try {
        const { data } = await TMDB_API.get(`/search/movie?query=${keyword}&language=sv-SV`)

        return data.results;
        
    } catch (error) {
        handleError(error)
    }
}

export const mediaDetail = async (id: number) => {
    try {
        const { data } = await TMDB_API.get<FilmDetails>(`/movie/${id}?language=sv-SV`);

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
        const data = await LOCAL_API.post<LocalFilmData>(`/api/Films`, newFilm);
        const count: number = data.data.viewCount!
        return count;
        
    } catch (error) {
        handleError(error)
        return null;
    }
}

export const getLocalFilms = async () => {
    try {
        const { data } = await LOCAL_API.get<LocalFilmData[]>(`/api/Films/reviewed`);

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
        const { data } = await LOCAL_API.get<number>(`/api/Films/${id}`);

        return data;
    } catch (error) {
        return 0;
    }
}