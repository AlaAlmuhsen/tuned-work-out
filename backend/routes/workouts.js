import express from "express";
import { getWorkouts } from "../controllers/workoutController.js";

const workoutRouter = express.Router();

// auth

// GET all workouts
workoutRouter.get("/", getWorkouts);

// GET a single workout
// workoutRouter.get("/:id", );

// POST a new workout
// workoutRouter.post("/", );

// DELETE a new workout
// workoutRouter.delete("/:id", );

// UPDATE a workout
// workoutRouter.patch("/:id", );

export default workoutRouter;
