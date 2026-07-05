export function ModeSwitch({onClick, setMode, mode }) {
  function handleClick(){
    onClick();
    setMode((mode) => !mode);
  }
  return (
    <button className="btn-switch" onClick={handleClick}>
      {mode ? 'My Watchlist':'Watch history'}
    </button>
  );
}
