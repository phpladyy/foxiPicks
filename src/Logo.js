import { useData } from "./DataContext";

export function Logo() {
  const { handleLogoClick } = useData();
  return (
    <div className="logo" onClick={handleLogoClick}>
      <h1>Foxi Picks</h1>
    </div>
  );
}
