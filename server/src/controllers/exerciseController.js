import Exercise from "../models/Exercise.js";

export const createExercise = async (req, res) => {
	try {
		const exercise = new Exercise(req.body);
		await exercise.save();
		res.status(201).json(exercise);
	} catch (err) {
		res.status(400).json({ Error: "Invalid request" });
	}
};

export const getExercises = async (req, res) => {
	try {
		const exercises = await Exercise.find({});
		res.status(200).json(exercises);
	} catch (error) {
		console.error("Error fetching exercises", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const getExerciseById = async (req, res) => {
	const exercise = await Exercise.findById(req.params.id);
	if (exercise) {
		res.status(200).json(exercise);
	} else {
		res.status(404).json({ Error: "Not found" });
	}
};

export const updateExercise = async (req, res) => {
	try {
		const exercise = await Exercise.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (exercise) {
			res.status(200).json(exercise);
		} else {
			res.status(404).json({ Error: "Not found" });
		}
	} catch (err) {
		res.status(400).json({ Error: "Invalid request" });
	}
};

export const deleteExercise = async (req, res) => {
	const exercise = await Exercise.findByIdAndDelete(req.params.id);
	if (exercise) {
		res.status(204).send();
	} else {
		res.status(404).json({ Error: "Not found" });
	}
};
