import React, { useEffect, useState } from 'react'
import { ReviewFormErrorInterface, ReviewInterface, ReviewResponseInterface } from '../Interfaces/ReviewInterface';
import { deleteReview, editReview, Review } from '../Services/ReviewService';
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from './ui/button';
import { Textarea } from '@headlessui/react';
import { useAuth } from '@/Context/AuthContext';


interface ReviewFormProps {
  MovieIdIdProp: number;
  getReviews: () => void;
  reviewToEdit?: ReviewResponseInterface;
  }

const ReviewFormComponent = ({MovieIdIdProp, getReviews, reviewToEdit}: ReviewFormProps) => {
    const [review, setReview] = useState<ReviewInterface>({MovieId: MovieIdIdProp, rating: 0, reviewText: ""});
    const [formErrors, setFormErrors] = useState<ReviewFormErrorInterface>({})
    const [open, setOpen] = useState(false);
    const { user } = useAuth();
  
    useEffect(() => {
      setReview(prev => ({ ...prev, MovieId: MovieIdIdProp })); //At write new review
      
      if (reviewToEdit) { // At edit review
        setReview(prev => ({ ...prev, id: reviewToEdit.id, rating: reviewToEdit.rating, reviewText: reviewToEdit.reviewText }))
      }
    }, [reviewToEdit, MovieIdIdProp])

    //Form validation
    const validateReview = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

        setFormErrors({});
        
        const reviewValidation: ReviewFormErrorInterface = {};

        if (!review.MovieId) {
            reviewValidation.filmId = "Film id saknas";
        }

        if (!review.rating || review.rating < 1 || review.rating > 10) {
            reviewValidation.rating = "Betyget måste anges och vara mellan 1 och 10";
        }

      if (review.reviewText.length > 1000) {
        reviewValidation.reviewText = "Texten kan inte vara längre än 1000 tecken";
        }
      
      if (reviewToEdit && review.id == null) {
        reviewValidation.id = "ID för omdöme som ska redigeras måste anges";
        }    
        if (Object.keys(reviewValidation).length > 0) {
          setFormErrors(reviewValidation);

          return;
      } 
      if (reviewToEdit) {
        await edit();
      } else {
        await addReview();
      }    
    }

  const addReview = async () => {
      await Review(review);
      setReview({ MovieId: MovieIdIdProp, rating: 0, reviewText: "" });
      getReviews();
      setOpen(false);
    }

  const edit = async () => {
    await editReview(review);
    setReview({ MovieId: MovieIdIdProp, rating: 0, reviewText: "" });
    getReviews();
    setOpen(false);
  }
  
  const deleteReviews = async (id: number) => {
    const confirmation = window.confirm("Är du säker att du vill ta bort reccensionen?");
    if (!confirmation) return;
    
    await deleteReview(id);
    getReviews();
  }
  
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (isOpen && !reviewToEdit) {
        setFormErrors({});
        setReview({ MovieId: MovieIdIdProp, rating: 0, reviewText: "" });
      }
    }}>
    
<DialogTrigger asChild>
  {reviewToEdit ? ( /* Edit review btn: review owner/admin */
    <Button 
      variant="outline" className="bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-300 hover:border-amber-400 
      transition-colors duration-200 flex items-center gap-2 cursor-pointer">
      {reviewToEdit?.appUserId == user?.id ? "Redigera" : user?.role == "Admin" 
        ? <>Redigera <small className="text-red-500">(Admin)</small></> 
        : "Redigera"}
    </Button>
  ) : ( /* Write review btn */
    <Button variant="outline" disabled={!user} className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300 
    hover:border-blue-400 transition-colors duration-200 flex items-center gap-2 cursor-pointer" >
              <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex size-3 rounded-full bg-sky-500"></span>
              </span>
                {user ? "Recensera" : "Logga in för att recensera"}
    </Button>
  )}
</DialogTrigger>
{formErrors.Error && (
  <span className="text-sm text-red-500 flex items-center gap-1.5 mt-1 animate-fade-in">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
    {formErrors.Error}
  </span>
)}
<DialogContent className="sm:max-w-[450px] bg-gradient-to-b from-white to-gray-50 border-0 shadow-lg rounded-xl p-0 overflow-hidden">
  <DialogHeader className="bg-blue-50 px-6 py-4 border-b border-blue-100">
    <DialogTitle className="text-2xl font-bold text-blue-800">
      {reviewToEdit ? "Redigera omdöme" : "Recensera"}
    </DialogTitle>
    <DialogDescription className="text-blue-700 mt-1">
      Skriv ditt omdömme om denna film!
    </DialogDescription>
  </DialogHeader>
  <form onSubmit={validateReview} className="px-6">
    <div className="grid gap-6 py-6">
      <div className="space-y-1">
        <div className="grid grid-cols-4 items-center gap-4">
          {/* Rating */}
          <Label htmlFor="rating" className="text-right font-medium text-gray-700">
            Betyg
          </Label>
          <div className="col-span-3">
            <Input type="number" id="rating" name="rating" value={review.rating} 
              className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm transition-all duration-200"
              min="1" max="10" onChange={(event) => setReview(r => ({ ...r, rating: Number(event.target.value) }))}/>
          </div>
        </div>
        {formErrors.rating && (
          <div className="col-start-2 col-span-3 ml-4">
            <span className="text-sm text-red-500 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {formErrors.rating}
            </span>
          </div>
        )}
      </div>
      {/* Review text */}
      <div className="space-y-1">
        <div className="grid grid-cols-4 items-start gap-4">
          <Label htmlFor="review" className="text-right font-medium text-gray-700 mt-2">
            Recension
          </Label>
          <div className="col-span-3">
            <Textarea id="review" value={review.reviewText} 
              className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 rounded-md shadow-sm transition-all duration-200 min-h-[120px]"
              onChange={(event) => setReview(t => ({ ...t, reviewText: event.target.value }))}
            />
          </div>
        </div>
        {formErrors.reviewText && (
          <div className="col-start-2 col-span-3 ml-4">
            <span className="text-sm text-red-500 flex items-center gap-1.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {formErrors.reviewText}
            </span>
          </div>
        )}
      </div>
    </div>
    {/* Save */}
    <DialogFooter className="py-4 border-t border-gray-100 gap-3">
      <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white transition-colors px-6 rounded-full">
        Spara
      </Button>
      {/* Delette */}
      {reviewToEdit && (
        <Button type="button" onClick={(e) => {e.preventDefault(); deleteReviews(reviewToEdit.id); setOpen(false);}}
          className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 transition-colors px-6 rounded-full"
        >
          Ta bort
        </Button>
      )}
    </DialogFooter>
  </form>
</DialogContent>
</Dialog>
      )
}

export default ReviewFormComponent


