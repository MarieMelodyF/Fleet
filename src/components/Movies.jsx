import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import notfound from "../images/image-not-found.jpg";
import DetailsMovies from "./DetailsMovie";
import CardTopMovies from "./CardTopMovies";
import Loader from "./Loader.jsx";
// import contexte, mise à jr state
import { useMovieContext } from "../components/Context.jsx";

const Movies = ({ accountId, loggedInUserId }) => {
  const { movieSelected, updateMovieSelected } = useMovieContext();

  const navigate = useNavigate();
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [movieId, setMovieId] = useState();

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
          setIsLoading(false);
          setData(response.data);
        } else {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=true&language=fr-US&page=1&sort_by=popularity.desc&api_key=${API_KEY}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
        updateMovieSelected(response.data);
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

  // mets à zéro state sarch et updatepovieselected
  const handleReset = () => {
    setSearch("");
    updateMovieSelected(null);
    navigate("/movies");
  };

  return isLoading ? (
    <>
      <Loader />
    </>
  ) : (
    <main className="container ">
      <div className="side_left">
        <div className="side_top">
          <SearchBar search={search} setSearch={setSearch} />
          <button className="reset" onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className="side_menu">
          {search ? null : (
            <h2 style={{ paddingTop: "2rem", fontWeight: "bold" }}>
              Actualy aviable :
            </h2>
          )}
          <div>
            <>
              {data.results ? (
                <div className="list_row">
                  {data.results.map(({ original_title, id, poster_path }) => {
                    return (
                      <div className="list" key={id}>
                        {original_title.length > 15 ? (
                          <h4 style={{ marginBottom: "5px" }}>
                            {" "}
                            {`${original_title.substring(0, 19)}...`}
                          </h4>
                        ) : (
                          <h4 style={{ marginBottom: "5px" }}>
                            {original_title}
                          </h4>
                        )}

                        {poster_path === null ? (
                          <img src={notfound} alt="" />
                        ) : (
                          <img
                            src={`https://image.tmdb.org/t/p/original${poster_path}`}
                            alt=""
                            onClick={() => handleClick(id)}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                "null"
              )}
            </>
          </div>
        </div>
      </div>
      <div className="side_rigth">
        {movieSelected ? (
          <DetailsMovies
            movieSelected={movieSelected}
            handleClick={handleClick}
            accountId={accountId}
            loggedInUserId={loggedInUserId}
          />
        ) : (
          <div className="movie_details_none">
            <div className="info">
              <div className="test">
                <h1>Welcome to my movie APP</h1>
                <h1
                  style={{
                    fontSize: "20px",
                    marginTop: "1rem",
                  }}
                >
                  Create with TMDB api
                </h1>
              </div>
              <p>This website recense all movies existing. </p>
              <p>
                You can find out more about a film by clicking on the film list
                on the left, or by searching by title.
              </p>
            </div>
            <div className="top_rated">
              <div className="underline"></div>
              <CardTopMovies handleClick={handleClick} />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default Movies;
