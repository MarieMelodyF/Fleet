import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import notfound from "../images/image-not-found.jpg";
import avatar from "../images/avatar.jpg";
import Loader from "./Loader";

const DetailsMovies = ({
  movieSelected,
  handleClick,
  accountId,
  loggedInUserId,
}) => {
  const [similareMovies, setSimilareMovies] = useState([]);
  const [recommendMovies, setRecommendMovies] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [actors, setActors] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  console.log(actors);

  const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1YiI6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";
  useEffect(() => {
    const fetchData = async () => {
      try {
        let one = `https://api.themoviedb.org/3/movie/${movieSelected.id}/similar?language=fr&page=1&api_key=${API_KEY}`;
        let two = `https://api.themoviedb.org/3/movie/${movieSelected.id}/videos?language=fr&api_key=${API_KEY}`;
        let three = `https://api.themoviedb.org/3/movie/${movieSelected.id}/reviews?language=frS&page=1&api_key=${API_KEY}`;
        let four = `https://api.themoviedb.org/3/movie/${movieSelected.id}/credits?language=frS&api_key=${API_KEY}`;
        let five = `https://api.themoviedb.org/3/movie/${movieSelected.id}/recommendations?language=fr&page=1&api_key=${API_KEY}`;

        const responseOne = await axios.get(one, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseTwo = await axios.get(two, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseThree = await axios.get(three, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseFour = await axios.get(four, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseFive = await axios.get(five, {
          headers: { Authorization: `Bearer ${token}` },
        });
        //destructure de la data
        const similar = responseOne.data;
        const videos = responseTwo.data;
        const reviews = responseThree.data;
        const actors = responseFour.data;
        const recommend = responseFive.data;
        console.log("recommander", recommend);
        // console.log("similar", similar);
        // console.log("reviews", reviews);
        // console.log("video", videos);
        // enregistrement data dans state
        setActors(actors);
        setTrailer(videos);
        setRecommendMovies(recommend);
        setSimilareMovies(similar);
        setReviews(reviews);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [movieSelected.id, token]);

  const runtimeMinutes = movieSelected.runtime;
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;

  // ADD TO FAV
  const handleAddToFav = async () => {
    try {
      const id = movieSelected.id;
      // console.log("log id", id);
      if (id) {
        const response = await axios.post(
          `https://api.themoviedb.org/3/account/${accountId}/favorite?session_id=${loggedInUserId}&api_key=${API_KEY}`,
          {
            media_type: "movie",
            media_id: id,
            favorite: true,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // console.log("response ADD FAV", response);
      } else {
        console.error("l'id du film n'est pas connu ");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <main>
      <div className="movie_details container-right">
        <div className="left">
          <h1>{movieSelected.title}</h1>
          {movieSelected.poster_path === null ? (
            <img src={notfound} alt="notfound" />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${movieSelected.poster_path}`}
              alt={`image du film ${movieSelected.title}`}
            />
          )}
        </div>
        <div className="right">
          <button onClick={handleAddToFav}>ADD TO FAVORITES</button>
          <div className="right_1">
            <div>
              <p> Recommandation :</p>
              <p className="percent">
                {movieSelected.vote_average.toFixed(1) * 10} %
              </p>
            </div>

            <div>
              <p>Genres :</p>
              {movieSelected.genres.map((list, index) => (
                <p key={index}> {list.name}</p>
              ))}
            </div>
            <div>
              <p>Durée :</p>
              <p>
                {hours}h{minutes} min
              </p>
            </div>
            <div>
              <p>Réalisé le : {movieSelected.release_date}</p>

              {movieSelected.budget ? (
                <p>Budget : {movieSelected.budget} $</p>
              ) : (
                <p>Budget : N/C </p>
              )}
            </div>
          </div>
          <div className="right_2">
            <div className="prod">
              <p>Production :</p>
              <div className="prod_flex">
                {movieSelected.production_companies.map((list, index) => (
                  <div key={index}>
                    {list.logo_path === null ? null : (
                      <img
                        src={`https://image.tmdb.org/t/p/original${list.logo_path}`}
                        alt=""
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2>Synopsis :</h2>
              {movieSelected.overview ? (
                <p> {movieSelected.overview}</p>
              ) : (
                <p>not found</p>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="container_bottom">
        {/* ---ACTORS----- */}
        <div className="trailer">
          <h3>Principal actors</h3>
          <div className="carroussel">
            {actors.cast ? (
              <>
                {actors.cast.slice(0, 10).map((actor, index) => {
                  return (
                    <div className="actors" key={index}>
                      {actor.profile_path === null ? (
                        <>
                          <Link to={`/actors/${actor.id}`}>
                            <img
                              src={notfound}
                              alt="avatar"
                              style={{ width: "150px" }}
                            />
                          </Link>
                          <p className="actor">{actor.name}</p>
                        </>
                      ) : (
                        <>
                          <Link to={`/actors/${actor.id}`}>
                            <img
                              src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                              alt="avatar"
                            />
                          </Link>
                        </>
                      )}
                      <p className="actor">{actor.name}</p>
                    </div>
                  );
                })}
              </>
            ) : null}

            <Link
              to={`/movies/${movieSelected.id}/all-teams`}
              state={{ actors: actors }}
            >
              <p>Voir tous les acteurs ➡️</p>
            </Link>
          </div>
        </div>

        {/* ---TRAILER----- */}
        <div className="trailer">
          <h3>Trailers of movies</h3>
          {trailer.results && trailer.results.length > 0 ? (
            <div className="carroussel">
              {trailer.results.map((trailer, index) => (
                <div key={index}>
                  <iframe
                    title="movie-trailer"
                    width="530"
                    height="285"
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                  ></iframe>
                </div>
              ))}
            </div>
          ) : (
            <>
              <br />
              <p>No trailer found 😱</p>
            </>
          )}
        </div>

        {/* ----RECOMMEND---- */}
        <div className="similar">
          <h3>Recommended movies </h3>
          {recommendMovies.results && recommendMovies.results.length > 0 ? (
            <div className="carroussel">
              {recommendMovies.results.map((list, index) => (
                <div key={index}>
                  {list.poster_path === null ? null : (
                    <>
                      <img
                        src={`https://image.tmdb.org/t/p/original${list.poster_path}`}
                        alt=""
                        onClick={() => handleClick(list.id)}
                      />
                      {list.title.length > 15 ? (
                        <h4> {`${list.title.substring(0, 17)}...`}</h4>
                      ) : (
                        <h4>{list.title}</h4>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            "Aucun film similaire trouvé"
          )}
        </div>

        {/* ----SIMILAR---- */}
        <div className="similar">
          <h3>Similar movies based on genres and keywords</h3>
          {similareMovies.results ? (
            <div className="carroussel">
              {similareMovies.results.map((list, index) => (
                <div key={index}>
                  {list.poster_path === null ? null : (
                    <>
                      <img
                        src={`https://image.tmdb.org/t/p/original${list.poster_path}`}
                        alt=""
                        onClick={() => handleClick(list.id)}
                      />
                      {list.title.length > 15 ? (
                        <h4> {`${list.title.substring(0, 17)}...`}</h4>
                      ) : (
                        <h4>{list.title}</h4>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            "Aucun film similaire trouvé"
          )}
        </div>

        {/* ----REVIEWS---- */}
        <h3 style={{ marginTop: "6rem" }}>Reviews on movie</h3>
        <div className="all_reviews">
          <div className="reviews">
            {reviews.results && reviews.results.length > 0 ? (
              reviews.results.map(
                (
                  {
                    content,
                    created_at,
                    author_details: { username, avatar_path },
                  },
                  index
                ) => (
                  <div className="review" key={index}>
                    <span
                      style={{
                        fontSize: "11px",
                        marginBottom: "1rem",
                      }}
                    >
                      {created_at}
                    </span>
                    <div>
                      <p>{content}</p>
                    </div>
                    <div className="user">
                      <p>{username}</p>
                      {avatar_path === null ? (
                        <img src={avatar} alt="" />
                      ) : (
                        <img
                          src={`https://image.tmdb.org/t/p/original${avatar_path}`}
                          alt="avatar"
                        />
                      )}
                    </div>
                  </div>
                )
              )
            ) : (
              <>
                <br />
                <p>No reviews found 😱</p>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DetailsMovies;
