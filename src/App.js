import { SearchBar } from "./SearchBar";
import { WatchedSummary } from "./WatchedSummary";
import { UserList } from "./UserList";
import { MovieList } from "./MovieList";
import { Navbar } from "./Navbar";
import { SelectedMovie } from "./SelectedMovie";
import { useData } from "./DataContext";
import { ModeSwitch } from "./ModeSwitch";
import { Login } from "./Login";
import { UserTab } from "./UserTab";
import { Logo } from "./Logo";

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
export const Loader = () => <p className="loader">Loading...</p>;

export default function App() {
  const {
    selectedId,
    isLoading,
    error,
    mobileHide,
    session,
  } = useData();

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <>
          <Navbar>
            <Logo />
            <SearchBar />
            <ModeSwitch />
            <UserTab />
          </Navbar>
          <Main>
            <Panel
              className={mobileHide === "hiddenSearchPanel" ? "hidden" : ""}
            >
              <div className={selectedId ? "hidden" : ""}>
                {isLoading && <Loader />}
                {!isLoading && !error && <MovieList />}
                {error && <ErrorMessage message={error} />}
              </div>
            </Panel>
            <Panel className={mobileHide === "hiddenUserList" ? "hidden" : ""}>
              {selectedId ? (
                <SelectedMovie />
              ) : (
                <>
                  <WatchedSummary />
                  <UserList />
                </>
              )}
            </Panel>
          </Main>
        </>
      )}
    </>
  );
}

const ErrorMessage = ({ message }) => <p className="error">{message}</p>;
const Main = ({ children }) => <main className="main">{children}</main>;

function Panel({ children, className }) {
  return <div className={`box ${className}`}>{children}</div>;
}
