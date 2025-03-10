import { useEffect, useState } from "react"
import { Film, Media, Series } from "../Interfaces/FilmInterface"
import { getPopMovies, getPopSeries, searchMedia } from "../Services/MovieService";
import CardComponent from "../Components/CardComponent";

const HomePage = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [series, setSeries] = useState<Series[]>([]);
  const [keyWord, setKeyWord] = useState<string>("")

  const fetchMedia = async () => {
    if (keyWord != "") {
      const results : Media[] = await searchMedia(keyWord);

      const tv = results.filter((result) => result.media_type === "tv") as Series[];
      const movies = results.filter((result) => result.media_type === "movie") as Film[];
      

      setFilms(movies);
      setSeries(tv);
    } else {
      const movies = await getPopMovies();
      const series = await getPopSeries();
      setFilms(movies);
      setSeries(series);
    }
  }
  
  useEffect(() => {
    
    fetchMedia();
  }, []);

  //Searching
  const search = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await fetchMedia();
  }


  return (
    <>
      <form onSubmit={search}>
        <label htmlFor="search">Sök filmer/Serier</label>
        <input type="text" name="search" value={keyWord} onChange={(e)=> setKeyWord(e.target.value)}/>
      </form>
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