import React from 'react';
import './CreateGameElements.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { Link } from "react-router-dom";

function CreateGame(props) {

    // es muss hier eine gameID generiert werden, die auch zum Pfad angefügt wird
    // zB game1 mit der ID 12345 -> /dashboard/12345
    // game difficulty -> as state in einem späteren Zeitpunkt


    const handleSubmit = () => {
        //TODO: create a unique id for every game pass it as a state
        // and according to the difficulty button, set the correct ball speed
        
    }

    //TODO: according to the difficulty button, set the correct ball speed

    return (
        <div style={{ color: "#25b3ac" }}>
            <Navbar />
            <h1 className="titleCreateGame">Create Game </h1>

            <form>

                <label className="gameName">Game Name: </label>
                <input type="text" name="gamename" value={props.gameName} onChange={(e) => props.setGameName(e.target.value)} required />
                <div>
                    <button className="diffBtn">easy</button>
                    <button className="diffBtn">medium</button>
                    <button className="diffBtn">hard</button>
                </div>
                <br />
                <div>
                    <button className="createGameBtn" onClick={handleSubmit}>create game</button>
                </div>
            </form>
            <Link to="/register" ><button className="cancelBtn">Back</button></Link>
            <Footer />
        </div>
    )
}

export default CreateGame;
