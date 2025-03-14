import { ReviewResponseInterface } from '@/Interfaces/ReviewInterface'
import {Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Button } from './ui/button';
import { Textarea } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { editReview } from '@/Services/ReviewService';


interface ShowReviewsComponentProps {
  reviewsProp: ReviewResponseInterface;
  delReview: (id: number) => Promise<void>;
}

const ShowReviewsComponent = ({reviewsProp, delReview}: ShowReviewsComponentProps) => {
  const [reviews, setReviews] = useState<ReviewResponseInterface>();


  useEffect(() => {
    setReviews(reviewsProp);
  }, []);
  
  return (
    <div className="bg-white bg-opacity-90 rounded-lg p-4 mb-4 shadow-md transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="font-semibold text-lg text-blue-700">
          {reviewsProp.appUserName || "Anonymous User"}
        </div>
        <div className="text-xs text-gray-500">
          Review #{reviewsProp.id}
        </div>
      </div>
      
      <div className="text-gray-700 whitespace-pre-line">
        {reviewsProp.reviewText || "No written review provided."}
      </div>
      </div>
  )
}

export default ShowReviewsComponent