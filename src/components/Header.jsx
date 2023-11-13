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
        <GetToken loggedInUserId={loggedInUserId} handleLogOut={handleLogOut} />
      </div>
      <div>
        <p>Movie App</p>
        <Link to="/favorites">
          <p>Favorites</p>
        </Link>
      </div>
    </div>
  );
};

export default Header;
