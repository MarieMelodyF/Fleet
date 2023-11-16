import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import GetToken from "../pages/GetToken";
import { useMovieContext } from "../components/Context.jsx";

const Header = ({ loggedInUserId, handleLogOut }) => {
  const { updateMovieSelected } = useMovieContext();

  // mettre à null le state selectedmovie au clic
  const handleReset = () => {
    updateMovieSelected(null);
  };

  return (
    <div className="head">
      <div>
        <Link to="/movies" onClick={handleReset}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="menu">
        <Link to="/favorites">
          <p>Favorites</p>
        </Link>
        <Link to="/watchlist">
          <p>Watchlist</p>
        </Link>
      </div>
      <div className="rigth_head">
        <GetToken loggedInUserId={loggedInUserId} handleLogOut={handleLogOut} />
      </div>
    </div>
  );
};

export default Header;
