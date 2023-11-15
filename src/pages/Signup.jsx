import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Signup = ({ onSignup }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState();

  const location = useLocation();
  const REQUEST_TOKEN =
    location.state?.request_token ||
    new URLSearchParams(location.search).get("request_token");

  const handleSignup = async (event) => {
    event.preventDefault();
    const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1I6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";
    // CREATE USER/SESSION ID
    try {
      if (username === "" || email === "" || password === "") {
        toast.error(" Please field all files");
      } else {
        const response = await axios.post(
          `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}&request_token=${REQUEST_TOKEN}`,
          {
            username: username,
            email: email,
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newUserId = response.data.session_id;

        setUserId(newUserId);
        onSignup(newUserId);
        toast.success("Your account is created ✨");
        if (newUserId !== undefined) {
          navigate("/movies");
        }
      }
    } catch (error) {
      toast.error("An error was occured. Please click on sign up again ");
      console.error(error.message);
    }
  };

  return (
    <main className=" container_signup ">
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
      <div className="form">
        <div>
          <h1 style={{ fontSize: "40px" }}>Sign up</h1>
        </div>
        <div className="from_title">
          <p>Please fill in all fields </p>
          <br />
          <p>After your connexion you can add film to favorites & watchlist</p>
        </div>
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="email"
            placeholder="exemple@gmail.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="@ZERTY!"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button className="reset" type="submit">
            S'inscrire
          </button>
        </form>
      </div>
    </main>
  );
};

export default Signup;
