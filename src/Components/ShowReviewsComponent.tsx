import { ReviewResponseInterface } from '@/Interfaces/ReviewInterface'
import { toggleLike } from '@/Services/ReviewService';


interface ShowReviewsComponentProps {
  reviewsProp: ReviewResponseInterface;
  getReviews: ()=> void
}

const ShowReviewsComponent = ({reviewsProp, getReviews}: ShowReviewsComponentProps) => {
  
  const Like = async (id: number) => {
    await toggleLike(id);
    getReviews();
  }
  return (
    <div className="bg-white bg-opacity-90 rounded-lg p-4 mb-4 shadow-md transition-all hover:shadow-lg">
      <div className="flex justify-between items-start mb-2">
        <div className="font-semibold text-lg text-blue-700">
          {reviewsProp.appUserName || "Anonymous User"}
        </div>
        <div className="text-xs text-gray-500">
          Rating {reviewsProp.rating}
        </div>
        <div className="text-xs text-gray-500">
          Datum {new Date(reviewsProp.createdAt).toLocaleDateString()}
        </div>
        <div className="text-xs text-gray-500">
          Likes: {reviewsProp.likeCount}
        </div>
        <div className=" text-gray-500">
          <button onClick={()=> {Like(reviewsProp.id)}}>Like button</button>
        </div>
      </div>
      
      <div className="text-gray-700 whitespace-pre-line">
        {reviewsProp.reviewText || "No written review provided."}
      </div>
      </div>
  )
}

export default ShowReviewsComponent