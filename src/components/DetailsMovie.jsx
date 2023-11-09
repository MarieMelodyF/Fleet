import { useEffect, useState } from "react";
import axios from "axios";
import notfound from "../images/image-not-found.jpg";

const DetailsMovies = ({ movieSelected }) => {
  const [similareMovies, setSimilareMovies] = useState([]);
  console.log(similareMovies);

  const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1YiI6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let one = `https://api.themoviedb.org/3/movie/${movieSelected.id}/similar?language=fr&page=1&api_key=${API_KEY}`;

        const requestOne = axios.get(one, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const [responseOne] = await axios.all([requestOne]);
        const similar = responseOne.data;
        setSimilareMovies(similar);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [movieSelected.id, token]);

  const runtimeMinutes = movieSelected.runtime;
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;

  const handleClick = (id) => {
    // Ajoutez ici la logique que vous souhaitez pour gérer le clic sur un film similaire
    console.log(`Clicked on movie with id: ${id}`);
    // Vous pouvez effectuer d'autres actions ici, par exemple, naviguer vers la page du film similaire, etc.
  };

  return (
    <div className="movie_details container-right">
      <h1>{movieSelected.title}</h1>
      {movieSelected.poster_path === null ? (
        <img src={notfound} alt="" />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original${movieSelected.poster_path}`}
          alt=""
        />
      )}
      <p>Recommandation : {movieSelected.vote_average.toFixed(1) * 10} %</p>
      <div className="top">
        {movieSelected.genres.map((list, index) => (
          <p key={index}>{list.name}</p>
        ))}
        <p>
          {hours}h{minutes} min
        </p>
      </div>

      <p>Réalisé le : {movieSelected.release_date}</p>

      {movieSelected.budget ? (
        <p>Budget : {movieSelected.budget} $</p>
      ) : (
        <p>Budget : N/C </p>
      )}
      <div className="card-prod">
        {movieSelected.production_companies.map((list, index) => (
          <div key={index}>
            {list.logo_path === null ? null : (
              <img
                src={`https://image.tmdb.org/t/p/original${list.logo_path}`}
                alt=""
              />
            )}
            <p>{list.name}</p>
          </div>
        ))}
      </div>

      {movieSelected.overview ? (
        <p>Synopsis : {movieSelected.overview}</p>
      ) : (
        <p>Synopsis : not found</p>
      )}

      {similareMovies.results ? (
        <div className="carroussel">
          {similareMovies.results.map((list, index) => (
            <div key={index}>
              <img
                src={`https://image.tmdb.org/t/p/original${list.poster_path}`}
                alt=""
                onClick={() => handleClick(list.id)}
              />
              <h3>{list.title}</h3>
            </div>
          ))}
        </div>
      ) : (
        "Aucun film similaire trouvé"
      )}
    </div>
  );
};

export default DetailsMovies;
