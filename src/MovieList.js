import { useState } from "react";

export function MovieList({ movies, onMovieSelect, watched, watch_list }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MovieItem
          watch_list={watch_list}
          watched={watched}
          key={movie.imdbID}
          movie={movie}
          handleMovieSelect={onMovieSelect}
        />
      ))}
    </ul>
  );
}
function MovieItem({ movie, handleMovieSelect, watched, watch_list }) {
  const [imageStatus, setImageStatus] = useState(true);
  if (!imageStatus) {
    return;
  }
  return (
    <li onClick={() => handleMovieSelect(movie.imdbID)}>
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
          {watch_list
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
