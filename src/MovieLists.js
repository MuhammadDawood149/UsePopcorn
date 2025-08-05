import Movie1 from "./Movie1";
export default function MovieLists({
  movies,
  handleMovieClick,
  handleSelectClose,
}) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie1
          movie={movie}
          key={movie.imdbID}
          handleMovieClick={handleMovieClick}
        />
      ))}
    </ul>
  );
}
