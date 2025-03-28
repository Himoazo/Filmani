import { useEffect, useState } from "react";
import { Combobox, ComboboxInput, ComboboxOption } from "@headlessui/react";
import { no_img, searchMedia, tmdb_img } from "../Services/MovieService";
import { Film } from "../Interfaces/FilmInterface";
import { useNavigate } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";
import { handleError } from "@/Helpers/Error";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [focus, setFocus] = useState<boolean>(false);
  const navigate = useNavigate();
  const debouncedSearchValue = useDebounce<string>(query) //custom hook standard dleay 0.5sec


  const fetchData = async () => {
    try {
      const films: Film[] = await searchMedia(query); //fetch search query från TMDB api
      if (!films) { throw Error }
      setResults(films);

    } catch (error) {
      handleError(error, "Något gic fel");
      setResults([]);
    }
  };

  
  useEffect(() => {
    if (debouncedSearchValue && debouncedSearchValue.length > 2) { //minimum 2chars to run query

      fetchData();
    } else {
      setResults([]);
    }
  }, [debouncedSearchValue]);

  const handleSelect = (film: Film) => {
    if (film) {
      setSelectedFilm(film);
      setQuery(film.title || "");
      navigate(`/media/${film.id}`);
    }
  };
  
  // Toggle foucs search bar
  const focusing = () => { setFocus(true); }
  const notFocused = () => { setFocus(false); }

  return (
    <Combobox value={selectedFilm} onChange={handleSelect}>
      <div className="relative w-full">
        <div className="flex items-center relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <ComboboxInput
            onChange={(e) => setQuery(e.target.value)}
            onFocus={focusing}
            onBlur={notFocused}
            displayValue={(film: Film) => film?.title || ""}
            placeholder="Sök filmer..."
            aria-label="Sök filmer"
            className="w-full pl-10 p-2 text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {results.length === 0 && query.length >= 2 && focus && (
          <div className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 p-2 text-gray-500 z-10">
            Inga matchande filmer
          </div>
        )}

        {results.length > 0 && query.length >= 2 && focus && (
          <div className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto z-50">
            {results.map((film) => (
              <ComboboxOption onClick={()=>{setQuery("")}}
                key={film.id}
                value={film}
                className="p-2 cursor-pointer hover:bg-blue-100 text-gray-900 hover:text-blue-900"
              >
                {({ selected }) => (
                  <div
                  className={`flex items-start gap-3 p-2 ${
                    selected ? "bg-gray-100" : "bg-white"
                  } rounded-md`}
                >
                  {/* Img */}
                  <img
                    src={film.poster_path ? `${tmdb_img}w92/${film.poster_path}` : `${no_img}`}
                    alt={film.title}
                    className="w-16 h-24 object-cover rounded-md"
                  />
              
                  {/* Details */}
                  <div className="flex flex-col">
                    <span className="font-medium">
                      {film.title} {film.release_date ? <small>({film.release_date.substring(0, 4)})</small> : ""}
                    </span>
                    <span className="text-sm text-gray-600">
                    {film.overview && film.overview.length > 100 ? film.overview.substring(0, 100) + "..." 
                      : film.overview || "Det finns ingen tillgänglig beskrivning"}
                    </span>
                  </div>
                </div>
                )}
              </ComboboxOption>
            ))}
          </div>
        )}
      </div>
    </Combobox>
  );
}

export default SearchBar;
