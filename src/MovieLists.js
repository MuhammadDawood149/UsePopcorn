import Movie1 from "./Movie1";
export default function MovieLists({ movies }) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie1 movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}
