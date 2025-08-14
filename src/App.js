import { useEffect, useState } from "react";
import { useMovies } from "./useMovies";
import Main from "./Main";
import NavBar from "./NavBar";
import NumResults from "./NumResults";
import Summary from "./Summary";
import WatchedMoviesList from "./WatchedMoviesList";
import MovieLists from "./MovieLists";
import Box from "./Box";
import Logo from "./Logo";
import Search from "./Search";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import SelectedMovie from "./SelectedMovie";
import { useLocalStorage } from "./useLocalStorage";
export default function App() {
  const [watched, setWatched] = useLocalStorage("WatchedMovies", []);
  const [query, setQuery] = useState("");
  const [movies, isLoading, error] = useMovies(query);

  const [selectedId, setSelectedId] = useState(null);
  function handleAddWatched(movie) {
    setWatched((prev) => [...prev, movie]);
  }
  function handleMovieClick(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleSelectClose() {
    setSelectedId(null);
  }
  function handleRemoveMovie(id) {
    setWatched((watched) => watched.filter((w) => w.imdbID !== id));
  }
  useEffect(() => {
    handleSelectClose();
  }, [query]);
  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        {!isLoading && !error && <NumResults movies={movies} />}
      </NavBar>
      <Main>
        <Box>
          <>
            {isLoading && <Loader />}
            {error && <ErrorMessage message={error} />}
            {!isLoading && !error && (
              <MovieLists movies={movies} handleMovieClick={handleMovieClick} />
            )}
          </>
        </Box>
        <Box>
          {selectedId ? (
            <SelectedMovie
              selectedId={selectedId}
              handleSelectClose={handleSelectClose}
              handleAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <Summary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                handleRemoveMovie={handleRemoveMovie}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
