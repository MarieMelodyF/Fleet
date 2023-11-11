import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// import { useLocation } from "react-router-dom";

const GetToken = ({ loggedInUserId }) => {
  // console.log("loggedInUserId IN GETTOKEN", loggedInUserId);
  const [userToken, setUserToken] = useState();
  // console.log("gettoken", userToken);
  // const location = useLocation();
  // const userTokenFromLink = location.state?.userToken;

  const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1YiI6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";
  useEffect(() => {
    const fetchData = async () => {
      try {
        // CREATE REQUEST TOKEN //
        let one = ` https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`;
        const responseOne = await axios.get(one, {
          headers: { Authorization: `Bearer ${token}` },
        });

        //destructure de la data
        const tokendone = responseOne.data.request_token;
        // console.log(tokendone);
        // console.log(actors);
        // console.log(reviews);
        // console.log("video", videos);
        // enregistrement data dans state
        // setSimilareMovies(similar);
        // setTrailer(videos);
        // setReviews(reviews);
        setUserToken(tokendone);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Ask the user for permission for request token */}

      {loggedInUserId ? (
        <p>Bienvenue</p>
      ) : (
        <Link
          to={`https://www.themoviedb.org/authenticate/${userToken}?redirect_to=http://localhost:5173/signup/approved`}
        >
          {" "}
          <p>Inscrit toi</p>{" "}
        </Link>
      )}
    </div>
  );
};

export default GetToken;
