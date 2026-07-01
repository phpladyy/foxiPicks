import { average } from "./App";

export function WatchedSummary({ userMovies, mode }) {
  const avgImdbRating = average(userMovies.map((movie) => movie.imdbRating));
  const avgUserRating = average(userMovies.map((movie) => movie.userRating));
  const totalRuntime =
    userMovies.length > 0
      ? userMovies.reduce((acc, cur) => acc + cur.runtime, 0)
      : 0;

  return (
    <div className="summary">
      <h2>{mode ? "Watch history" : "My Watchlist"}</h2>
      <div>
        <p>
          <span>{userMovies.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        {mode && (
          <p>
            <span>🌟</span>
            <span>{avgUserRating.toFixed(2)}</span>
          </p>
        )}
        <p>
          <span>⏳</span>
          <span>{totalRuntime} min</span>
        </p>
      </div>
    </div>
  );
}
