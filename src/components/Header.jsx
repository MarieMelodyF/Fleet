import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import GetToken from "../pages/GetToken";
import { useMovieContext } from "../components/Context.jsx";

const Header = ({ loggedInUserId, handleLogOut }) => {
  const { updateMovieSelected } = useMovieContext();

  // mettre à null le state selectedmovie
  const reset = () => {
    updateMovieSelected(null);
  };

  return (
    <div className="head">
      <div>
        <Link to="/movies" onClick={reset}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <Link to="/favorites">
        <p>Favorites</p>
      </Link>
      <Link to="/watchlist">
        <p>Watchlist</p>
      </Link>
      <div className="rigth_head">
        <GetToken loggedInUserId={loggedInUserId} handleLogOut={handleLogOut} />
      </div>
    </div>
  );
};

export default Header;
