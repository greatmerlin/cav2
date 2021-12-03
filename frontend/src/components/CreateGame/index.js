import React from 'react';
import './CreateGameElements.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Link } from "react-router-dom";

function CreateGame(props) {

    //TODO: according to the difficulty button, set the correct ball speed

    return (
        <div style={{ color: "#25b3ac" }}>
            <Navbar />
            <h1 className="titleCreateGame">Create Game </h1>

            <form>

                <label className="gameName">Game Difficulty (optional, default: easy): </label>
                <div>
                    <button className="diffBtn">easy</button>
                    <button className="diffBtn">medium</button>
                    <button className="diffBtn">hard</button>
                </div>
                <br />
                <div>
                    <Link to="/game" ><button className="createGameBtn">create game</button></Link>
                </div>
            </form>
                <Link to="/register" ><button className="cancelBtn">Back</button></Link>
            <Footer />
        </div>
    )
}

export default CreateGame;
