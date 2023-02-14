import React, { useContext } from "react";
import MyContext from "../context/MyContext.js";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";
const returnIcon = <FontAwesomeIcon icon={faLeftLong} />;

export default function Profile() {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  const editProfile = () => {
    navigate("/home/editprofile");
  };

  const deleteUserAccount = () => {
    fetch(`/users/${user._id}`, {
      method: "DELETE",
      headers: { token: localStorage.getItem("token") },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setUser(null);
          localStorage.removeItem("token");
          navigate("/");
        } else {
          console.log(result.message);
        }
      });
  };

  const backToMainPage = () => {
    navigate("/home");
  };

  return (
    <div className="profile-container">
      <span className="profile-back-span">
        <button onClick={backToMainPage} className="profile-back-delete-btns">
          {returnIcon} Main Page{" "}
        </button>
      </span>

      <h1>Profile</h1>

      {user && (
        <>
          {/* <h2>{user.firstName} {user.lastName}</h2> */}

          <div className="profile-input-container">
            <div className="user-info">
              <h4>First Name</h4>
              <p> {user.firstName} </p>
            </div>
            <div className="user-info">
              <h4>Last Name</h4>
              <p> {user.lastName} </p>
            </div>
            <div className="user-info">
              <h4>Email</h4>
              <p> {user.email} </p>
            </div>
            <div className="user-info">
              <h4>Password</h4>
              <p> ***************** </p>
            </div>

            <div className="profile-edit-buttons-container">

              <button
                onClick={editProfile}
                className="profile-edit-logout-btns"
                
              >
                Edit
              </button>


              <button onClick={logout} className="profile-edit-logout-btns">
                Logout
              </button>
            </div>
          </div>

          {/*     <img src={user.profileImage} width="300" alt="profileImage" /> */}

          <button
            onClick={deleteUserAccount}
            className="profile-back-delete-btns"
          >
            Delete Account
          </button>
          
        </>
      )}
    </div>
  );
}
