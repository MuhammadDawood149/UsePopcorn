import Movie2 from "./Movie2";
export default function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <Movie2 movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
