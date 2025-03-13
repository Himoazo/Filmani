import React, { useEffect, useState } from 'react'
import { ReviewFormErrorInterface, ReviewInterface } from '../Interfaces/ReviewInterface';
import { Review } from '../Services/ReviewService';

interface ReviewFormProps {
  MovieIdIdProp: number;
  getReviews: ()=>void
  }

const ReviewFormComponent = ({MovieIdIdProp, getReviews}: ReviewFormProps) => {
    const [review, setReview] = useState<ReviewInterface>({MovieId: 0, /* userId: 0, */ rating: 0, reviewText: ""});
    const [formErrors, setFormErrors] = useState<ReviewFormErrorInterface>({})

    useEffect(() => {
        /* setReview(prev => ({ ...prev, userId: 10 })); */
        setReview(prev => ({ ...prev, MovieId: MovieIdIdProp }));
    }, [])

    const validateReview = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const reviewValidation: ReviewFormErrorInterface = {};

        if (!review.MovieId) {
            reviewValidation.filmId = "Film id saknas";
        }

        /* if (!review.userId) {
            reviewValidation.userId = "User id saknas";
            //return and navigate to login
        } */

        if (!review.rating || review.rating < 1 || review.rating > 10) {
            reviewValidation.rating = "Betyget måste anges och vara mellan 1 och 10";
        }

        if (Object.keys(reviewValidation).length > 0) {
            setFormErrors(reviewValidation);
        } else {
            setFormErrors({});
            addReview();
        }
    }

    const addReview = async () => {
        await Review(review);
      setReview({ MovieId: 0, rating: 0, reviewText: "" });
      await getReviews();
    }

    return (
        <form onSubmit={validateReview} className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg mx-auto space-y-4">
          {/* Rating Input */}
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
              Betyg
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={review.rating}
              onChange={(event) => setReview(r => ({ ...r, rating: Number(event.target.value) }))}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              min="1"
              max="10"
            />
            {formErrors.rating && <span className="text-red-500 text-sm">{formErrors.rating}</span>}
          </div>
      
          {/* Review Textarea */}
          <div>
            <label htmlFor="review" className="block text-sm font-medium text-gray-700">
              Recenssion
            </label>
            <textarea
              name="review"
              id="review"
              value={review.reviewText}
              onChange={(event) => setReview(t => ({ ...t, reviewText: event.target.value }))}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none h-24"
            />
            {formErrors.reviewText && <span className="text-red-500 text-sm">{formErrors.reviewText}</span>}
          </div>
      
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
          >
            Submit
          </button>
      
          {/* General Errors */}
          {formErrors.userId && <span className="text-red-500 text-sm block">{formErrors.userId}</span>}
          {formErrors.filmId && <span className="text-red-500 text-sm block">{formErrors.filmId}</span>}
        </form>
      );
      
}

export default ReviewFormComponent