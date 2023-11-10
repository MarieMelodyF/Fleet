import { useEffect, useState } from "react";
import axios from "axios";
import notfound from "../images/image-not-found.jpg";
import avatar from "../images/avatar.jpg";

const DetailsMovies = ({ movieSelected }) => {
  const [similareMovies, setSimilareMovies] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [actors, setActors] = useState([]);
  // console.log(actors);

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

        // Use axios.get and await for the responses
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
        //destructure de la data
        const similar = responseOne.data;
        const videos = responseTwo.data;
        const reviews = responseThree.data;
        const actors = responseFour.data;
        console.log(actors);
        // console.log(reviews);
        // console.log("video", videos);
        // enregistrement data dans state
        setSimilareMovies(similar);
        setTrailer(videos);
        setReviews(reviews);
        setActors(actors);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [movieSelected.id, token]);

  const runtimeMinutes = movieSelected.runtime;
  const hours = Math.floor(runtimeMinutes / 60);
  const minutes = runtimeMinutes % 60;

  // const handleClick = () => {};

  return (
    <main>
      <div className="movie_details container-right">
        <div className="left">
          <h1>{movieSelected.title}</h1>
          {movieSelected.poster_path === null ? (
            <img src={notfound} alt="" />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${movieSelected.poster_path}`}
              alt=""
            />
          )}
        </div>
        <div className="right">
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
        {/* -------- */}
        <div className="trailer">
          <h3>Principal actors</h3>
          <div className="carroussel">
            {actors.cast ? (
              <>
                {actors.cast.slice(0, 10).map((actor, index) => {
                  console.log("===>", actor);
                  return (
                    <div className="actors" key={index}>
                      {actor.profile_path === null ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original${notfound}`}
                          alt="avatar"
                        />
                      ) : (
                        <img
                          src={`https://image.tmdb.org/t/p/original${actor.profile_path}`}
                          alt="avatar"
                        />
                      )}
                      <p className="actor">{actor.name}</p>
                    </div>
                  );
                })}
              </>
            ) : null}

            <p>Voir tous les acteurs ➡️</p>
          </div>
        </div>
        {/* -------- */}
        <div className="trailer">
          <h3>Similar movies based on genres and keywords</h3>
          {trailer.results ? (
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
              <p>Aucun trailer trouvé 😱</p>
            </>
          )}
        </div>
        {/* -------- */}

        <div className="similar">
          <h3>Similar movies based on genres and keywords</h3>
          {similareMovies.results ? (
            <div className="carroussel">
              {similareMovies.results.map((list, index) => (
                <div key={index}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${list.poster_path}`}
                    alt=""
                    onClick={() => handleClick(list.id)}
                  />
                  <h4>{list.title}</h4>
                </div>
              ))}
            </div>
          ) : (
            "Aucun film similaire trouvé"
          )}
        </div>
        {/* -------- */}

        <h3 style={{ marginTop: "6rem" }}>Reviews on movie</h3>
        <div className="all_reviews">
          {reviews.results ? (
            <div className="reviews">
              {reviews.results.map(
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
              )}
            </div>
          ) : (
            <>
              <br />
              <p>Aucun commentaires trouvé 😱</p>
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default DetailsMovies;
