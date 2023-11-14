import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import notfound from "../images/image-not-found.jpg";
// import contexte, mise à jr state
import { useMovieContext } from "../components/Context";

const Actors = () => {
  const { updateMovieSelected } = useMovieContext();
  // recupère id de l'acteur params
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState([]);
  const [allMovieActor, setAllMovieActor] = useState([]);
  const [tvShow, setTvShow] = useState([]);

  useEffect(() => {
    const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1YiI6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";
    const fetchData = async () => {
      try {
        let one = `https://api.themoviedb.org/3/person/${id}?language=fr&page=1&api_key=${API_KEY}`;
        let two = `https://api.themoviedb.org/3/person/${id}/movie_credits?language=fr&api_key=${API_KEY}`;
        let three = `https://api.themoviedb.org/3/person/${id}/tv_credits?language=fr&api_key=${API_KEY}`;
        const responseOne = await axios.get(one, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseTwo = await axios.get(two, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseThree = await axios.get(three, {
          headers: { Authorization: `Bearer ${token}` },
        });
        //destructure de la data
        const details = responseOne.data;
        const allMovieActor = responseTwo.data;
        const tvShow = responseThree.data;
        // console.log("allTVSHOW", tvShow);

        // enregistrement data dans state
        setIsLoading(false);
        setDetails(details);
        setAllMovieActor(allMovieActor);
        setTvShow(tvShow);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : (
    <main className="container_actor">
      <div className="details">
        <div className="details_left">
          {details.profile_path === null ? (
            <img src={notfound} alt="" />
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/original${details.profile_path}`}
              alt=""
            />
          )}
        </div>
        <div className="details_rigth">
          <button
            style={{ width: "140px", height: "25px" }}
            className="reset"
            onClick={() => navigate("/movies")}
          >
            Back to homepage
          </button>
          <h1 style={{ fontSize: "30px" }}>{details.name}</h1>
          <div>
            {details.birthday === null ? (
              <p>Né(e) le : N/C</p>
            ) : (
              <p>Né(e) le : {details.birthday}</p>
            )}
            {details.known_for_department === null ? (
              <p>Connu pour : N/C</p>
            ) : (
              <p>Connu pour : {details.known_for_department}</p>
            )}
            {details.place_of_birth === null ? (
              <p>À : N/C</p>
            ) : (
              <p>À : {details.place_of_birth}</p>
            )}

            {details.deathday === null ? null : (
              <p>Décédé(e) le : {details.deathday}</p>
            )}
          </div>
          <br />
          {details.biography === "" ? (
            <p>Bio : N/C</p>
          ) : (
            <p>Bio : {details.biography}</p>
          )}
        </div>
        {/* ALL MOVIE OF ACTOR */}
      </div>
      <div className="all_movie_of_actor">
        <h3>All movie of {details.name} </h3>
        {allMovieActor.cast && allMovieActor.cast.length > 0 ? (
          <div className="carroussel">
            {allMovieActor.cast.map((movieSelected, index) => (
              <div key={index}>
                {movieSelected.poster_path === null ? null : (
                  <>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movieSelected.poster_path}`}
                      alt=""
                      onClick={() => {
                        navigate(`/movies/${movieSelected.id}`);
                        updateMovieSelected(movieSelected);
                      }}
                    />
                    {movieSelected.title.length > 15 ? (
                      <h4> {`${movieSelected.title.substring(0, 14)}...`}</h4>
                    ) : (
                      <h4>{movieSelected.title}</h4>
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
      {/* ALL TV SHOW OF ACTOR */}
      <div className="all_movie_of_actor">
        <h3>All Tv Show of {details.name} </h3>
        {tvShow.cast && tvShow.cast.length > 0 ? (
          <div className="carroussel">
            {tvShow.cast.map((list, index) => (
              <div key={index}>
                {list.poster_path === null ? null : (
                  <>
                    <img
                      src={`https://image.tmdb.org/t/p/original${list.poster_path}`}
                      alt=""
                    />
                    {list.name.length > 15 ? (
                      <h4> {`${list.name.substring(0, 14)}...`}</h4>
                    ) : (
                      <h4>{list.name}</h4>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          "Aucun Tv Show trouvé"
        )}
      </div>
    </main>
  );
};

export default Actors;
