//TMDB api response model works for both movies and series
export interface Media {
  id: number;
  backdrop_path: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
}
// Movie object model
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
// Movie data object model stored in .net api
export interface LocalFilmData {
  id?: number;
  movieId: number;
  viewCount?: number;
  reviews?: [];
  poster_path: string;
  title: string;
  release_date: string;
  overview: string;
}

// Single movie details data object
  export interface FilmDetails extends Omit<Media, "media_type" | "genre_ids"> {
    belongs_to_collection: null | {
      id: number;
      name: string;
      poster_path: string | null;
      backdrop_path: string | null;
    };
    budget: number;
    genres: { id: number; name: string }[];
    homepage: string | null;
    imdb_id: string | null;
    origin_country: string[];
    production_companies: {
      id: number;
      logo_path: string | null;
      name: string;
      origin_country: string;
    }[];
    production_countries: {
      iso_3166_1: string;
      name: string;
    }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
  }
