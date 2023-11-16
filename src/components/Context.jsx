import React, { createContext, useContext, useState } from "react";
// contexte pour màj du state movieId
const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movieSelected, setMovieSelected] = useState(null);

  const updateMovieSelected = (movieId) => {
    setMovieSelected(movieId);
  };

  return (
    <MovieContext.Provider value={{ movieSelected, updateMovieSelected }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext);
};
