import { ReviewResponseInterface } from '@/Interfaces/ReviewInterface'

interface ShowReviewsComponentProps {
  reviewsProp: ReviewResponseInterface;
}

const ShowReviewsComponent = ({reviewsProp}: ShowReviewsComponentProps) => {
    

    
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