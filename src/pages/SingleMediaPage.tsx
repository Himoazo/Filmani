import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"
import { FilmDetails } from "../Interfaces/FilmInterface";
import { addMovieToLocalAPI, mediaDetail, no_img, tmdb_img } from "../Services/MovieService";
import ReviewFormComponent from "../Components/ReviewFormComponent";
import { ReviewResponseInterface } from "@/Interfaces/ReviewInterface";
import {  getMovieReviews } from "@/Services/ReviewService";
import ShowReviewsComponent from "@/Components/ShowReviewsComponent";
import { useAuth } from "@/Context/AuthContext";
import { handleError } from "@/Helpers/Error";
import { formatCurrency, formatRuntime } from "@/Helpers/Formatters";


const SingleMediaPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const [filmSpecs, setFilmSpecs] = useState<FilmDetails>();
  const [reviews, setReviews] = useState<ReviewResponseInterface[]>([])
  const [viewCount, setViewCount] = useState<number | null>(null);

   const {  user } = useAuth();

  const getFilmDetals = async () => {
    if (id) {
      try {
        const details = await mediaDetail(Number(id));
        if (!details) {
          throw Error;
        }
        setFilmSpecs(details);
      } catch (error) {
        handleError(error, "Något gic fel");
      }
      
    }
  } 

  const getReviews = async () => {
    const getReviews = await getMovieReviews(Number(id));
    setReviews(getReviews);
  }

  const addNewMovieOrGetViewCount = async () => {
    if (filmSpecs) {
      const CountViews = await addMovieToLocalAPI(Number(id), filmSpecs);
      setViewCount(CountViews);
    }

  }

  

  useEffect(() => {
    getFilmDetals();
    getReviews();
  }, [location.key, id]);

  useEffect(() => {
    if (filmSpecs) {
      addNewMovieOrGetViewCount();

    }
  },[filmSpecs])


  if (!filmSpecs) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-700">Filmen är otillgänglig för tillfället</p>
      </div>
    );
  }

  const posterUrl = filmSpecs.poster_path
    ? `${tmdb_img}original/${filmSpecs.poster_path}`
    : `${no_img}`;
  
  const backdropUrl = filmSpecs.backdrop_path
    ? `${tmdb_img}original/${filmSpecs.backdrop_path}`
    : ``;
 
  return (
    <div className="relative min-h-screen">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${backdropUrl})`,
          /* filter: "blur(8px)", */
          opacity: 0.25
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Poster Column */}
          <div className="md:col-span-1">
            <img 
              src={posterUrl} 
              alt={filmSpecs.title}
              className="w-full rounded-lg shadow-xl"
            />
          </div>
          
          {/* Details Column - spans 2 columns */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-gray-900">{filmSpecs.title}</h1>
            <span className="text-xl text-gray-600">({filmSpecs.release_date.split('-')[0]})</span>
            {filmSpecs.tagline && (
              <p className="text-xl italic text-gray-600 mt-2">{filmSpecs.tagline}</p>
            )}
            
            <div className="flex flex-wrap gap-2 my-4">
              {filmSpecs.genres.map(genre => (
                <span key={genre.id} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {genre.name}
                </span>
              ))}
            </div>
            
            <div className="my-6">
              <p className="text-gray-700 leading-relaxed">{filmSpecs.overview}</p>
            </div>

            {/* Movie stats - now in details column */}
            <div className="p-4  mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                <span className="ml-2 text-sm text-gray-600">Tittarnas betyg i andra sajter:</span>
                  <div className="h-12 w-12 rounded-full flex items-center justify-center bg-blue-600 text-white font-bold text-xl">
                    {Math.round(filmSpecs.vote_average * 10)}%
                  </div>
                  
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Filmlängd:</span> {formatRuntime(filmSpecs.runtime)}
                </div>
                <div>
                  <span className="font-semibold">Språk:</span> {filmSpecs.spoken_languages.map(lang => lang.english_name).join(', ')}
                </div>
                <div>
                  <span className="font-semibold">Budget:</span> {filmSpecs.budget ? formatCurrency(filmSpecs.budget) : "okänt"}
                </div>
                <div>
                  <span className="font-semibold">Omsättning:</span> {filmSpecs.revenue ? formatCurrency(filmSpecs.revenue) : "Okänt"}
                </div>
                <div>
                  <span className="font-semibold">Visad på Filmani:</span> {viewCount ? viewCount : "Otillgängligt"}
                </div>
              </div>
            </div>
            
            <div className="my-6">
              <div className="flex flex-wrap gap-4">
              <span className="font-semibold">Produktionsbolag:</span>
                {filmSpecs.production_companies.filter(company=> company.logo_path).map(company => (
                  <div key={company.id} className="flex items-center bg-white bg-opacity-80 rounded-lg px-3 py-2">
                    {company.logo_path ? (
                      <img 
                        src={`${tmdb_img}w200/${company.logo_path}`} 
                        alt={company.name}
                        className="h-8 mr-2"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Reviews */}
          <div className="md:col-span-3  rounded-lg shadow-lg p-6">
          <div className=" flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold flex items-center">Recensioner</h2>
            <ReviewFormComponent MovieIdIdProp={filmSpecs.id} getReviews={getReviews} />
          </div>
          <div className="md:col-span-3">
            {reviews.length > 0 && (
              <div className="mt-8">
                <div className="space-y-4 ">
                  {reviews.map((review) => (
                    <div key={review.id} style={{opacity: 0.85}}
                      className=" bg-white rounded-lg p-4 mb-4 space-y-8 shadow-md transition-all hover:shadow-lg">
                      <ShowReviewsComponent reviewsProp={review} getReviews={getReviews} />
                      {review.appUserId == user?.id || user?.role == "Admin" ? 
                      <ReviewFormComponent MovieIdIdProp={filmSpecs.id} getReviews={getReviews} reviewToEdit={review} /> : "" 
                      }
                    </div>
                  ))}
                </div>
              </div>
            )}
            
          </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SingleMediaPage