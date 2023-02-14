import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Register.css";

export default function Register() {
  const navigate = useNavigate();

  const registiration = (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    fetch("/users", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          toast.success("Successfully Registered!");

          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          toast.error(JSON.stringify(result.message));
        }
      });
  };

  return (
    <div className="regPage">
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={registiration} className="register-form-container">
          <label>First Name </label> <br></br>
          <input type="text" name="firstName" required />
          <br></br>
          <label>Last Name </label> <br></br>
          <input type="text" name="lastName" required /> <br></br>
          <label>Email </label> <br></br>
          <input type="email" name="email" required />
          <br></br>
          <label>Password </label> <br></br>
          <input type="password" name="password" required />
          <br></br>
          {/*      <label>Profile Image </label> <br></br>
        <input type="file" name="image" /> <br></br> */}
          <span className="span-login">
            <button>Register</button>
          </span>
        </form>
        <Toaster position="top-center" />
        Already registered? Head to <NavLink to="/login"> Login </NavLink>
      </div>
    </div>
  );
}
