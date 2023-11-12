import axios from "axios";
import { useState, useEffect } from "react";
const TopMovie = () => {
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1YiI6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";
  useEffect(() => {
    const fetchData = async () => {
      try {
        let one = `https://api.themoviedb.org/3/movie/top_rated?language=frS&page=1&api_key=${API_KEY}`;
        let two = `https://api.themoviedb.org/3/movie/upcoming?language=fr&page=1&api_key=${API_KEY}`;

        const responseOne = await axios.get(one, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const responseTwo = await axios.get(two, {
          headers: { Authorization: `Bearer ${token}` },
        });

        //destructure de la data
        const rated = responseOne.data;
        const upcoming = responseTwo.data;
        // console.log(toprated);

        // enregistrement data dans state
        setTopRated(rated);
        setUpcoming(upcoming);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token]);
  return (
    <div>
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
                    <h4>{`${list.title.substring(0, 13)}...`}</h4>
                  ) : (
                    <h4>{list.title}</h4>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      ) : null}
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
                    <h4>{`${list.title.substring(0, 13)}...`}</h4>
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
  );
};

export default TopMovie;
