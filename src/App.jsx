import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Movies from "./components/Movies";

import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route>
            <Route
              path="/"
              element={<Movies setSearch={setSearch} search={search} />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
