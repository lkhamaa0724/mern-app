import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		reps: { type: Number, required: true },
		weight: { type: Number, required: true },
		unit: { type: String, required: true, enum: ["kgs", "lbs"] },
		date: { type: String, required: true },
	},
	{ collection: "exercises" }
);

const Exercise = mongoose.model("ExerciseDB", exerciseSchema);

export default Exercise;
