import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import GetToken from "../pages/GetToken";

const Header = ({ loggedInUserId, handleLogOut }) => {
  return (
    <div className="head">
      <div>
        <Link to="/movies">
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
