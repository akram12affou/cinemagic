import Nav from "./Components/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import PersonDetails from "./pages/PersonDetails";
import Auth from "./pages/Auth";
import { useEffect, useState } from "react";
import SearchMovies from "./pages/SearchMovies";
import { WatchedListContextProvider } from "./Context/watchedListContext";
import WatchList from "./pages/WatchList";
import { AuthContextProvider } from "./Context/authContext";
function App() {
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (query == "") {
      setShow(false);
      return;
    }
    setShow(true);
  }, [query]);
  return (
    <WatchedListContextProvider>
      <AuthContextProvider>
        <Router>
          <Nav query={query} setQuery={setQuery} />
          <Routes>
            {!show ? (
              <>
                <Route path="/" element={<Home />}></Route>
                <Route path="/movie/:id" element={<MovieDetails />}></Route>
                <Route path="/person/:id" element={<PersonDetails />}></Route>
                <Route path="/auth" element={<Auth />}></Route>
                <Route path="/watchList" element={<WatchList />}></Route>
              </>
            ) : (
              <Route
                path="/"
                element={<SearchMovies query={query} setQuery={setQuery} />}
              ></Route>
            )}
          </Routes>
        </Router>
      </AuthContextProvider>
    </WatchedListContextProvider>
  );
}

export default App;
