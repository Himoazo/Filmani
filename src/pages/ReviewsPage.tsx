import { useEffect, useState } from "react"
import { LocalFilmData } from "../Interfaces/FilmInterface"
import { Link } from "react-router-dom";
import { getLocalFilms } from "@/Services/MovieService";
import CardComponent from "@/Components/CardComponent";

const ReviewsPage = () => {
  const [films, setFilms] = useState<LocalFilmData[]>([]);

  const getFilms = async () => {
      
        const movies = await getLocalFilms();
        setFilms(movies);
  } 
  
  useEffect(() => {
    getFilms();
  }, [])
  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-8 text-gray-800">Senast recensserade filmer</h1>
    
    {/* Reviewd films */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {films.map((film: LocalFilmData) => (<Link to={`/media/${film.movieId}`} key={film.movieId}className="block">
          <div className="mb-6 mx-auto w-[95%] max-w-[400px]">
            <CardComponent film={film} />
          </div>
        </Link>
      ))}
    </div>
    
    {/* No films */}
    {films.length === 0 && (<div className="flex flex-col items-center justify-center py-12">
        <p className="text-xl text-gray-500">Inga filmer tillgängliga</p>
      </div>
    )}
  </div>
  )
}

export default ReviewsPage