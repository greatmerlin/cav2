import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainBody from "./components/MainBody";
import ChatRoom from "./components/ChatRoom";
import About from "./components/About";
import HowToPlay from "./components/HowToPlay";
import Login from "./components/Login";

function App() {
  
	return (
	  <Router>
		<Routes>
		  <Route path="/" element={< MainBody />} exact />
		  <Route path="/chat" element={< ChatRoom />} />
		  <Route path="/about" element={< About />} />
		  <Route path="/howtoplay" element={< HowToPlay />} />
		  <Route path="/login" element={ <Login /> } />
		</Routes>
	  </Router>
	);
  }
  
  export default App;