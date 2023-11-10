import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import GetToken from "./pages/GetToken";

const Header = () => {
  return (
    <div className="head">
      <div>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <GetToken />
      </div>
      <div>
        <p>Movie App</p>
      </div>
    </div>
  );
};

export default Header;
