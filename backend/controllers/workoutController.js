import initDB from "../db/connection.js";

async function getWorkouts(req, res) {
    const db = await initDB();

    const [rows, meta] = await db.query(
        "SELECT id,title, reps, `load`, created_at FROM workouts;"
    );
    res.send(rows);
}

export { getWorkouts };
