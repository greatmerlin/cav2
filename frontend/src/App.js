import React, { useState } from 'react';
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainBody from "./components/MainBody";
import ChatRoom from "./components/ChatRoom";
import About from "./components/About";
import HowToPlay from "./components/HowToPlay";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateGame from "./components/CreateGame";
import Game from "./components/Game";

function App() {

	const [difficulty, setDifficulty] = useState(75);
  
	return (
	  <Router>
		<Routes>
		  <Route path="/" element={< MainBody />} exact />
		  <Route path="/chat" element={< ChatRoom />} />
		  <Route path="/about" element={< About />} />
		  <Route path="/howtoplay" element={< HowToPlay />} />
		  <Route path="/login" element={ <Login /> } />
		  <Route path="/register" element={ <Register /> } />
		  <Route path="/creategame" element={ <CreateGame difficulty={difficulty} setDifficulty={setDifficulty} /> } />
		  <Route path="/game" element={ < Game difficulty={difficulty}  /> } />
		</Routes>
	  </Router>
	);
  }
  
  export default App;