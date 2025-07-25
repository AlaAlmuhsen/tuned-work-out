import initDB from "../db/connection.js";
import { DELETE_WORKOUT } from "../queries/workouts-queries.js";

async function getWorkouts(req, res) {
    const { id } = req.user;
    const db = await initDB();

    const [rows, meta] = await db.execute(
        "SELECT id,title, reps, `load`, created_at FROM workouts WHERE user_id = ?;",
        [id]
    );
    res.send(rows);
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
        const db = await initDB();
        const workout = await db.execute(
            "INSERT INTO workouts (title, reps, `load`, user_id) VALUE (?, ?, ?, ?) ;",
            [title, reps, load, userId]
        );

        const insertedId = workout[0].insertId;

        const [row, meta] = await db.execute(
            "SELECT id,title, reps, `load`, created_at FROM workouts WHERE id = ?",
            [insertedId]
        );

        return res.status(201).json(row[0]);
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

        const db = await initDB();

        const [row, meta] = await db.execute("SELECT * FROM workouts WHERE id = ? AND user_id = ? ", [id, user.id]);

        if (!row || row.length === 0) {
            return res.status(404).json({
                error: "Workout not found",
            }); 
        }

        await db.execute(DELETE_WORKOUT, [id, user.id]);



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
