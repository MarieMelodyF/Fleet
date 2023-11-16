import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const GetToken = ({ loggedInUserId, handleLogOut }) => {
  const [userToken, setUserToken] = useState();

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

        // Destructure de la data
        const tokendone = responseOne.data.request_token;
        setUserToken(tokendone);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  // Fonction logout pour appel de la fonction handlelogout
  const handleLogOutClick = () => {
    handleLogOut();
    toast.error("You are disconnected !");
  };

  return (
    <div>
      <Toaster
        toastOptions={{
          style: {
            borderRadius: "10px",
            border: "2px solid #050505",
            padding: "16px",
            backgroundColor: "##d1d1d1",
          },
        }}
      />

      {/* Ask the user for permission for request token*/}
      {loggedInUserId ? (
        <div className="sign">
          <p style={{ fontSize: "25px", color: "white", fontWeight: "400" }}>
            Welcome
          </p>
          <button className="reset" onClick={handleLogOutClick}>
            Log out
          </button>
        </div>
      ) : (
        <Link
          to={`https://www.themoviedb.org/authenticate/${userToken}?redirect_to=http://localhost:5173/signup/approved`}
        >
          <button className="reset">Sign up</button>
        </Link>
      )}
    </div>
  );
};

export default GetToken;
