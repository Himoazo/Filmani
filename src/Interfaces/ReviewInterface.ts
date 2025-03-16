export interface ReviewInterface {
  id?: number;
  MovieId: number;
  rating: number;
  reviewText: string;
}

export interface ReviewFormErrorInterface {
    id?: string;
    filmId?: string;
    userId?: string;
    rating?: string;
    reviewText?: string;
    Error?: string
}

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

export interface EditReviewInterface {
  rating: number;
  reviewText: string;
}