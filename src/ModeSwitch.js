import { useMediaQuery } from "react-responsive";
export function ModeSwitch({ onClick, setMode, mode, mobileHide }) {
  const isMobile = useMediaQuery({ maxWidth: 800 });
  const isVisible = mobileHide === "hiddenSearchPanel";

  function handleClick() {
    if (isMobile && !isVisible) {
      onClick();
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
