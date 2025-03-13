import { useEffect, useState } from "react";
import { Combobox, ComboboxInput, ComboboxOption } from "@headlessui/react";
import { searchMedia } from "../Services/MovieService";
import { Film } from "../Interfaces/FilmInterface";
import { useNavigate } from "react-router-dom";
import useDebounce from "@/hooks/useDebounce";

const SearchBar = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Film[]>([]);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);
  const [focus, setFocus] = useState<boolean>(false);
  
  const navigate = useNavigate();
  const debouncedSearchValue = useDebounce<string>(query)


  const fetchData = async () => {
    try {
      const films: Film[] = await searchMedia(query);
      setResults(films);
    } catch (error) {
      console.error("Search error:", error);
      setResults([]);
    }
  };

  
  useEffect(() => {
    if (debouncedSearchValue && debouncedSearchValue.length > 2) {
      
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

  const filteredFilms = query === "" ? results : results.filter((film) =>
    film.title.toLowerCase().includes(query.toLowerCase())
  );

  const focusing = () => { setFocus(true); }
  const notFocused = () => { setFocus(false); }

  return (
    <Combobox value={selectedFilm} onChange={handleSelect}>
      <div className="relative w-full max-w-md">
        <ComboboxInput
          onChange={(e) => setQuery(e.target.value)}
          onFocus={focusing}
          onBlur={notFocused}
          displayValue={(film: Film) => film?.title || ""}
          placeholder="Sök filmer..."
          className="w-full p-2 border border-gray-300 rounded-md"
        />

        {filteredFilms.length === 0 && query.length >= 2 && focus && (
          <span className="block mt-1 text-gray-500">Inga matchande filmer</span>
        )}

        {filteredFilms.length > 0 && query.length >= 2 && focus && (
          <div className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-md mt-1 max-h-60 overflow-y-auto">
            {filteredFilms.map((film) => (
              <ComboboxOption
                key={film.id}
                value={film}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {film.title}
              </ComboboxOption>
            ))}
          </div>
        )}
      </div>
    </Combobox>
  );
};

export default SearchBar;
