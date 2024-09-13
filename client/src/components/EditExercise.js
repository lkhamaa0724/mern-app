import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

function EditExercise() {
	const { id } = useParams();
	const [exercise, setExercise] = useState({
		name: "",
		reps: "",
		weight: "",
		unit: "lbs",
		date: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const fetchExercise = useCallback(async () => {
		try {
			const response = await axios.get(`/api/exercises/${id}`);
			setExercise(response.data);
		} catch (error) {
			console.error("Error fetching exercise:", error);
		}
	}, [id]);

	useEffect(() => {
		fetchExercise();
	}, [fetchExercise]);

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
			await axios.put(`/api/exercises/${id}`, exercise);
			alert("Exercise updated successfully!");
			navigate("/");
		} catch (error) {
			setError("Error updating exercise");
			console.error("Error updating exercise:", error);
		}
	};

	return (
		<div>
			<h2>Edit Exercise</h2>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					gap: "20px",
					marginBottom: "20px",
				}}
			>
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
						className="form-input"
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
						className="form-input"
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
						className="form-input"
					/>
				</div>

				<div className="form-group">
					<label>Unit:</label>
					<select
						name="unit"
						value={exercise.unit}
						onChange={handleChange}
						required
						className="form-select"
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
						className="form-input"
					/>
				</div>

				<button type="submit" className="create-button">
					Update
				</button>
			</form>
		</div>
	);
}

export default EditExercise;
