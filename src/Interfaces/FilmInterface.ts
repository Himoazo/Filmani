export interface Media {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  media_type?: string;  // Some APIs provide this
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}

export interface Film extends Media {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean; 
}
  
export interface MediaResponse{
  page: number; 
  total_pages: number;
  total_results: number;
}

export interface FilmResponse extends MediaResponse {
  results: Film[]; 
}

  
export interface Series extends Media {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export interface SeriesResponse extends MediaResponse {
  results: Series[]; 
}