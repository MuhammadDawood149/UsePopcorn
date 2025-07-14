import Summary from "./Summary";
import WatchedMoviesList from "./WatchedMoviesList";
import ToogleButton from "./ToogleButton";
import { useState } from "react";
import tempWatchedData from "./tempWatchedData";
export default function WatchedBox() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [isOpen2, setIsOpen2] = useState(true);
  return (
    <div className="box">
      <ToogleButton isOpen={isOpen2} setIsOpen={setIsOpen2} />
      {isOpen2 && (
        <>
          <Summary watched={watched} />

          <WatchedMoviesList watched={watched} />
        </>
      )}
    </div>
  );
}
