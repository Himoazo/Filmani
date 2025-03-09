import { Film } from "../Interfaces/FilmInterface"


const Card = ({film} : {film: Film}) => {
  return (
    <div>
      <h2>Card</h2>
      {film.title}
    </div>
  )
}

export default Card