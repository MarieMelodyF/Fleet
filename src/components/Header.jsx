import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import GetToken from "../pages/GetToken";

const Header = ({ loggedInUserId }) => {
  return (
    <div className="head">
      <div>
        <img src={logo} alt="" />
        <GetToken loggedInUserId={loggedInUserId} />
      </div>
      <div>
        <p>Movie App</p>
      </div>
    </div>
  );
};

export default Header;
