import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import workoutRouter from "./routes/workouts.js";
import initDB from "./db/connection.js";

const PORT = process.env.PORT || 8000;

const app = express();

// MiddleWares
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use("/api/workouts", workoutRouter);

app.use((req, res, next) => {
    res.status(404).send({ message: "Path not found" });
});

initDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Listen on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
