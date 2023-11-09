import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

const Header = () => {
  return (
    <div className="head">
      <div>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div>
        <p>Movie App</p>
      </div>
    </div>
  );
};

export default Header;
