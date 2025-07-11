import { useState } from "react";
import { useWorkout } from "../context/WorkoutContext";
import { useAuthConext } from "../context/AuthContext";

function WorkoutFrom() {
    const { dispatch } = useWorkout();
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);
    const { user } = useAuthConext();

    async function handleSubmit(e) {
        e.preventDefault();

        const workout = {
            title,
            load,
            reps,
        };

        try {
            const response = await fetch("http://localhost:8000/api/workouts", {
                method: "POST",
                body: JSON.stringify(workout),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
            });

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                setError(data.error);
                setEmptyFields(data.emptyFields);
            }

            if (response.ok) {
                setTitle("");
                setLoad("");
                setReps("");
                setError(null);
                setEmptyFields([]);
                console.log("new workout added", data);
                dispatch({ type: "CREATE_WORKOUT", payload: data });
            }
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }

    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={emptyFields.includes("title") ? "error" : ""}
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                className={emptyFields.includes("load") ? "error" : ""}
            />

            <label>Reps:</label>
            <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className={emptyFields.includes("reps") ? "error" : ""}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default WorkoutFrom;
