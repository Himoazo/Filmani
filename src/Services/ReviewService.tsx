import axios from "axios";
import { ReviewInterface } from "../Interfaces/ReviewInterface";

const url: string = "http://localhost:5034/";

export const Review = async (review: ReviewInterface) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw "Du måste vara inloggad för att recenssera";
        }
        const data  = await axios.post<ReviewInterface>(`${url}api/Reviews`, review, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        

        return data;
    } catch (error: any) {
        console.log(error);
        return [];
    }
}

export const addMovieToLocalAPI = async (id: number) => {
    try {
        const data = await axios.post(`${url}api/Films`, {
            "movieId": id
        });
        return data;
    } catch (error) {
        console.log(error);
    }
}
