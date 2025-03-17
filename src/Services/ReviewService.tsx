import axios from "axios";
import { EditReviewInterface, ReviewInterface, ReviewResponseInterface } from "../Interfaces/ReviewInterface";
import { handleError } from "@/Helpers/Error";
import { toast } from "react-toastify";

const url: string = "http://localhost:5034/";

//Add review
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
        if (data && data.status == 201) {
            toast.success("Du har lagt till en recenssion! Tack för din åsikt");
        }
        return data;
    } catch (error) {
        handleError(error, "Kunde inte lägga till recenssion. Kontrollera att du är inloggad och försök igen");
    }
}

export const getMovieReviews = async (MovieId: number) => {
    const token = localStorage.getItem("token");
    try {
        const { data } = token 
            ? await axios.get<ReviewResponseInterface[]>(`${url}api/Reviews/${MovieId}`, {
                headers: { Authorization: `Bearer ${token}` }
              })
            : await axios.get<ReviewResponseInterface[]>(`${url}api/Reviews/${MovieId}`);
        
        if (!Array.isArray(data)) {
            throw Error;
        }
        return data;
    } catch (error) {
        handleError(error, "Det gick inte att hämta filmrecensioner")
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
        
        if (data && data.status == 204) {
            toast.success("Filmrecessiononen har raderats");
        }

        return data;
    } catch (error) {
        handleError(error)
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
        
        if (data && data.status == 204) {
            toast.success("Filmrecessiononen har ändrats");
        }

        return data;
    } catch (error) {
        handleError(error, "Det gick inte att redigera")
    }
}

//Like or Unlike a review
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
        handleError(error)
    }
}