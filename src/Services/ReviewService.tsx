import axios from "axios";
import { ReviewInterface } from "../Interfaces/ReviewInterface";

export const Review = async (review: ReviewInterface) => {
    console.log(review);
    /* try {
        const { data } = await axios.post(``);
        
        return data.results;
    } catch (error) {
        console.log(error);
        return [];
    } */
}

