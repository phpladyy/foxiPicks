import { useState } from "react";
import { useData } from "./DataContext";

export function MovieList() {
  const { movies } = useData();
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem key={movie.imdbID} movie={movie} />
      ))}
    </ul>
  );
}
function MovieItem({movie}) {
  const { onMovieSelect, watched, watchlist } = useData();
  const [imageStatus, setImageStatus] = useState(true);
  if (!imageStatus) {
    return;
  }
  return (
    <li onClick={() => onMovieSelect(movie.imdbID)}>
      <img
        src={movie.Poster}
        alt={`${movie.Title} poster`}
        onError={(e) => setImageStatus(false)}
      />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>{movie.Year}</span>

          {watched
            .filter((item) => item.imdbID === movie.imdbID)
            .map((res) => (
              <span key={movie.imdbID} className="badge-watched">
                Watched
              </span>
            ))}
          {watchlist
            .filter((item) => item.imdbID === movie.imdbID)
            .map((res) => (
              <span key={movie.imdbID} className="badge-watchlist">
                Watchlist{" "}
              </span>
            ))}
        </p>
      </div>
    </li>
  );
}
