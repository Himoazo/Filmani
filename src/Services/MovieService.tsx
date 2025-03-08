import axios from "axios";

const url: string = "https://api.themoviedb.org/3";
const key: string = import.meta.env.API_KEY;

// Popular movies
export const getPopMovies = async () => {
    try {
        const data = await axios.get(`${url}/movie/popular?language=en-US&page=1&api_key=${key}`);
    } catch (error) {
        console.log(error);
    }
}