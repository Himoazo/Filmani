import { useAuth } from '@/Context/AuthContext';
import { ReviewResponseInterface } from '@/Interfaces/ReviewInterface'
import { toggleLike } from '@/Services/ReviewService';


interface ShowReviewsComponentProps {
  reviewsProp: ReviewResponseInterface;
  getReviews: ()=> void
}

const ShowReviewsComponent = ({reviewsProp, getReviews}: ShowReviewsComponentProps) => {
  const {  user } = useAuth();
  const Like = async (id: number) => {
    await toggleLike(id);
    getReviews();
  }
  return (
    <div>
      <div className="flex justify-between items-start mb-2">
        <div className="font-semibold text-lg text-blue-700">
          {reviewsProp.appUserName || "Anonymous User"}
        </div>
        <div className="text-xs text-gray-500">
          Betyg {reviewsProp.rating}
        </div>
        <div className="text-xs text-gray-500">
          Datum {new Date(reviewsProp.createdAt).toLocaleDateString()}
        </div>
        <div className="text-xs text-gray-500">
          Likes: {reviewsProp.likeCount} 
        </div>
        <div className="text-gray-500 relative group">
          <button onClick={() => Like(reviewsProp.id)} 
            disabled={!user} 
            className={!user ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            title={!user ? "Logga in för att kunna gilla recensioner" : ""}>
            {reviewsProp.hasUserLiked ? '❤️ Gillad' : '🤍 Gilla!!'}
          </button>
        </div>


      </div>
      
      <div className="text-gray-700 whitespace-pre-line">
        {reviewsProp.reviewText || <small>Ingen text</small>}
      </div>
      </div>
  )
}

export default ShowReviewsComponent