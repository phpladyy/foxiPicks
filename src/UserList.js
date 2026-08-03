import { Loader } from "./App";
import { ReactComponent as ImdbLogo } from "./assets/imdbLogo.svg";
import { useData } from "./DataContext";
export function UserList() {
  const {
    list,
    setList,
    onRemoveListItem,
    onMovieSelect,
    mode,
    isUserLoading,
  } = useData();

  function handleRemove(e, id) {
    onRemoveListItem(e, id, list, setList);
  }
  function compareNumbers(a, b) {
    return a.year - b.year;
  }
  return (
    <ul className="list list-movies">
      {isUserLoading ? (
        <Loader />
      ) : (
        list
          .sort(compareNumbers)
          .map((movie) => (
            <WatchedItem
              mode={mode}
              key={movie.imdbID}
              movie={movie}
              handleMovieSelect={onMovieSelect}
              handleRemove={handleRemove}
            />
          ))
      )}
    </ul>
  );
}
function WatchedItem({
  movie,
  addWatchlist,
  handleMovieSelect,
  mode,
  handleRemove,
}) {
  return (
    <li onClick={() => handleMovieSelect(movie.imdbID)}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <ImdbLogo className="imdbLogo" />
          {movie.imdbRating}
        </p>
        {mode ? (
          <p>
            <span>🌟</span>
            <span>{movie.userRating}</span>
          </p>
        ) : (
          <p>
            <span>{movie.year}</span>
          </p>
        )}
        <p>
          <span>{movie.runtime} min</span>
        </p>
        <p>
          <button
            className="btn-delete"
            onClick={(e) => handleRemove(e, movie.imdbID)}
          >
            &times;
          </button>
        </p>
      </div>
    </li>
  );
}
