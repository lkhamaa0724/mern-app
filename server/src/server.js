import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

const uri = process.env.MONGODB_CONNECT_STRING;

mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected"))
	.catch((err) => console.error("MongoDB connection error:", err));

import exerciseRoutes from "./routes/exerciseRoutes.js";
app.use("/api/exercises", exerciseRoutes);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
