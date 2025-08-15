import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import workoutRouter from "./routes/workouts.js";
import initDB from "./db/connection.js";
import userRouter from "./routes/user.js";
import requireAuth from "./middleware/requireAuth.js";
import DBConnection from "./db/connection.js";
import DataBase from "./db/connection.js";
import User from "./models/User.js";
import initModels from "./models/index.js";

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

app.use("/api/workouts", requireAuth ,workoutRouter);
app.use("/api/user", userRouter);

app.use((req, res, next) => {
    res.status(404).send({ message: "Path not found" });
});


const db = DataBase.getInstanse();


db.initWorkoutDb().then(async () => {
    console.log("Database initialized successfully");

    await initModels()



    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error) => {
    console.error("Error initializing database:", error);
});
