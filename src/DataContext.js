import { createContext, useContext, useEffect, useState } from "react";
import { useMovies } from "./useMovies";
import { useLocalStorage } from "./useLocalStorage";
import { updateTable } from "./updateTable";
import { fetchData } from "./fetchData";

const DataContext = createContext();

function DataProvider({ children }) {
  const [mobileHide, setMobileHide] = useState("hiddenSearchPanel");
  const [returnPanel, setReturnPanel] = useState("hiddenSearchPanel");
  const [session, setSession] = useLocalStorage(null, "sessionId");
  const [userProfile, setUserProfile] = useState(null);
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [mode, setMode] = useState(false);
  const list = mode ? watched : watchlist;
  const setList = mode ? setWatched : setWatchlist;

  useEffect(() => {
    if (!session) {
      return;
    }
    const fetchUserData = async () => {
      const data = await fetchData(session, "/.netlify/functions/getProfile");
      if (data) {
        setUserProfile(data);
        setWatched(data.watched_movies);
        setWatchlist(data.watch_list);
      } else {
        setSession(null);
        setUserProfile(null);
      }
    };
    fetchUserData();
  }, [session, setSession, setUserProfile, setWatched, setWatchlist]);

  function handleModeClick() {
    setMobileHide("hiddenSearchPanel");
  }
  function handleLogoClick() {
    setMobileHide("hiddenUserList");
    setQuery("");
    console.log("hi mommy");
    setSelectedId(null);
  }
  function handleMovieSelect(id) {
    selectedId === id ? setSelectedId(null) : setSelectedId(id);
    if (!selectedId) {
      setReturnPanel(mobileHide);
    }
    setMobileHide("hiddenSearchPanel");
  }
  function handleSearchClick() {
    setSelectedId(null);
    setMobileHide("hiddenUserList");
  }

  function handleCloseMovie() {
    setSelectedId(null);
    setMobileHide(returnPanel);
  }
  async function handleAddMovie(movie, list) {
    const promises = [];
    if (list === "watched") {
      const updatedWatchlist = watchlist.filter(
        (item) => item.imdbID !== movie.imdbID,
      );
      setWatchlist(updatedWatchlist);
      promises.push(updateTable(session, updatedWatchlist, "watch_list"));
    }
    const setColumn = list === "watched" ? setWatched : setWatchlist;
    const column = list === "watched" ? watched : watchlist;
    const update = [...column, movie];
    setColumn(update);
    const dbColumn = list === "watched" ? "watched_movies" : "watch_list";
    promises.push(updateTable(session, update, dbColumn));
    await Promise.all(promises);
  }

  async function handleRemoveListItem(e, id, list, setList) {
    e.stopPropagation();
    const update = list.filter((item) => item.imdbID !== id);
    setList(update);
    const dbColumn = list === watched ? "watched_movies" : "watch_list";
    await updateTable(session, update, dbColumn);
  }

  return (
    //providing value to child components
    <DataContext.Provider
      value={{
        handleLogoClick,
        handleSearchClick,
        selectedId,
        mode,
        setMode,
        query,
        setQuery,
        movies,
        isLoading,
        error,
        mobileHide,
        handleCloseMovie,
        handleModeClick,
        userProfile,
        setUserProfile,
        session,
        setSession,
        watched,
        watchlist,
        onCloseMovie: handleCloseMovie,
        onAddMovie: handleAddMovie,
        setWatched,
        setWatchlist,
        onRemoveListItem: handleRemoveListItem,
        onMovieSelect: handleMovieSelect,
        list,
        setList,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("Context used outside provider");
  }
  return context;
}

export { DataProvider, useData };
