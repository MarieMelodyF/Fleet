import React, { useState, useEffect } from "react";
import axios from "axios";

const CardTopMovies = ({ handleClick }) => {
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [showRated, setShowRated] = useState(true);

  const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1YiI6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";

  useEffect(() => {
    const fetchData = async () => {
      try {
        let one = `https://api.themoviedb.org/3/movie/top_rated?language=fr&page=1&api_key=${API_KEY}`;
        let two = `https://api.themoviedb.org/3/movie/upcoming?language=fr&page=1&api_key=${API_KEY}`;

        const responseOne = await axios.get(one, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseTwo = await axios.get(two, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // destructure de la data
        const rated = responseOne.data;
        const upcomingData = responseTwo.data;

        // enregistrement data dans le state
        setTopRated(rated);
        setUpcoming(upcomingData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);

  const toggleRated = () => {
    setShowRated(true);
  };

  const toggleUpcoming = () => {
    setShowRated(false);
  };

  return (
    <div className="card-wrapp">
      <h2 style={{ textAlign: "center", marginBottom: "3rem" }}>
        Choose the category you want to see :
      </h2>
      <div className="buttons">
        <button
          onClick={toggleRated}
          className={!showRated ? "notactive" : "active"}
        >
          Top Rated
        </button>
        <button
          onClick={toggleUpcoming}
          className={showRated ? "notactive" : "active"}
        >
          Upcoming
        </button>
      </div>
      <div className="content">
        <div className="card">
          {showRated && (
            <div className="top_movies">
              {/* -----TOP RATED----- */}
              <h3 className="rated">Top rated </h3>
              {topRated.results ? (
                <div className="carroussel">
                  {topRated.results.map((list, index) => (
                    <div key={index}>
                      {list.poster_path === null ? null : (
                        <>
                          <img
                            src={`https://image.tmdb.org/t/p/original${list.poster_path}`}
                            alt=""
                            onClick={() => handleClick(list.id)}
                          />
                          {list.title.length > 15 ? (
                            <h4>{`${list.title.substring(0, 12)}...`}</h4>
                          ) : (
                            <h4>{list.title}</h4>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
          {!showRated && (
            <div className="top_movies">
              {/* -----UPCOMING----- */}

              <h3 className="rated">Upcoming movies </h3>
              {upcoming.results ? (
                <div className="carroussel">
                  {upcoming.results.map((list, index) => (
                    <div key={index}>
                      {list.poster_path === null ? null : (
                        <>
                          <img
                            src={`https://image.tmdb.org/t/p/original${list.poster_path}`}
                            alt=""
                            onClick={() => handleClick(list.id)}
                          />
                          {list.title.length > 15 ? (
                            <h4>{`${list.title.substring(0, 12)}...`}</h4>
                          ) : (
                            <h4>{list.title}</h4>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardTopMovies;
