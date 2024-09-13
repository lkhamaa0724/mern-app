import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateExercise from "./components/CreateExercise";
import EditExercise from "./components/EditExercise";
import "./App.css";

function App() {
	return (
		<Router>
			<div className="App">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/create" element={<CreateExercise />} />
					<Route path="/edit/:id" element={<EditExercise />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
