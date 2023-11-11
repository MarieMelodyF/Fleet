import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import GetToken from "./pages/GetToken";

const Header = ({ loggedInUserId }) => {
  // console.log("loggedInUserId IN HEADER", loggedInUserId);

  return (
    <div className="head">
      <div>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <GetToken loggedInUserId={loggedInUserId} />
      </div>
      <div>
        <p>Movie App</p>
      </div>
    </div>
  );
};

export default Header;
