import { useEffect, useState } from "react"
import { Film, FilmDetails, LocalFilmData } from "../Interfaces/FilmInterface"
import { Link } from "react-router-dom";
import CardComponent from "@/Components/CardComponent";
import { getToLocalFilms, mediaDetail } from "@/Services/MovieService";
import { ReviewResponseInterface } from "@/Interfaces/ReviewInterface";

const ReviewsPage = () => {
  const [films, setFilms] = useState<LocalFilmData[]>([]);

  const getFilms = async () => {
      
        const movies = await getToLocalFilms();
        setFilms(movies);
      
    } 
  return (
    <div className="container mx-auto px-4 py-8">
    {/* <h1 className="text-3xl font-bold mb-8 text-gray-800">Populära filmer</h1> */}
    
    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {films.map((film: LocalFilmData) => (
        <Link 
          to={`/media/${film.id}`} 
          key={film.id} 
          className="block"
        >
          <div className="mb-6 mx-auto w-[95%] max-w-[400px]">
            {/* <CardComponent film={film} /> */}
          </div>
        </Link>
      ))}
    </div>
    
    {/* No films */}
    {films.length === 0 && (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-xl text-gray-500">Inga filmer tillgängliga</p>
      </div>
    )}
  </div>
  )
}

export default ReviewsPage