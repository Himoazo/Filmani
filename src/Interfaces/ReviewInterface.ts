export interface ReviewInterface {
    MovieId: number;
  /*   userId: number; */
    rating: number;
    reviewText: string;
}

export interface ReviewFormErrorInterface {
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
  appUserName: string
}

