import { useEffect, useState } from "react";
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
import Movie2 from "./Movie2";
import SelectedMovie from "./SelectedMovie";
const key = "7a2425af";
export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("hulk");
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
    async function fetchData() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?i=tt3896198&apikey=${key}&s=${query}`
        );

        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie Not Found");
        }

        setMovies(data.Search);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
    fetchData();
  }, [query]);

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        {/* {!isLoading && !error && <NumResults movies={movies} />} */}
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
