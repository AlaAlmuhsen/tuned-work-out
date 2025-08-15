import initDB from "../db/connection.js";
import Workout from "../models/Workout.js";
import { DELETE_WORKOUT } from "../queries/workouts-queries.js";

async function getWorkouts(req, res) {
    const { id } = req.user;

    const response = await Workout.findAll({
        where: { user_id: id },
    }); 
    
    const workouts = response.map(workout => workout.toJSON());
    res.send(workouts);
}

async function getWorkout(req, res) {
    const { id: userId } = req.params;

    if (isNaN(Number(id))) {
        return res.status(400).json({
            error: "id should be a number",
        });
    }

    const db = await initDB();

    const [row, meta] = await db.execute(
        "SELECT id,title, reps, `load`, created_at FROM workouts WHERE id = ?",
        [userId]
    );

    if (row && row.length == 0) {
        return res.status(404).json({
            error: "Workout not found",
        });
    }

    return res.status(200).json(row[0]);
}

async function createWorkout(req, res) {
    const { id: userId } = req.user;
    const { title, reps, load } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push("title");
    }
    if (!reps) {
        emptyFields.push("reps");
    }
    if (!load) {
        emptyFields.push("load");
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({
            error: "Please fill all of the fields",
            emptyFields,
        });
    }

    try {

        const response = await Workout.create({
            title,
            reps,
            load,
            user_id : userId, // Assuming userId is a foreign key in the Workout model
        });

        const workout = response.toJSON();

        return res.status(201).json(workout);
    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

async function deleteWorkout(req, res) {
    try {
        const { id } = req.params;
        const user = req.user;

        if (isNaN(Number(id))) {
            return res.status(400).json({
                error: "id should be a number",
            });
        }


        const response = await Workout.findByPk(id, {
            where: { user_id: user.id },
        });

        const workout = response.toJSON();


        if (!workout) {
            return res.status(404).json({
                error: "Workout not found",
            }); 
        }

        Workout.destroy({
            where: { id, user_id: user.id },
        });

        res.status(200).json({
            message: "Workout deleted successfully",
        });


    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }

}

export { getWorkouts, getWorkout, createWorkout, deleteWorkout };
