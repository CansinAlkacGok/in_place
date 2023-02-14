import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import Logo from "../assets/InPlace.png";
import "../styles/UsersLandingPage.css";

export default function HomePage() {
  const [clicked, setClicked] = useState(true);
  const [login, setLogin] = useState(false);
  const [reg, setReg] = useState(false);

  const handleLogin = () => {
    setClicked(false);
    setLogin(true);
  };

  const handleReg = () => {
    setClicked(false);
    setReg(true);
  };

  return (
    <div className="homePageContainer">
      <nav className="navigationLinks">
        <div className="homeGrid">
          <NavLink to="/">
            <img
              src={Logo}
              alt="logo"
              className="logo"
              onClick={() => setClicked(true)}
            ></img>
          </NavLink>{" "}
        </div>
        <div className="homeGrid2">
          <NavLink to="/users" className="navReg">
            {" "}
            <button className="startButton" onClick={handleReg}>
              Register
            </button>{" "}
          </NavLink>

          <NavLink to="/login" className="navLogin">
            <button className="startButton" onClick={handleLogin}>
              Login
            </button>{" "}
          </NavLink>
        </div>

        <div className="homeGrid text">
          {clicked === true && (
            <>
              <p className="teal1">Organization</p>
              <p className="teal2"> Made </p>
              <p className="teal3"> Easy</p>
            </>
          )}
        </div>
      </nav>
      {(login === true && <Outlet />) || (reg === true && <Outlet />)}
    </div>
  );
}
