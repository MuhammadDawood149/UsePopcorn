import WatchedMovies from "./WatchedMovies";
import ListBox from "./ListBox";
export default function Main({ movies }) {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedMovies />
    </main>
  );
}
