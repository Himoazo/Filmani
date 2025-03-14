import React, { useEffect, useState } from 'react'
import { ReviewFormErrorInterface, ReviewInterface } from '../Interfaces/ReviewInterface';
import { Review } from '../Services/ReviewService';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from './ui/button';
import { Textarea } from '@headlessui/react';
interface ReviewFormProps {
  MovieIdIdProp: number;
  getReviews: ()=>void
  }

const ReviewFormComponent = ({MovieIdIdProp, getReviews}: ReviewFormProps) => {
    const [review, setReview] = useState<ReviewInterface>({MovieId: 0, rating: 0, reviewText: ""});
    const [formErrors, setFormErrors] = useState<ReviewFormErrorInterface>({})

    useEffect(() => {
        setReview(prev => ({ ...prev, MovieId: MovieIdIdProp }));
    }, [])

    const validateReview = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const reviewValidation: ReviewFormErrorInterface = {};

        if (!review.MovieId) {
            reviewValidation.filmId = "Film id saknas";
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
        await Review(review);
      setReview({ MovieId: 0, rating: 0, reviewText: "" });
      await getReviews();
    }

  return (
    <Dialog>
  <DialogTrigger asChild>
    <Button variant="outline">Recensera</Button>
  </DialogTrigger>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Edit profile</DialogTitle>
      <DialogDescription>
        Skriv ditt omdömme om denna film!
      </DialogDescription>
    </DialogHeader>
    <form onSubmit={validateReview}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="rating" className="text-right">
            Betyg
          </Label>
          <Input type="number" id="rating" name="rating" value={review.rating} 
            className="col-span-3" min="1" max="10"
            onChange={(event) => setReview(r => ({ ...r, rating: Number(event.target.value) }))}
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="review" className="text-right">
            Recension
          </Label>
          <Textarea 
            id="review" 
            value={review.reviewText} 
            className="col-span-3"
            onChange={(event) => setReview(t => ({ ...t, reviewText: event.target.value }))}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>   
      );
}

export default ReviewFormComponent


