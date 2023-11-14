import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import contexte, mise à jr state
import { MovieProvider } from "./components/Context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MovieProvider>
      <App />
    </MovieProvider>
  </React.StrictMode>
);
