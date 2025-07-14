import ToogleButton from "./ToogleButton";
import { useState } from "react";
import MovieLists from "./MovieLists";
export default function ListBox({ movies }) {
  const [isOpen1, setIsOpen1] = useState(true);

  return (
    <div className="box">
      <ToogleButton isOpen={isOpen1} setIsOpen={setIsOpen1} />
      {isOpen1 && <MovieLists movies={movies} />}
    </div>
  );
}
