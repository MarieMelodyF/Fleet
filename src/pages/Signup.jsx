import { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState();
  console.log("userID IN SIGNUP", userId);
  const navigate = useNavigate();

  console.log("userid IN SIGNUP", userId);
  const location = useLocation();
  const REQUEST_TOKEN =
    location.state?.request_token ||
    new URLSearchParams(location.search).get("request_token");

  const handleSignup = async (event) => {
    event.preventDefault();
    const API_KEY = "92c3ba76c78e682a651f232ff59c45c5";
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MmMzYmE3NmM3OGU2ODJhNjUxZjIzMmZmNTljNDVjNSIsInN1I6IjY1NGNlM2RkZmQ0ZjgwMDBhZTJkMzk3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yfONWJVpL39pOedGYZ5Pr5ZqJhp_EBxgOe8nidjGY2Q";

    try {
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

      if (newUserId !== undefined) {
        navigate("/movies");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
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

        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default Signup;
