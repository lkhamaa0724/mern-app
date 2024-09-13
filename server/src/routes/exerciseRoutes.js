import express from "express";
import {
	createExercise,
	getExercises,
	getExerciseById,
	updateExercise,
	deleteExercise,
} from "../controllers/exerciseController.js";

const router = express.Router();

router.post("/", createExercise); // insert to database
router.get("/", getExercises); // get from database
router.get("/:id", getExerciseById); // get from database
router.put("/:id", updateExercise);
router.delete("/:id", deleteExercise);

export default router;
