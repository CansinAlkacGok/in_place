import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyContext from "../context/MyContext";

import "../styles/UsersLandingPage.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import brandLogo from "../assets/brandLogo.png";
import brandLogo2 from "../assets/brandLogo2.png";

// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const burgerIcon = <FontAwesomeIcon icon={faBars} />;

export default function UsersLandingPage() {
  // calender
  const [value, onChange] = useState(new Date());

  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const isActive = ({ isActive }) => {
    return {
      backgroundColor: isActive ? "rgb(82, 219, 212)" : "",
      borderRadius: isActive ? "5px" : "",
    };
  };

  return (
    <div>
      {user ? (
        <>
          <div className="header">
            <div className="burger-menu">
              <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                  <a class="navbar-brand" href="#A">
                    <NavLink className="NavLink" to="/home/kanban" href="#1">
                      <img
                        classname="brand-logo"
                        alt=""
                        src={brandLogo}
                        style={{ height: "100px" }}
                      ></img>
                    </NavLink>
                  </a>
                  <button
                    class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#main_nav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="main_nav">
                    <ul class="navbar-nav">
                      <li>
                        <a class="dropdown-item" href="#">
                          <NavLink
                            className="burger-navlink"
                            style={isActive}
                            to="/home/profile"
                          >
                            {" "}
                            Profile{" "}
                          </NavLink>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <NavLink
                            className="burger-navlink"
                            style={isActive}
                            to="/home/kanban"
                          >
                            {" "}
                            Kanban{" "}
                          </NavLink>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <NavLink
                            style={isActive}
                            className="burger-navlink"
                            to="/home/todo"
                          >
                            {" "}
                            To-Do List{" "}
                          </NavLink>
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          <NavLink
                            style={isActive}
                            className="burger-navlink"
                            to="/home/notes"
                          >
                            {" "}
                            Notes{" "}
                          </NavLink>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
            <div id="header-logo">
            <NavLink to="/home" >
              {" "}
              <img
                classname="brand-logo"
                alt=""
                src={brandLogo2}
                style={{ height: "200px"}}
              ></img>{" "}
            </NavLink>{" "}
            </div>
            
            {/* <button onClick={logout}>Logout </button> */}
          </div>

          <div className="navigation">
            <div>
              <NavLink style={isActive} className="navlink" to="/home/profile">
                {" "}
                Profile{" "}
              </NavLink>
              <br></br>
            </div>
            <div className="navlinks">
              <NavLink style={isActive} className="navlink" to="/home/kanban">
                {" "}
                Kanban{" "}
              </NavLink>
              <br></br>
              <NavLink style={isActive} className="navlink" to="/home/todo">
                {" "}
                To-Do List{" "}
              </NavLink>
              <br></br>
              <NavLink style={isActive} className="navlink" to="/home/notes">
                {" "}
                Notes{" "}
              </NavLink>
              <br></br>
            </div>
            <div className="calendar">
              <Calendar></Calendar>
            </div>
          </div>

          <div className="outlet-feature-container">
            <Outlet></Outlet>
          </div>
        </>
      ) : (
        <>
          <nav>
            <NavLink to="/login"> Login </NavLink>
            <br></br>
            <NavLink to="/users"> Register </NavLink>
            <br></br>
          </nav>
        </>
      )}
    </div>
  );
}
