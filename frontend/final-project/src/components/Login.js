import React from "react";
import { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import MyContext from "../context/MyContext";
import { useNavigate, NavLink } from "react-router-dom";
import "../styles/Login.css";

export default function Login() {
  const { setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();
    fetch("/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: event.target.email.value,
        password: event.target.password.value,
      }),
    })
      .then((res) => {
        const token = res.headers.get("token");
        localStorage.setItem("token", token);
        return res.json();
      })
      .then((result) => {
        console.log(result.data);
        if (result.success) {
          toast.success("Successfully LoggedIn ! ");
          setUser(result.data);
          setTimeout(() => {
            navigate("/home");
          }, 2000);
        } else {
          toast.error(result.message);
        }
      });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Login</h1>
        <Toaster position="top-center" />
        <form onSubmit={loginUser} className="login-form-container">
          <label>
            {" "}
            Email <input type="email" name="email" />
          </label>
          <br />
          <label>
            {" "}
            Password <input type="password" name="password" />
          </label>
          <br />
          <span className="span-login">
            <button>Login</button>
          </span>
        </form>
        Not registered yet? Head to <NavLink to="/users"> Register </NavLink>
      </div>
    </div>
  );
}
