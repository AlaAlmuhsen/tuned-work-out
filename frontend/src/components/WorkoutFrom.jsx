function WorkoutFrom() {
    return (
        <form className="create">
            <h3>Add a New Workout</h3>

            <label>Excersize Title:</label>
            <input type="text" />

            <label>Load (in kg):</label>
            <input type="number" />

            <label>Reps:</label>
            <input type="number" />

            <button>Add Workout</button>
            <div className="error">error</div>
        </form>
    );
}

export default WorkoutFrom;
