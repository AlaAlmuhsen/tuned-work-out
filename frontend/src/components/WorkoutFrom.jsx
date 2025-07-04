import { useState } from "react";

function WorkoutFrom() {
    const [title, setTitle] = useState("");
    const [load, setLoad] = useState("");
    const [reps, setReps] = useState("");
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

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
                },
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error);
                setEmptyFields(data.emptyFields);
            }

            if (response.ok) {
                setTitle("");
                setLoad("");
                setReps("");
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
                className="error"
            />

            <label>Load (in kg):</label>
            <input
                type="number"
                value={load}
                onChange={(e) => setLoad(e.target.value)}
            />

            <label>Reps:</label>
            <input
                type="number"
                value={reps}
                onChange={(e) => setReps(e.target.value)}
            />

            <button>Add Workout</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default WorkoutFrom;
