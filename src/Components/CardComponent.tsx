import { no_img, tmdb_img } from "@/Services/MovieService";
import { Film, LocalFilmData} from "../Interfaces/FilmInterface"


const Card = ({ film }: { film?: Film | LocalFilmData }) => {
  if (!film) return null;

    return (
      <div className="relative overflow-hidden w-full rounded-lg cursor-pointer group">
       
        <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        
        
        {/* <div className="absolute top-0 right-0 z-20 bg-gradient-to-l from-blue-600 to-transparent px-3 py-1 text-white font-bold">
          {film.vote_average ? film.vote_average.toFixed(1) : "N/A"}
        </div> */}
        
       
        <img 
          src={film.poster_path ? `${tmdb_img}w342/${film.poster_path}` : `${no_img}`} 
          alt={film.title}
          className="w-full h-[425px] object-cover object-center transition-transform duration-300 group-hover:scale-110"
        />
        
        <div className="absolute w-full px-4 text-center text-white z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
          <h2 className="h3 font-black uppercase tracking-wider mb-2 text-lg">{film.title}</h2>
          
          {film.release_date && (
            <p className="mb-2">
              <strong className="text-green-400">{film.release_date.substring(0, 4)}</strong>
            </p>
          )}
          
          <p className="text-sm">
            {film.overview && film.overview.length > 100 
              ? film.overview.substring(0, 100) + "..." 
              : film.overview || "Det finns ingen tillgänglig beskrivning"}
          </p>
        </div>
      </div>
    )
}

export default Card