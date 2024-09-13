import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function CreateExercise() {
	const [exercise, setExercise] = useState({
		name: "",
		reps: "",
		weight: "",
		unit: "lbs",
		date: "",
	});

	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = (e) => {
		setExercise({ ...exercise, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!exercise.name ||
			!exercise.reps ||
			!exercise.weight ||
			!exercise.date
		) {
			setError("Please fill out all fields");
			return;
		}

		if (exercise.reps <= 0 || exercise.weight <= 0) {
			setError("Reps and Weight must be positive numbers");
			return;
		}

		try {
			await axios.post("/api/exercises", exercise);
			alert("Exercise created successfully!");
			navigate("/");
		} catch (error) {
			setError("Error creating exercise, please check your input");
			console.error("Error creating exercise:", error);
		}
	};

	return (
		<div>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: "20px",
					marginBottom: "20px",
				}}
			>
				<Link className="create-new-button" to="/create">
					Create New Exercise
				</Link>
				<Link className="home-button" to="/">
					Home
				</Link>
			</div>
			{error && <p style={{ color: "red" }}>{error}</p>}
			<form onSubmit={handleSubmit} className="exercise-form">
				<div className="form-group">
					<label>Name:</label>
					<input
						type="text"
						name="name"
						value={exercise.name}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Reps:</label>
					<input
						type="number"
						name="reps"
						value={exercise.reps}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Weight:</label>
					<input
						type="number"
						name="weight"
						value={exercise.weight}
						onChange={handleChange}
						required
					/>
				</div>
				<div className="form-group">
					<label>Unit:</label>
					<select
						name="unit"
						value={exercise.unit}
						onChange={handleChange}
						required
					>
						<option value="lbs">lbs</option>
						<option value="kgs">kgs</option>
					</select>
				</div>
				<div className="form-group">
					<label>Date:</label>
					<input
						type="date"
						name="date"
						value={exercise.date}
						onChange={handleChange}
						required
					/>
				</div>
				<button type="submit" className="create-button">
					Create
				</button>
			</form>
		</div>
	);
}

export default CreateExercise;
