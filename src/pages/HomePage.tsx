import { useEffect, useState } from "react"
import { Film, Series } from "../Interfaces/FilmInterface"
import { getPopMovies, getPopSeries } from "../Services/MovieService";
import CardComponent from "../Components/CardComponent";

const HomePage = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [series, setSeries] = useState<Series[]>([]);

  
  
  useEffect(() => {
    const fetchMedia = async () => {
      const movies = await getPopMovies();
      const series = await getPopSeries();
      setFilms(movies);
      setSeries(series);
    }
    fetchMedia();
  }, []);
  return (
    <>
      <div>HomePage</div>
        {films.map((film: Film) => (
          <CardComponent key={film.id} film={film} />
        ))}
      
      {series.map((series: Series) => (
          <CardComponent key={series.id} series={series} />
      ))}
    </>
    
  )
}

export default HomePage