import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import AllActors from "./pages/AllActors";
import ActorDetails from "./pages/ActorsDetails";
import Watchlist from "./pages/WatchList";

function App() {
  const [loggedInUserId, setLoggedInUserId] = useState(
    null || Cookies.get("userId")
  );
  const [search, setSearch] = useState("");
  const [accountId, setAccountId] = useState();

  // recupere le session id dans signup
  const handleSignup = (userId) => {
    if (userId) {
      Cookies.set("userId", userId, { expires: 30 });
      setLoggedInUserId(userId);
    }
  };

  useEffect(() => {
    if (loggedInUserId) {
      fetchAccountData(loggedInUserId);
    }
  }, [loggedInUserId]);

  // func LOGOUT
  const handleLogOut = () => {
    Cookies.remove("userId");
    setLoggedInUserId(undefined);
  };

  // Recupèrer l'account ID via requete
  const fetchAccountData = async (loggedInUserId) => {
    try {
      const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1YiI6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";

      const response = await axios.get(
        `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${loggedInUserId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setAccountId(response.data.id);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données du compte",
        error
      );
    }
  };

  return (
    <>
      <Router>
        <Header
          loggedInUserId={loggedInUserId}
          setLoggedInUserId={setLoggedInUserId}
          handleLogOut={handleLogOut}
        />
        <Routes>
          <Route>
            <Route path="/" element={<Home />} />
            <Route
              path="/movies/*"
              element={
                <Movies
                  setSearch={setSearch}
                  search={search}
                  accountId={accountId}
                  loggedInUserId={loggedInUserId}
                />
              }
            />
            <Route
              path="/signup/approved"
              element={<Signup onSignup={handleSignup} />}
            />

            <Route
              path="/favorites"
              element={
                <Favorites
                  accountId={accountId}
                  loggedInUserId={loggedInUserId}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <Watchlist
                  accountId={accountId}
                  loggedInUserId={loggedInUserId}
                />
              }
            />
            <Route path="/movies/:id/all-teams" element={<AllActors />} />
            <Route path="/actors/:id" element={<ActorDetails />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
