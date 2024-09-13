import React, { useState, useEffect } from "react";
import axios from "axios";
import ExerciseTable from "./ExerciseTable";
import { Link, useNavigate } from "react-router-dom";

function Home() {
	const [exercises, setExercises] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		fetchExercises();
	}, []);

	const fetchExercises = async () => {
		try {
			const response = await axios.get("/api/exercises");
			setExercises(response.data);
		} catch (error) {
			console.error("Error fetching exercises:", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			await axios.delete(`/api/exercises/${id}`);
			setExercises(exercises.filter((exercise) => exercise._id !== id));
		} catch (error) {
			console.error("Error deleting exercise:", error);
		}
	};

	const handleEdit = (id) => {
		navigate(`/edit/${id}`);
	};

	return (
		<div>
			<h1>
				Exercise Tracker <p>Full Stack MERN App Demonstration</p>
			</h1>

			<Link to="/create">Create New Exercise</Link>
			<ExerciseTable
				exercises={exercises}
				handleDelete={handleDelete}
				handleEdit={handleEdit}
			/>
		</div>
	);
}

export default Home;
