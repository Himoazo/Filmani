import axios from "axios";
import { EditReviewInterface, ReviewInterface, ReviewResponseInterface } from "../Interfaces/ReviewInterface";

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


export const getMovieReviews = async (MovieId: number) => {
    try {
        const { data } = await axios.get<ReviewResponseInterface[]>(`${url}api/Reviews/${MovieId}`);

        return data;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export const deleteReview = async (Id: number) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw "Du måste vara inloggad för att recenssera";
        }
        const data = await axios.delete(`${url}api/Reviews/${Id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data;
    } catch (error) {
        console.log(error);
    }
}


export const editReview = async (review: ReviewInterface) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw "Du måste vara inloggad för att redigera";
        }

        const editedReview: EditReviewInterface = {
            rating: review.rating,
            reviewText: review.reviewText
        }
        const data = await axios.put(`${url}api/Reviews/${review.id}`, editedReview ,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data;
    } catch (error) {
        console.log(error);
    }
}


export const toggleLike = async (id: number) => {
    try {
        const token = localStorage.getItem("token");
        if (!token) {
            throw "Du måste vara inloggad för att redigera";
        }

        const { data } = await axios.post(`${url}api/Reviews/toggle-like/${id}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        console.log(error)
        throw error
    }
}