import { useEffect, useState } from "react"
import { Film } from "../Interfaces/FilmInterface"
import { getPopMovies } from "../Services/MovieService";
import CardComponent from "../Components/CardComponent";
import { Link } from "react-router-dom";


const HomePage = () => {
  const [films, setFilms] = useState<Film[]>([]);

  const fetchMedia = async () => {
    const movies = await getPopMovies();
    setFilms(movies);
  }
  
  useEffect(() => {
    
    fetchMedia();
  }, []);

  return (
    <>
      <div>HomePage</div>
      {films.map((film: Film) => (
          <Link to={`/media/${film.id}`} key={film.id}>
            <CardComponent key={film.id} film={film} />
          </Link>
        ))}
    </>
    
  )
}

export default HomePage