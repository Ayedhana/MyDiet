
import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import("./auth.css");

export default function AuthUser() {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/login",
        {
          email,
          password,
        }
      );
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("token", response.data.token);
      window.localStorage.setItem("userID", response.data.userID);
      window.localStorage.setItem("isBanned", response.data.isBanned);
      window.localStorage.setItem("isUser", response.data.isUser);
      window.localStorage.setItem("isAdmin", response.data.isAdmin);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Username or password invalide");
    }
  };
  return (
    <div className="authcontainer">
      <form onSubmit={onSubmit}>
        <h2>Login</h2>
        <div>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    await axios
      .post("http://localhost:3001/auth/register", {
        email,
        password,
        fullname,
      })

      .then((res) => {
        console.log(res);
        if (!res.data.status) {
          alert("User already exists");
        }

        alert("Registration completed!, Now you can login");
      })
      .catch((err) => {
        if (err) {
          console.error(err);
          alert("Username or password invalide");
        }
      });
  };
  return (
    <div className="authcontainer">
      <form onSubmit={onSubmit}>
        <h2>Register</h2>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            placeholder="full Name"
            id="fullname"
            value={fullname}
            onChange={(event) => {
              setFullname(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
  
