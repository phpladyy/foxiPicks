import { useEffect, useState } from "react";
import { SearchBar } from "./SearchBar";
import { WatchedSummary } from "./WatchedSummary";
import { UserList } from "./UserList";
import { MovieList } from "./MovieList";
import { Navbar } from "./Navbar";
import { SelectedMovie } from "./SelectedMovie";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";
import { ModeSwitch } from "./ModeSwitch";
import { Login } from "./Login";
import { updateTable } from "./updateTable";
import { UserTab } from "./UserTab";
import { fetchData } from "./fetchData";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const KEY = process.env.REACT_APP_KEY;
export const Loader = () => <p className="loader">Loading...</p>;

export default function App() {
  const [mode, setMode] = useState(false);
  const [query, setQuery] = useState("movie");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [session, setSession] = useLocalStorage(null, "sessionId");

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchUserData = async () => {
      const data = await fetchData(session, "/.netlify/functions/getProfile");
      if (data) {
        setUserProfile(data);
        console.log(data);
        setWatched(data.watched_movies);
        setWatchlist(data.watch_list);
      } else {
        setSession(null);
        setUserProfile(null);
      }
    };
    fetchUserData();
  }, [session, setSession]);

  async function handleAddMovie(movie, action, setList) {
    const promises = [];
    if (setList === "setWatched") {
      const updatedWatchlist = watchlist.filter(
        (item) => item.imdbID !== movie.imdbID,
      );
      setWatchlist(updatedWatchlist);
      promises.push(updateTable(session, updatedWatchlist, "addWatchlist"));
    }

    const setColumn = setList === "setWatched" ? setWatched : setWatchlist;
    const column = setList === "setWatched" ? watched : watchlist;
    const update = [...column, movie];
    setColumn(update);
    promises.push(updateTable(session, update, action));
    await Promise.all(promises);
  }

  async function handleRemoveWatched(e, id) {
    e.stopPropagation();
    const update = watched.filter((item) => item.imdbID !== id);
    setWatched(update);
    await updateTable(session, update, "changeWatchedColumn");
  }
  async function handleRemoveWatchlist(e, id) {
    e.stopPropagation();
    const update = watchlist.filter((item) => item.imdbID !== id);
    setWatchlist(update);
    await updateTable(session, update, "addWatchlist");
  }
  function handleMovieSelect(id) {
    selectedId === id ? setSelectedId(null) : setSelectedId(id);
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  return (
    <>
      {!session ? (
        <Login setUserProfile={setUserProfile} setSession={setSession} />
      ) : (
        <>
          <Navbar setSelectedId={setSelectedId} setQuery={setQuery}>
            <SearchBar query={query} setQuery={setQuery} />
            <ModeSwitch setMode={setMode} mode={mode} />
            <UserTab
              userProfile={userProfile}
              setUserProfile={setUserProfile}
              setSession={setSession}
            />
          </Navbar>

          <Main>
            <Panel>
              {isLoading && <Loader />}
              {!isLoading && !error && (
                <MovieList movies={movies} onMovieSelect={handleMovieSelect} />
              )}
              {error && <ErrorMessage message={error} />}
            </Panel>

            <Panel>
              {selectedId ? (
                <SelectedMovie
                  userProfile={userProfile}
                  key={selectedId}
                  apiKey={KEY}
                  selectedId={selectedId}
                  onCloseMovie={handleCloseMovie}
                  onAddMovie={handleAddMovie}
                  watched={watched}
                  watchlist={watchlist}
                />
              ) : (
                <>
                  <WatchedSummary
                    userMovies={mode ? watched : watchlist}
                    mode={mode}
                  />
                  <UserList
                    mode={mode}
                    watched={mode ? watched : watchlist}
                    onRemoveWatched={handleRemoveWatched}
                    onRemoveWatchlist={handleRemoveWatchlist}
                    onMovieSelect={handleMovieSelect}
                  />
                </>
              )}
            </Panel>
          </Main>
        </>
      )}
    </>
  );
}

const ErrorMessage = ({ message }) => <p className="error">{message}</p>;
const Main = ({ children }) => <main className="main">{children}</main>;
function Panel({ children }) {
  return <div className="box">{children}</div>;
}
