//Post review
export interface ReviewInterface {
  id?: number;
  MovieId: number;
  rating: number;
  reviewText: string;
}
//Errors
export interface ReviewFormErrorInterface {
    id?: string;
    filmId?: string;
    userId?: string;
    rating?: string;
    reviewText?: string;
    Error?: string
}
//GET review
export interface ReviewResponseInterface {
  id: number;
  MovieId: number;
  rating: number;
  reviewText: string;
  appUserId: string;
  appUserName: string;
  likeCount: number;
  createdAt: string;
  hasUserLiked: boolean;
}
//PUT review
export interface EditReviewInterface {
  rating: number;
  reviewText: string;
}