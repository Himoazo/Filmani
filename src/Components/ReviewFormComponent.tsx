import React, { useEffect, useState } from 'react'
import { ReviewFormErrorInterface, ReviewInterface, ReviewResponseInterface } from '../Interfaces/ReviewInterface';
import { deleteReview, editReview, Review } from '../Services/ReviewService';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from './ui/button';
import { Textarea } from '@headlessui/react';
import { toast } from 'react-toastify';

interface ReviewFormProps {
  MovieIdIdProp: number;
  getReviews: () => void;
  reviewToEdit?: ReviewResponseInterface;
  }

const ReviewFormComponent = ({MovieIdIdProp, getReviews, reviewToEdit}: ReviewFormProps) => {
    const [review, setReview] = useState<ReviewInterface>({MovieId: 0, rating: 0, reviewText: ""});
    const [formErrors, setFormErrors] = useState<ReviewFormErrorInterface>({})
    const [open, setOpen] = useState(false);

    useEffect(() => {
      setReview(prev => ({ ...prev, MovieId: MovieIdIdProp }));
      if (reviewToEdit) {
        setReview(prev => ({ ...prev, id: reviewToEdit.id, rating: reviewToEdit.rating, reviewText: reviewToEdit.reviewText }))
      }
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

      if (reviewToEdit && review.id == null) {
        reviewValidation.id = "ID för omdöme som ska redigeras måste anges";
        }
      
        if (Object.keys(reviewValidation).length > 0) {
            setFormErrors(reviewValidation);
        } else if (reviewToEdit) {
          setFormErrors({});
          edit();
        } else {
            setFormErrors({});
            addReview();
        }
    }

    const addReview = async () => {
      await Review(review);
      setReview({ MovieId: 0, rating: 0, reviewText: "" });
      toast("Du har lagt till en recenssion! Tack för din åsikt");
      getReviews();
    }

  const edit = async () => {
    await editReview(review);
    setReview({ MovieId: 0, rating: 0, reviewText: "" });

    getReviews();
  }
  
  const deleteReviews = async (id: number) => {
    const confirmation = window.confirm("Är du säker att du vill ta bort reccensionen?");
    if (!confirmation) return;
    
    await deleteReview(id);
    getReviews();
  }
  
  
  return (
    <Dialog open={open} onOpenChange={setOpen} >
  <DialogTrigger asChild>
    <Button variant="outline"> {reviewToEdit ? "Redigera" : "Recensera"} </Button>
      </DialogTrigger>
      {formErrors.Error && <span className="text-sm text-red-500">{formErrors.Error}</span>}
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>{reviewToEdit ? "Redigera omdöme" : "Recensera"}</DialogTitle>
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
            onChange={(event) => setReview(r => ({ ...r, rating: Number(event.target.value) }))}/>
            </div>
            {formErrors.rating && <span className="text-sm text-red-500">{formErrors.rating}</span>}
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="review" className="text-right">
            Recension
          </Label>
          <Textarea 
            id="review" 
            value={review.reviewText} 
            className="col-span-3"
                onChange={(event) => setReview(t => ({ ...t, reviewText: event.target.value }))} />
              {formErrors.reviewText && <span className="text-sm text-red-500">{formErrors.reviewText}</span>}
        </div>
      </div>
      <DialogFooter>
            <Button type="submit">Save changes</Button>
            {reviewToEdit && <Button onClick={()=> deleteReviews(reviewToEdit.id)}>Delete</Button>}
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>   
      );
}

export default ReviewFormComponent


