import { useEffect, useState } from "react"
import { Film } from "../Interfaces/FilmInterface"
import { getPopMovies } from "../Services/MovieService";
import CardComponent from "../Components/CardComponent";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

const HomePage = () => {
  const [films, setFilms] = useState<Film[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({ threshold: 1, triggerOnce: false });

  const fetchMedia = async (pageNumber: number) => {
    const newMovies = await getPopMovies(pageNumber);

    setFilms((prev) => [...prev, ...newMovies].filter(
      (film, index, self) => self.findIndex(f => f.id === film.id) === index
    ));
    if (newMovies.length === 0) setHasMore(false);
  }
  
  useEffect(() => {
    
    fetchMedia(1);
  }, []);


  useEffect(() => {
    if (inView && hasMore) {
      setPage((prev) => prev + 1);
      fetchMedia(page + 1);
    }
  }, [inView, hasMore]);


    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Populära filmer</h1>
        
        {/* Film Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {films.map((film: Film) => (
            <Link 
              to={`/media/${film.id}`} 
              key={film.id} 
              className="block"
            >
              <div className="mb-6 mx-auto w-[95%] max-w-[400px]">
                <CardComponent film={film} />
              </div>
            </Link>
          ))}
        </div>
        {/* Infinite scroll */}
        {hasMore && (
          <div ref={ref} className="text-center py-4">
            <p className="text-gray-500">Laddar fler filmer...</p>
          </div>
        )}
        {/* No films */}
        {films.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <p className="text-xl text-gray-500">Inga filmer tillgängliga</p>
          </div>
        )}
      </div>
    )
}

export default HomePage