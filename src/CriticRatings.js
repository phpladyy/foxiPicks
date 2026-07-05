import { ReactComponent as ImdbLogo } from "./assets/imdbLogo.svg";
import { ReactComponent as RotenLogo } from "./assets/rotenLogo.svg";
import { ReactComponent as MetacriticLogo } from "./assets/metacriticLogo.svg";

export function CriticRatings({
  imdbRating,
  rottenTomatoesRating,
  metacriticRating,
}) {
  return (
    <p>
      <ImdbLogo className="imdbLogo-big" />
      {imdbRating}
      <RotenLogo className="rateLogo" />
      {rottenTomatoesRating || "N/A"}
      <MetacriticLogo className="rateLogo" />
      {metacriticRating?.split("/")[0] || "N/A"}%
    </p>
  );
}
