import { React, useState } from "react";
import { Link } from "react-router-dom";
import "./LoginElements.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordIsCorrect, setPasswordIsCorrect] = useState(false);
  //const [playerA, setPlayerA] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };

    fetch("http://localhost:3001/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        setPasswordIsCorrect(response.passwordIsCorrect);
        //props.setPlayerA(response.username);
      });
  };

  return (
    <div>
      <Navbar />
      <h1 className="titleLogin">Login</h1>
      <form onSubmit={handleSubmit} className="formLogin">
        <div>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          {!passwordIsCorrect && (
            <input type="submit" value="Login" className="buttonNext" />
          )}
        </div>
        <div>
          <br />
          {passwordIsCorrect && (
            <Link to="/creategame" className="buttonNext">
              Click here to log into the game
            </Link>
          )}
        </div>
        <br />

        {!passwordIsCorrect && (
          <Link to="/" className="backBtn">
            Back
          </Link>
        )}

        {!passwordIsCorrect && (
          <Link to="/register" className="registerBtn">
            Register
          </Link>
        )}
      </form>
      <Footer />
    </div>
  );
}

export default Login;
