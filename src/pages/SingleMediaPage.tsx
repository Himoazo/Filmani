import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { FilmDetails } from "../Interfaces/FilmInterface";
import { mediaDetail } from "../Services/MovieService";
import ReviewFormComponent from "../Components/ReviewFormComponent";

const SingleMediaPage = () => {
  const { id } = useParams();
  const [filmSepcs, setFilmSpecs] = useState<FilmDetails>();

  const getFilmDetals = async () => {
    if ( id) {
      const details = await mediaDetail(Number(id));
      setFilmSpecs(details);
    }
  } 



  useEffect(() => {
    getFilmDetals();
  }, []);
  return (
    <div>
      
      {filmSepcs && (
    <>
      {filmSepcs.id} <br />
      {filmSepcs.title}<br />
      {filmSepcs.tagline}<br />
      {filmSepcs.overview}<br />
      {filmSepcs.genres.map(gen => gen.name)}<br />
      {filmSepcs.production_companies.map(co => co.name)}<br />
      {filmSepcs.release_date}<br />
      {filmSepcs.runtime}<br />
      {filmSepcs.budget}<br />
      {filmSepcs.revenue}<br />
      {filmSepcs.vote_average}<br />
      {filmSepcs.spoken_languages.map(lang => lang.english_name)} <br />
    </>
      )}
      {filmSepcs && <ReviewFormComponent MovieIdIdProp={filmSepcs.id} />}
    </div>
  )
}

export default SingleMediaPage