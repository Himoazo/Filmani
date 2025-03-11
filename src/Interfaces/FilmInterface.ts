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

  
/* export interface Series extends Media {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
} */

/* export interface SeriesResponse extends MediaResponse {
  results: Series[]; 
} */


/* export interface FilmDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: null | {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
  };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
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
  vote_average: number;
  vote_count: number;
} */

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


  /* export interface SeriesDetails {
    adult: boolean;
    backdrop_path: string;
    created_by: {
      id: number;
      credit_id: string;
      name: string;
      original_name: string;
      gender: number;
      profile_path: string | null;
    }[];
    episode_run_time: number[];
    first_air_date: string;
    genres: {
      id: number;
      name: string;
    }[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: {
      id: number;
      name: string;
      overview: string;
      vote_average: number;
      vote_count: number;
      air_date: string;
      episode_number: number;
      episode_type: string;
      production_code: string;
      runtime: number;
      season_number: number;
      show_id: number;
      still_path: string;
    };
    name: string;
    next_episode_to_air: null;
    networks: {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    }[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: any[];
    production_countries: any[];
    seasons: {
      air_date: string;
      episode_count: number;
      id: number;
      name: string;
      overview: string;
      poster_path: string;
      season_number: number;
      vote_average: number;
    }[];
    spoken_languages: {
      english_name: string;
      iso_639_1: string;
      name: string;
    }[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
    credits: {
      cast: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string | null;
        character: string;
        credit_id: string;
        order: number;
      }[];
      crew: {
        adult: boolean;
        gender: number;
        id: number;
        known_for_department: string;
        name: string;
        original_name: string;
        popularity: number;
        profile_path: string | null;
        credit_id: string;
        department: string;
        job: string;
      }[];
    };
    images: {
      backdrops: {
        aspect_ratio: number;
        height: number;
        iso_639_1: string;
        file_path: string;
        vote_average: number;
        vote_count: number;
        width: number;
      }[];
      logos: {
        aspect_ratio: number;
        height: number;
        iso_639_1: string;
        file_path: string;
        vote_average: number;
        vote_count: number;
        width: number;
      }[];
      posters: {
        aspect_ratio: number;
        height: number;
        iso_639_1: string;
        file_path: string;
        vote_average: number;
        vote_count: number;
        width: number;
      }[];
    };
  } */


   /*  export interface SeriesDetails extends Media {
      created_by: {
        id: number;
        credit_id: string;
        name: string;
        original_name: string;
        gender: number;
        profile_path: string | null;
      }[];
      episode_run_time: number[];
      first_air_date: string;
      genres: {
        id: number;
        name: string;
      }[];
      homepage: string;
      in_production: boolean;
      languages: string[];
      last_air_date: string;
      last_episode_to_air: {
        id: number;
        name: string;
        overview: string;
        vote_average: number;
        vote_count: number;
        air_date: string;
        episode_number: number;
        episode_type: string;
        production_code: string;
        runtime: number;
        season_number: number;
        show_id: number;
        still_path: string;
      };
      name: string;
      next_episode_to_air: null;
      networks: {
        id: number;
        logo_path: string;
        name: string;
        origin_country: string;
      }[];
      number_of_episodes: number;
      number_of_seasons: number;
      origin_country: string[];
      original_name: string;
      production_companies: any[];
      production_countries: any[];
      seasons: {
        air_date: string;
        episode_count: number;
        id: number;
        name: string;
        overview: string;
        poster_path: string;
        season_number: number;
        vote_average: number;
      }[];
      spoken_languages: {
        english_name: string;
        iso_639_1: string;
        name: string;
      }[];
      status: string;
      tagline: string;
      type: string;
      credits: {
        cast: {
          adult: boolean;
          gender: number;
          id: number;
          known_for_department: string;
          name: string;
          original_name: string;
          popularity: number;
          profile_path: string | null;
          character: string;
          credit_id: string;
          order: number;
        }[];
        crew: {
          adult: boolean;
          gender: number;
          id: number;
          known_for_department: string;
          name: string;
          original_name: string;
          popularity: number;
          profile_path: string | null;
          credit_id: string;
          department: string;
          job: string;
        }[];
      };
      images: {
        backdrops: {
          aspect_ratio: number;
          height: number;
          iso_639_1: string;
          file_path: string;
          vote_average: number;
          vote_count: number;
          width: number;
        }[];
        logos: {
          aspect_ratio: number;
          height: number;
          iso_639_1: string;
          file_path: string;
          vote_average: number;
          vote_count: number;
          width: number;
        }[];
        posters: {
          aspect_ratio: number;
          height: number;
          iso_639_1: string;
          file_path: string;
          vote_average: number;
          vote_count: number;
          width: number;
        }[];
      };
    }
     */