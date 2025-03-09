import { Film, Series } from "../Interfaces/FilmInterface"


const Card = ({film, series} : {film?: Film, series?: Series}) => {
  return (
    <div>
      {film && (
        <div>
          <h2>Film Card</h2>
          {film.title}
        </div>
      )}

      {series && (
        <div>
          <h2>Series Card</h2>
          {series.name}
        </div>
      )}
    </div>
  )
}

export default Card