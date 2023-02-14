import React, { useContext, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import MyContext from "../context/MyContext";

import "../styles/UsersLandingPage.css";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

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
            {/* <NavLink to="/home"> Brand Name / Logo </NavLink> <br></br>
              <button onClick={logout}>Logout </button>   */}
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
              <NavLink style={isActive} className="navlink" to="/home/notes/">
                {" "}
              </NavLink>
              <br></br>
            </div>
            <Calendar></Calendar>
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
