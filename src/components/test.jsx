import { useEffect } from "react";
import axios from "axios";
import bcg from "../images/bcg.jpg";

const DetailsMovies = ({ movieSelected, similareMovies }) => {
  const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1YiI6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let one = `https://api.themoviedb.org/3/movie/${movieSelected.id}?api_key=${API_KEY}&language=fr-FR`;
        let two = `https://api.themoviedb.org/3/movie/${movieSelected.id}/similar?language=fr&page=1&api_key=${API_KEY}`;

        const requestOne = axios.get(one, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const requestTwo = axios.get(two, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const [responseOne, responseTwo] = await axios.all([
          requestOne,
          requestTwo,
        ]);

        const similar = responseTwo.data;

        // ... mise à jour du state ou d'autres actions nécessaires
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [movieSelected.id]);

  const runtimeMinutes = movieSelected.runtime;
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;

  return (
    <div className="movie_details">
      <h1>{movieSelected.title}</h1>
      {movieSelected.poster_path === null ? (
        <img src={notfound} alt="" />
      ) : (
        <img
          src={`https://image.tmdb.org/t/p/original${movieSelected.poster_path}`}
          alt=""
        />
      )}
      <p> recommandation : {movieSelected.vote_average.toFixed(1) * 10} %</p>
      <div className="top">
        {movieSelected.genres.map((list, index) => {
          return <p key={index}>{list.name}</p>;
        })}
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
      {movieSelected.production_companies.map((list, index) => {
        // console.log("list", list);
        return (
          <div className="prod" key={index}>
            {list.logo_path === null ? null : (
              <img
                src={`https://image.tmdb.org/t/p/original${list.logo_path}`}
                alt=""
              />
            )}
            <p>{list.name}</p>
          </div>
        );
      })}
      <br />

      {movieSelected.overview ? (
        <p>Synopsis : {movieSelected.overview}</p>
      ) : (
        <p>Synopsis : not found</p>
      )}

      {similareMovies.results ? (
        <>
          {similareMovies.results.map((similar, index) => {
            console.log(similar);
            return (
              <div className="similarMovie">
                <h3>{similar.title}</h3>
                <img
                  src={`https://image.tmdb.org/t/p/original${similar.poster_path}`}
                  alt=""
                />
              </div>
            );
          })}
        </>
      ) : (
        <p>test</p>
      )}
    </div>
  );
};

export default DetailsMovies;
