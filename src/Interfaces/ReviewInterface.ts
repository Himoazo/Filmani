export interface ReviewInterface {
    filmId: number;
    userId: number;
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
