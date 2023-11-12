import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <div className="background-home">
        <div className="home">
          <h1>Welcome to my Movie App</h1>
          <div>
            <Link to="/movies">
              <p className="button-home">Click to enter</p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
