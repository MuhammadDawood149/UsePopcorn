import { useRef } from "react";
import { useKey } from "./useKey";

export default function Search({ query, setQuery }) {
  const inputElement = useRef(null);
  function handleEnterKey() {
    if (document.activeElement === inputElement.current) return;

    inputElement.current.focus();
    setQuery("");
  }
  useKey("Enter", handleEnterKey);

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputElement}
      />
    </>
  );
}
