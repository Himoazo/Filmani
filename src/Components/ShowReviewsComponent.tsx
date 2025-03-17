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
    <div className="p-4 border-b border-gray-200">
      {/* User & Date */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">
          {reviewsProp.appUserName || "Anonymous User"}
        </h3>
        <span className="text-sm text-gray-500">
          {new Date(reviewsProp.createdAt).toLocaleDateString()}
        </span>
      </div>
  
      {/* Rating & antal likes */}
      <div className="flex items-center justify-between text-gray-700 mb-3">
        <p className="text-sm">⭐ {reviewsProp.rating}/10</p>
        <p className="text-sm">Likes: {reviewsProp.likeCount}</p>
      </div>
  
      {/* Review Text */}
      <p className="text-gray-800 text-sm mb-3">
        {reviewsProp.reviewText || <small className="text-gray-500">Ingen text</small>}
      </p>
  
      {/* Like Button 🤍/❤️ */}
      <div className="flex justify-end">
        <button
          onClick={() => Like(reviewsProp.id)}
          disabled={!user}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition 
            ${!user ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
          title={!user ? "Logga in för att kunna gilla recensioner" : ""}
        >
          {reviewsProp.hasUserLiked ? '❤️ Gillad' : '🤍 Gilla!!'}
        </button>
      </div>
    </div>
  )
}

export default ShowReviewsComponent




