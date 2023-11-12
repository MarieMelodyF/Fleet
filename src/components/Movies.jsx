import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import notfound from "../images/image-not-found.jpg";
import DetailsMovies from "./DetailsMovie";
import TopMovie from "./TopMovie";

const Movies = ({ accountId, loggedInUserId }) => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [movieSelected, setMovieSelected] = useState();
  const [movieId, setMovieId] = useState();
  console.log("selected", movieSelected);

  useEffect(() => {
    const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1YiI6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";

    const fetchData = async () => {
      try {
        if (search) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=fr-FR&page=1&include_adult=false&query=${search}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(response.data);
          console.log("response 1", response);
        } else {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=fr-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //   console.log("response 2", response);
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [search]);

  const handleClick = async (id) => {
    const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
    const movieId = Number(id); // Conversion de l'id en nombre
    if (!isNaN(movieId)) {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=fr-FR`
        );
        scrollToTop();
        setMovieSelected(response.data);
        setMovieId(response.data.id);
        navigate(`/movies/${response.data.id}`);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleReset = () => {
    setSearch("");
    setMovieSelected(null);
  };

  return isLoading ? (
    <>
      <p>"en chargement"</p>
    </>
  ) : (
    <main className="container">
      <div className="side_menu">
        <SearchBar search={search} setSearch={setSearch} />
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
        {search ? null : (
          <h2 style={{ paddingTop: "2rem", fontWeight: "bold" }}>
            Actualy aviable :
          </h2>
        )}

        <div>
          <>
            {data.results ? (
              <>
                {data.results.map(
                  ({ original_title, id, poster_path, popularity }) => {
                    return (
                      <div className="list" key={id}>
                        <h4 style={{ marginBottom: "5px" }}>
                          {original_title}
                        </h4>
                        {poster_path === null ? (
                          <img src={notfound} alt="" />
                        ) : (
                          <img
                            src={`https://image.tmdb.org/t/p/original${poster_path}`}
                            alt=""
                            onClick={(event) => handleClick(id)}
                          />
                        )}
                      </div>
                    );
                  }
                )}
              </>
            ) : (
              "null"
            )}
          </>
        </div>
      </div>
      {movieSelected ? (
        <DetailsMovies
          movieSelected={movieSelected}
          handleClick={handleClick}
          accountId={accountId}
          loggedInUserId={loggedInUserId}
        />
      ) : (
        <div className="movie_details_none">
          <div>
            <h1>Welcome to TMDB Copy</h1>
            <p>
              For information on a film, please search and/or click on a film
            </p>
          </div>
          <div className="top_rated">
            <TopMovie />
          </div>
        </div>
      )}
    </main>
  );
};

export default Movies;
