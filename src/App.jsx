import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import Movies from "./components/Movies";
import GetToken from "./components/pages/GetToken";
import Signup from "./components/pages/Signup";

function App() {
  const [search, setSearch] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  // console.log("loggedInUserId IN APP =>", loggedInUserId);

  // recupere le session id dans signup
  const handleSignup = (userId) => {
    setLoggedInUserId(userId);
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
              // path={`https://www.themoviedb.org/authenticate/${userToken}?redirect_to=http://http://localhost:5173/signup/approved`}
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
