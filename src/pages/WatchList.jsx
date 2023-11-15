import axios from "axios";
import { useEffect, useState } from "react";
import { useMovieContext } from "../components/Context";
import { useNavigate } from "react-router-dom";
import notfound from "../images/image-not-found.jpg";
import Loader from "../components/Loader";

const Watchlist = ({ accountId, loggedInUserId }) => {
  const navigate = useNavigate();
  const { updateMovieSelected } = useMovieContext();

  const [watchList, setWatchList] = useState([]);
  const [idMovie, setIdMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1YiI6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?language=fr&page=1&session_id=${loggedInUserId}&sort_by=created_at.asc&api_key=${API_KEY}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setWatchList(response.data);
          setIsLoading(false);
        } else {
          console.error(
            "Erreur lors de la récupération des films favoris :",
            response.status
          );
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des films favoris :",
          error.message
        );
      }
    };

    fetchData();
  }, [accountId, loggedInUserId]);

  const deleteOne = async (id) => {
    const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";

    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/account/${accountId}/watchlist?session_id=${loggedInUserId}&api_key=${API_KEY}`,
        {
          media_type: "movie",
          media_id: id,
          watchlist: false,
        }
      );

      if (response.status === 200) {
        setWatchList((prevWatchList) => {
          if (Array.isArray(prevWatchList.results)) {
            return {
              results: prevWatchList.results.filter((item) => item.id !== id),
            };
          } else {
            return prevWatchList;
          }
        });
      }
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du film de la liste :",
        error
      );
    }
  };

  return isLoading ? (
    <Loader />
  ) : loggedInUserId ? (
    <div className="container_fav">
      <h1 style={{ textAlign: "center", marginTop: "2rem" }}>
        Your Watchlist Movies
      </h1>
      <div className="card-fav">
        {watchList.results && watchList.results.length > 0 ? (
          <>
            {watchList.results.map((fav, index) => (
              <div className="fav" key={index}>
                {fav.original_title.length > 15
                  ? `${fav.original_title.substring(0, 19)}...`
                  : fav.original_title}
                <div>
                  <div>
                    <button
                      className="delete-button"
                      onClick={() => {
                        deleteOne(fav.id);
                      }}
                    >
                      X
                    </button>

                    {fav.poster_path === null ? (
                      <img
                        src={notfound}
                        alt={`image ${fav.original_title}`}
                        onClick={() => {
                          navigate(`/movies/${fav.id}`);
                          updateMovieSelected(fav);
                        }}
                      />
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/original${fav.poster_path}`}
                        alt={`image ${fav.original_title}`}
                        onClick={() => {
                          navigate(`/movies/${fav.id}`);
                          updateMovieSelected(fav);
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <div>
            <h1>
              No movies added to watchlist 😕. Go to a movie and add it with the
              button
            </h1>
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="container_fav_none">
      <div className="card_fav">
        <h1>To add a movie you need to be connected. Go to Sign up 🙂</h1>
      </div>
    </div>
  );
};
export default Watchlist;
