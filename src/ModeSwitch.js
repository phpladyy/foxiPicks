import { useMediaQuery } from "react-responsive";
import { useData } from "./DataContext";
export function ModeSwitch() {
  const { handleModeClick, setMode, mode, mobileHide } = useData();
  const isMobile = useMediaQuery({ maxWidth: 800 });
  const isVisible = mobileHide === "hiddenSearchPanel";

  function handleClick() {
    if (isMobile && !isVisible) {
      handleModeClick();
    } else {
      setMode((mode) => !mode);
    }
  }
  return (
    <>
      <button className="btn-switch" onClick={handleClick}>
        {isMobile && !isVisible
          ? "Go back"
          : mode
            ? "My Watchlist"
            : "Watch history"}
      </button>
    </>
  );
}
