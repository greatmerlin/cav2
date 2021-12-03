import React from "react";
import "./CreateGameElements.css";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function CreateGame(props) {
  return (
    <div style={{ color: "#25b3ac" }}>
      <Navbar />
      <h1 className="titleCreateGame">Create Game </h1>

      <label className="gameName">
        Game Difficulty (optional, default: easy):{" "}
      </label>
      <div>
        <button
          className="diffBtn"
          onClick={() => {
            props.setDifficulty(75);
          }}
        >
          easy
        </button>
        <button
          className="diffBtn"
          onClick={() => {
            props.setDifficulty(50);
          }}
        >
          medium
        </button>
        <button
          className="diffBtn"
          onClick={() => {
            props.setDifficulty(25);
          }}
        >
          hard
        </button>
      </div>
      <br />
      <div>
        <Link to="/game">
          <button className="createGameBtn">create game</button>
        </Link>
      </div>

      <Link to="/register">
        <button className="cancelBtn">Back</button>
      </Link>
      <Footer />
    </div>
  );
}

export default CreateGame;
