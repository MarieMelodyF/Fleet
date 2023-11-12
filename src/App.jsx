import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import GetToken from "./components/pages/GetToken";
import Signup from "./components/pages/Signup";

function App() {
  const [search, setSearch] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(
    null || Cookies.get("userId")
  );
  // console.log("loggedInUserId IN APP =>", loggedInUserId);
  const [accountId, setAccountId] = useState();
  console.log("accoundId in APP", accountId);

  // recupere le session id dans signup
  const handleSignup = (userId) => {
    if (userId) {
      Cookies.set("userId", userId, { expires: 30 });
      setLoggedInUserId(userId);
      fetchAccountData(loggedInUserId);
    }
  };

  // Requete accound ID
  useEffect(() => {
    if (loggedInUserId) {
      fetchAccountData(loggedInUserId);
    }
  }, [loggedInUserId]);

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

      // console.log("accountID IN APP", response);
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
        <Header loggedInUserId={loggedInUserId} />
        <Routes>
          <Route>
            <Route
              path="/"
              element={<Movies setSearch={setSearch} search={search} />}
            />
            {<Route path="/gettoken" element={<GetToken />} />}
            <Route
              path="/signup/approved"
              element={<Signup onSignup={handleSignup} />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
