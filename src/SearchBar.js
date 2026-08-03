import { useEffect, useRef } from "react";
import { useKeyPress } from "./useKeyPress";
import { useData } from "./DataContext";

export function SearchBar() {
  const { handleSearchClick, query, setQuery } = useData();
  const inputElement = useRef(null);

  function callback(e) {
    if (document.activeElement === inputElement.current) return;
    inputElement.current.focus();
    setQuery("");
  }
  useEffect(() => {
    inputElement.current.focus();
  }, []);

  useKeyPress("Enter", callback);

  return (
    <input
      onClick={handleSearchClick}
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}
