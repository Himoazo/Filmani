import React, { useEffect, useState } from 'react'
import { ReviewFormErrorInterface, ReviewInterface } from '../Interfaces/ReviewInterface';
import { Review } from '../Services/ReviewService';

interface ReviewFormProps {
    filmIdProp: number;
  }

const ReviewFormComponent = ({filmIdProp}: ReviewFormProps) => {
    const [review, setReview] = useState<ReviewInterface>({filmId: 0, userId: 0, rating: 0, reviewText: ""});
    const [formErrors, setFormErrors] = useState<ReviewFormErrorInterface>({})

    useEffect(() => {
        setReview(prev => ({ ...prev, userId: 10 }));
        setReview(prev => ({ ...prev, filmId: filmIdProp }));
    }, [])

    const validateReview = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const reviewValidation: ReviewFormErrorInterface = {};

        if (!review.filmId) {
            reviewValidation.filmId = "Film id saknas";
        }

        if (!review.userId) {
            reviewValidation.userId = "User id saknas";
            //return and navigate to login
        }

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
        console.log("addRev")
        await Review(review);
    }

  return (
      <>
        <form onSubmit={validateReview}>
            <label htmlFor="rating">Betyg</label>
              <input type="number" id="rating" name="rating" value={review.rating}
                  onChange={(event) => setReview(r => ({ ...r, rating: Number(event.target.value) }))}
              />
              {formErrors.rating && <span>{formErrors.rating}</span> }
            <label htmlFor="review">Recenssion</label> <br />
              <textarea name="review" id="review" value={review.reviewText}
                  onChange={(event) => setReview(t => ({ ...t, reviewText: event.target.value }))}
              />
              <input type="submit" value="Submit" />
              {formErrors.reviewText && <span>{formErrors.reviewText}</span> }
          </form>
          {formErrors.userId && <span>{formErrors.userId}</span>}
          {formErrors.filmId && <span>{formErrors.filmId}</span> }
      </>
  )
}

export default ReviewFormComponent