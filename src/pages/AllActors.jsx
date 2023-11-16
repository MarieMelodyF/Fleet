import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import notfound from "../images/image-not-found.jpg";
import Loader from "../components/Loader";
const AllActors = () => {
  const navigate = useNavigate();
  const [actors, setActors] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // recupére la data de la props actors dans detailsMovie
  useEffect(() => {
    if (location.state.actors) {
      const actorsData = location.state.actors;
      setActors(actorsData);
      setIsLoading(false);
    }
  }, [location]);

  // tri des photos/noms dans le tableau crews pour retirer les doublons
  const uniqueTeamCrew = actors
    ? actors.crew.filter(
        (crew, index, self) =>
          index ===
          self.findIndex(
            (team) =>
              team.name === crew.name && team.profile_path === crew.profile_path
          )
      )
    : [];

  return isLoading ? (
    <Loader />
  ) : (
    <main className="container_all_cast">
      <button className="reset" onClick={() => navigate("/movies")}>
        Back to homepage
      </button>
      <div className="team">
        <div className="team_left">
          {/* ACTORS */}
          <h2>All Actors</h2>
          {actors ? (
            actors.cast.map(({ name, profile_path }, index) => {
              return (
                <div className="all_actors" key={index}>
                  <h4 style={{ marginBottom: "5px" }} key={index}>
                    {name}
                  </h4>

                  {profile_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/original${profile_path}`}
                      alt="avatar"
                    />
                  ) : (
                    <img
                      src={notfound}
                      alt="avatar"
                      style={{ width: "150px" }}
                    />
                  )}
                </div>
              );
            })
          ) : (
            <div className="all_actors">
              <p>null</p>
            </div>
          )}
        </div>

        {/* CREW */}
        <div className="team_right">
          <h2>All Crew</h2>
          {uniqueTeamCrew && uniqueTeamCrew.length > 0 ? (
            uniqueTeamCrew.map(({ name, profile_path }, index) => (
              <div className="all_crew" key={index}>
                {profile_path ? (
                  <>
                    <h4>{name}</h4>
                    <img
                      src={`https://image.tmdb.org/t/p/original${profile_path}`}
                      alt="avatar"
                    />
                  </>
                ) : null}
              </div>
            ))
          ) : (
            <div className="all_crew">
              <p>null</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AllActors;
