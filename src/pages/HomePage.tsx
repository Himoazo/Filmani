import { useEffect, useState } from "react"
import { Film } from "../Interfaces/FilmInterface"
import { getPopMovies } from "../Services/MovieService";
import CardComponent from "../Components/CardComponent";

const HomePage = () => {
  const [films, setFilms] = useState<Film[]>([]);

  
  
  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getPopMovies();
      setFilms(movies);
    }
    fetchMovies();
  }, []);
  return (
    <>
      <div>HomePage</div>
        {films.map((film: Film) => (
          <CardComponent key={film.id} film={film} />
        ))}
    </>
    
  )
}

export default HomePage