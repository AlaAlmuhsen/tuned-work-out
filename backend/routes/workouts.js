import express from "express";
import {
    createWorkout,
    deleteWorkout,
    getWorkout,
    getWorkouts,
} from "../controllers/workoutController.js";

const workoutRouter = express.Router();

// auth

// GET all workouts
workoutRouter.get("/", getWorkouts);

// GET a single workout
workoutRouter.get("/:id", getWorkout);
// example : /api/workouts/5

// POST a new workout
workoutRouter.post("/", createWorkout);

// DELETE a new workout
workoutRouter.delete("/:id", deleteWorkout);

// UPDATE a workout
// workoutRouter.patch("/:id", );

export default workoutRouter;
