import { useState } from "react";

export function UserTab({ userProfile, setUserProfile, setSession }) {
  const [isOpened, setIsOpened] = useState(false);
  function handlePopUp() {
    setIsOpened((isOpened) => !isOpened);
  }
  if (!userProfile) return;
  function handleLogout() {
    setUserProfile(null);
    setSession(null);
  }
  function ShowProfile() {
    if (!isOpened) {
      return;
    }
    return (
      <div className="screenCover">
        <div className="userPopup">
          <button className="btn-back" onClick={handlePopUp}>
            &times;
          </button>
          <img src={userProfile.avatar} alt={userProfile.name} />
          <h1>{userProfile.name}</h1>
          <h2>Movies Watched: {userProfile.watched_movies.length}</h2>
          <h2>Movies On Watchlist: {userProfile.watch_list.length}</h2>
          <h3>Account created at: {userProfile.created_at.split("T")[0]}</h3>
          <button className="btn-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      <img
        onClick={handlePopUp}
        className="nav-profile-picture"
        src={userProfile.avatar}
        alt={userProfile.name}
      />
      <ShowProfile />
    </>
  );
}